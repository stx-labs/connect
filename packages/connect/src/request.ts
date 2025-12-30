import { base64 } from '@scure/base';
import { bytesToHex, hexToBytes } from '@stacks/common';
import {
  getInstalledProviders,
  getProvider,
  getProviderFromId,
  setSelectedProviderId,
  WbipProvider,
} from '@stacks/connect-ui';
import { defineCustomElements } from '@stacks/connect-ui/loader';
import { Cl, PostCondition, postConditionToHex } from '@stacks/transactions';
import { JsonRpcError, JsonRpcErrorCode } from './errors';
import {
  AddressEntry,
  MethodParams,
  MethodParamsRaw,
  MethodResult,
  MethodResultRaw,
  Methods,
  MethodsRaw,
  SendTransferParams,
} from './methods';
import { DEFAULT_PROVIDERS, WALLET_CONNECT_PROVIDER } from './providers';
import { setLocalStorageData } from './storage';
import { StacksProvider } from './types';
import { initializeWalletConnectProvider } from './walletconnect';
import { UniversalConnectorConfig } from '@reown/appkit-universal-connector';

export interface ConnectRequestOptions {
  /**
   * The provider to use for the request.
   * If none is provided the UI will be shown.
   * Defaults to the previously selected provider (unless `forceWalletSelect` is `true`).
   */
  provider?: StacksProvider;

  /**
   * Forces the user to select a wallet.
   * Defaults to `false`.
   */
  forceWalletSelect?: boolean;

  /**
   * Persist the selected wallet across requests.
   * Defaults to `true`.
   */
  persistWalletSelect?: boolean;

  /**
   * Adds manual request rewriting to make different providers behave more closely to SIP-030 / WBIPs.
   * Defaults to `true`.
   */
  enableOverrides?: boolean;

  /**
   * Enable local storage caching of addresses.
   * Defaults to `true`.
   */
  enableLocalStorage?: boolean;

  /**
   * The default wallets to display in the modal.
   * Defaults to some known popular wallets.
   */
  defaultProviders?: WbipProvider[];

  /**
   * A list of provider IDs that are approved to be shown in the Stacks Connect modal.
   * If not provided, all default and installed providers will be shown.
   */
  approvedProviderIds?: string[];

  /**
   * @deprecated Use `walletConnect` instead. If `walletConnect` is provided, `walletConnectProjectId` is ignored.
   *
   * The project ID for WalletConnect.
   * If provided, the WalletConnect provider will be created with default metadata and networks.
   */
  walletConnectProjectId?: string;

  /**
   * The config for WalletConnect.
   * If provided, the WalletConnect provider will be created.
   * - `config.projectId` is required.
   * - `config.metadata` and `config.networks` are optional and will use default values if not provided.
   *
   * If using `walletConnect` alongside `approvedProviderIds`, make sure to include
   * `"WalletConnectProvider"` in the `approvedProviderIds` array.
   */
  walletConnect?: Partial<Pick<UniversalConnectorConfig, 'metadata' | 'networks'>> &
    Omit<UniversalConnectorConfig, 'metadata' | 'networks'>;
}

export async function requestRaw<M extends keyof MethodsRaw>(
  provider: StacksProvider,
  method: M,
  params?: MethodParamsRaw<M>
): Promise<MethodResultRaw<M>> {
  try {
    const response = await provider.request(method, params);
    if (!response) {
      throw new JsonRpcError('Provider did not return a response', JsonRpcErrorCode.UnknownError);
    }
    if ('error' in response) throw JsonRpcError.fromResponse(response.error);

    return response.result;
  } catch (error) {
    if (error instanceof JsonRpcError) throw error;
    if ('jsonrpc' in error) throw JsonRpcError.fromResponse(error.error);

    const code = error.code ?? JsonRpcErrorCode.UnknownError;
    throw new JsonRpcError(error.message, code, error.data, error);
  }
}

/**
 * @internal Helper function that wraps requestRaw with local storage support
 */
function createRequestWithStorage(enableLocalStorage: boolean): typeof requestRaw {
  if (!enableLocalStorage) return requestRaw;

  return async function requestRawWithStorage<M extends keyof MethodsRaw>(
    provider: StacksProvider,
    method: M,
    params?: MethodParamsRaw<M>
  ): Promise<MethodResultRaw<M>> {
    const result = await requestRaw(provider, method, params);
    if (
      (method === 'getAddresses' || (method as string) === 'wallet_connect') &&
      'addresses' in result
    ) {
      const { stx, btc } = sortAddresses(result.addresses).reduce(
        (acc, addr) => {
          acc[addr.address.startsWith('S') ? 'stx' : 'btc'].push(addr);
          return acc;
        },
        { stx: [], btc: [] }
      );

      setLocalStorageData({ addresses: { stx, btc } });
    }
    return result;
  };
}

/**
 * The main `request` method for interacting with wallets.
 * This method adds automatic error handling, request parameter serialization, and optional local storage.
 * For more advanced use cases, consider using the {@link requestRaw} method directly.
 *
 * @example
 * ```
 * // Send BTC
 * const result = await request('sendTransfer', {
 *   recipients: [{
 *     address: 'bc1...',
 *     amount: 100_000_000n, // 1 BTC = 100,000,000 sats
 *   }],
 * });
 * ```
 *
 * @example
 * ```
 * // Optional features
 * const result = await request({
 *   provider: MyCustomProvider,
 *   defaultProviders: [MyCustomProvider, ...],
 *   forceWalletSelect: false,
 *   persistWalletSelect: true,
 *   enableOverrides: true,
 *   enableLocalStorage: true,
 * }, 'method', params);
 * ```
 */
export async function request<M extends keyof Methods>(
  method: M,
  params?: MethodParams<M>
): Promise<MethodResult<M>>;
export async function request<M extends keyof Methods>(
  options: ConnectRequestOptions,
  method: M,
  params?: MethodParams<M>
): Promise<MethodResult<M>>;
export async function request<M extends keyof Methods>(
  ...args:
    | [method: M, params?: MethodParams<M>]
    | [options: ConnectRequestOptions, method: M, params?: MethodParams<M>]
): Promise<MethodResult<M>> {
  const { options: _options, method, params } = requestArgs(args);

  const opts = Object.assign(
    {
      provider: null,
      defaultProviders: DEFAULT_PROVIDERS,
      forceWalletSelect: false,
      persistWalletSelect: true,
      enableOverrides: true,
      enableLocalStorage: true,
    },
    shallowDefined(_options)
  );

  // Handle WalletConnect optional provider
  if (opts?.walletConnect) {
    await initializeWalletConnectProvider(opts.walletConnect).catch(console.error);
    opts.defaultProviders = [...opts.defaultProviders, WALLET_CONNECT_PROVIDER];
  } else if (opts?.walletConnectProjectId) {
    await initializeWalletConnectProvider(opts.walletConnectProjectId).catch(console.error);
    opts.defaultProviders = [...opts.defaultProviders, WALLET_CONNECT_PROVIDER];
  }

  // Call getProvider() after all the providers have been initialized
  opts.provider = opts.provider ?? getProvider();

  const req = wrapResultOverrides(
    opts.enableOverrides,
    createRequestWithStorage(opts.enableLocalStorage)
  );

  // WITHOUT UI
  if (opts.provider && !opts.forceWalletSelect) {
    const { method: finalMethod, params: finalParams } = getMethodOverrides(
      opts.provider,
      method,
      params,
      opts.enableOverrides
    );
    return await req(opts.provider, finalMethod as any, serializeParams(finalParams));
  }

  // WITH UI
  if (typeof window === 'undefined') return undefined; // don't throw for SSR contexts

  void defineCustomElements(window);

  return new Promise((resolve, reject) => {
    const element = document.createElement('connect-modal');
    element.defaultProviders = filterProviders(opts.approvedProviderIds, opts.defaultProviders);
    element.installedProviders = filterProviders(
      opts.approvedProviderIds,
      getInstalledProviders(opts.defaultProviders)
    );

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const closeModal = () => {
      element.remove();
      document.body.style.overflow = originalOverflow;
    };

    element.callback = (selectedProviderId: string | undefined) => {
      closeModal();

      const selectedProvider = getProviderFromId(selectedProviderId);

      const { method: finalMethod, params: finalParams } = getMethodOverrides(
        selectedProvider,
        method,
        params,
        opts.enableOverrides
      );

      const proxy = createPersistProviderProxy(opts.persistWalletSelect, selectedProviderId);
      resolve(req(selectedProvider, finalMethod as any, serializeParams(finalParams)).then(proxy));
    };

    element.cancelCallback = () => {
      closeModal();
      reject(new JsonRpcError('User canceled the request', JsonRpcErrorCode.UserCanceled));
    };

    document.body.appendChild(element);

    const handleEsc = (ev: KeyboardEvent) => {
      if (ev.key !== 'Escape') return;
      document.removeEventListener('keydown', handleEsc);
      element.remove();
      reject(new JsonRpcError('User canceled the request', JsonRpcErrorCode.UserCanceled));
    };
    document.addEventListener('keydown', handleEsc);
  });
}

/** @internal */
function requestArgs<M extends keyof Methods>(
  args:
    | [method: M, params?: MethodParams<M>]
    | [options: ConnectRequestOptions, method: M, params?: MethodParams<M>]
): {
  method: M;
  params?: MethodParams<M>;
  options?: ConnectRequestOptions;
} {
  if (typeof args[0] === 'string') return { method: args[0], params: args[1] as MethodParams<M> };
  return { options: args[0], method: args[1] as M, params: args[2] };
}

/** @internal */
function filterProviders(approvedProviderIds: string[], providers: WbipProvider[]): WbipProvider[] {
  if (!approvedProviderIds) return providers;
  return providers.filter(p => approvedProviderIds.includes(p.id));
}

/**
 * Initiate a wallet connection and request addresses.
 * Alias for `request` to `getAddresses` with `forceWalletSelect: true`.
 */
export function connect(options?: ConnectRequestOptions & MethodParams<'getAddresses'>) {
  const params = options && 'network' in options ? { network: options.network } : undefined;
  return request({ ...options, forceWalletSelect: true }, 'getAddresses', params);
}

/**
 * **Note:** Higher order function!
 * @internal Legacy non-UI request.
 */
export function requestRawLegacy<M extends keyof Methods, O, R>(
  method: M,
  mapOptions: (options: O) => MethodParams<M>,
  mapResponse: (response: MethodResult<M>) => R
) {
  return (options: O, provider?: StacksProvider) => {
    if (!provider) throw new Error('[Connect] No installed Stacks wallet found');

    const params = mapOptions(options);

    // Manual cast, since TypeScipt can't infer generic type of options
    const o = options as {
      onCancel?: (error?: Error) => void;
      onFinish?: (response: R) => void;
    };

    const { method: finalMethod, params: finalParams } = getMethodOverrides(
      provider,
      method,
      params
    );

    void requestRaw(provider, finalMethod as any, serializeParams(finalParams))
      .then(response => {
        const r = mapResponse(response);
        o.onFinish?.(r);
      })
      .catch(o.onCancel);
  };
}

// todo: strip params that might be unserializable or privacy sensitive, e.g.
// appDetails?: AuthOptions['appDetails'];
// authOrigin?: string;
// network?: ConnectNetwork;
// stxAddress?: string;
// userSession?: UserSession;
// onFinish?: ProfileUpdateFinished;
// onCancel?: ProfileUpdateCanceled;

function isXverseLike(provider: StacksProvider): boolean {
  return isXverse(provider) || isFordefi(provider);
}

function isXverse(provider: StacksProvider): boolean {
  return (
    // Best effort detection for Xverse
    'signMultipleTransactions' in provider &&
    'createRepeatInscriptions' in provider &&
    !provider?.['isLeather'] &&
    !provider?.['isFordefi']
  );
}

function isFordefi(provider: StacksProvider): boolean {
  return 'isFordefi' in provider && !!provider.isFordefi;
}

function isLeather(provider: StacksProvider): boolean {
  return 'isLeather' in provider && !!provider.isLeather;
}

function shallowDefined<T extends object>(obj: T): Partial<T> {
  if (obj === undefined) return {};
  const result: Partial<T> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) result[key as keyof T] = value;
  }
  return result;
}

/** @internal Higher-order function for proxying request results with overrides */
function wrapResultOverrides<
  M extends keyof MethodsRaw,
  P extends MethodParamsRaw<M>,
  R extends MethodResultRaw<M>,
>(
  enableOverrides: boolean,
  request: (provider: StacksProvider, method: M, params?: P) => Promise<R>
) {
  if (!enableOverrides) return request;

  return async (provider: StacksProvider, method: M, params?: P): Promise<R> => {
    const result = await request(provider, method, params);

    const modifiedResult = { ...result };

    // Handle txId/txid case variation (Fordefi returns `txId`, others return `txid`)
    if (result !== null && 'txId' in result && result.txId && !('txid' in modifiedResult)) {
      (modifiedResult as any).txid = result.txId;
    }

    // Handle Leather returning `hex` instead of `psbt` (base64 encoded)
    if (
      result !== null &&
      'hex' in result &&
      result.hex &&
      typeof result.hex === 'string' &&
      !('psbt' in modifiedResult)
    ) {
      (modifiedResult as any).psbt = base64.encode(hexToBytes(result.hex));
    }

    return modifiedResult;
  };
}

function getMethodOverrides<M extends keyof Methods>(
  provider: StacksProvider,
  method: M,
  params?: MethodParams<M>,
  enableOverrides: boolean = true
): { method: string; params: any } {
  if (!provider || !enableOverrides) return { method, params };

  // Xverse-ish wallets
  if (
    isXverseLike(provider) &&
    // Permission granting method
    ['getAddresses', 'stx_getAddresses'].includes(method)
  ) {
    return { method: 'wallet_connect', params };
  }

  // Xverse-ish `sendTransfer`
  if (isXverseLike(provider) && method === 'sendTransfer') {
    const paramsXverse = {
      ...params,
      recipients: (params as SendTransferParams).recipients.map(r => ({
        ...r,
        amount: Number(r.amount), // Xverse expects amount as number
      })),
      network: undefined, // strip network until Xverse adds it as optional
    };
    return { method, params: paramsXverse };
  }

  // Xverse-ish `signPsbt`
  if (isXverseLike(provider) && method === 'signPsbt') {
    const signInputs = (params as MethodParams<'signPsbt'>).signInputs;
    if (!signInputs) return { method, params };

    // Transform array of SignInputsByAddress into Record<string, number[]>
    const signRecord: Record<string, number[]> = {};
    for (const input of signInputs) {
      if (typeof input === 'number') continue; // Skip plain numbers
      if (!input.address) continue; // Skip entries without address

      if (!signRecord[input.address]) signRecord[input.address] = [];

      signRecord[input.address].push(input.index);
    }

    const paramsXverse = {
      psbt: (params as MethodParams<'signPsbt'>).psbt,
      signInputs: signRecord,
      broadcast: (params as MethodParams<'signPsbt'>).broadcast,
      // todo: add `network` when Xverse supports it
    };
    return { method, params: paramsXverse };
  }

  // Non-Xverse-ish `stx_signMessage`
  if (!isXverseLike(provider) && method === 'stx_signMessage') {
    const p = { ...(params as MethodParams<'stx_signMessage'>) };
    delete p.publicKey;
    return { method, params: p };
  }

  // Leather `sendTransfer`
  if (isLeather(provider) && method === 'sendTransfer') {
    const paramsLeather = {
      ...params,
      recipients: (params as SendTransferParams).recipients.map(r => ({
        ...r,
        amount: r.amount.toString(), // Leather expects amount as string
      })),
    };
    return { method, params: paramsLeather };
  }

  // Leather `signPsbt`
  if (isLeather(provider) && method === 'signPsbt') {
    const paramsLeather = {
      hex: bytesToHex(base64.decode((params as MethodParams<'signPsbt'>).psbt)),
      signAtIndex: (params as MethodParams<'signPsbt'>).signInputs.map(i => {
        if (typeof i === 'number') return i;
        return i.index;
      }),
      allowedSighash: (params as MethodParams<'signPsbt'>).allowedSighash,
      broadcast: (params as MethodParams<'signPsbt'>).broadcast,
      network: (params as MethodParams<'signPsbt'>).network,
    };
    return { method, params: paramsLeather };
  }

  return { method, params };
}

const POST_CONDITIONS = [
  'stx-postcondition',
  'ft-postcondition',
  'nft-postcondition',
] satisfies PostCondition['type'][];

/**
 * @internal
 * Simple function for serializing clarity object values to hex strings, in case wallets don't support them.
 */
export function serializeParams<M extends keyof Methods>(params: MethodParams<M>): MethodParams<M> {
  if (!params || typeof params !== 'object') return params;

  const result = { ...params };

  for (const [key, value] of Object.entries(params)) {
    // Handle bigint values
    if (typeof value === 'bigint') {
      result[key] = value.toString();
      continue;
    }

    // Keep original value, don't override
    if (!value) continue;

    // Handle array of things
    if (Array.isArray(value)) {
      result[key] = value.map(item => {
        if (typeof item === 'bigint') return item.toString();
        if (!item || typeof item !== 'object' || !('type' in item)) return item;
        if (POST_CONDITIONS.includes(item.type)) return postConditionToHex(item);
        return Cl.serialize(item);
      });
      continue;
    }

    // Handle things
    if (typeof value === 'object' && 'type' in value) {
      result[key] = POST_CONDITIONS.includes(value.type)
        ? // Post condition
          postConditionToHex(value)
        : // Clarity value
          Cl.serialize(value);
    }
  }

  return JSON.parse(JSON.stringify(result)); // Strip unserializable values
}

/** @internal Higher order function for persisting the selected provider */
function createPersistProviderProxy(shouldPersist: boolean, providerId: string) {
  return function persistProvider<T>(result: T) {
    if (shouldPersist) {
      try {
        setSelectedProviderId(providerId);
      } catch (e) {
        // ignore errors
      }
    }

    return result;
  };
}

/** @internal */
function sortAddresses(addresses: AddressEntry[]) {
  return addresses.slice().sort((a, b) => {
    const aPayment = 'purpose' in a && a.purpose === 'payment';
    const bPayment = 'purpose' in b && b.purpose === 'payment';

    // Move payment addresses to the beginning
    if (aPayment && !bPayment) return -1;
    if (!aPayment && bPayment) return 1;
    return 0;
  });
}
