import { getProviderFromId, getSelectedProviderId } from '@stacks/connect-ui';
import { TransactionVersion } from '@stacks/network';
import {
  StacksDevnet as LegacyStacksDevnet,
  StacksMainnet as LegacyStacksMainnet,
  StacksMocknet as LegacyStacksMocknet,
  StacksNetwork as LegacyStacksNetwork,
  StacksTestnet as LegacyStacksTestnet,
} from '@stacks/network-v6';
import { Address, Cl, ClarityValue } from '@stacks/transactions';
import {
  ClarityType as LegacyClarityType,
  ClarityValue as LegacyClarityValue,
} from '@stacks/transactions-v6';
import { ConnectNetwork } from './types';

/**
 * Gets the current Stacks wallet provider instance.
 * 
 * @deprecated This will default to the legacy provider. The behavior may be undefined with competing wallets.
 * Consider using the `request` method instead for better wallet compatibility.
 * 
 * @returns The current Stacks provider instance, or undefined if no provider is available.
 * @see {@link isStacksWalletInstalled} to check if a wallet is installed
 * 
 * @example
 * ```ts
 * const provider = getStacksProvider();
 * if (provider) {
 *   // Provider is available
 * }
 * ```
 */
export function getStacksProvider() {
  const provider = getProviderFromId(getSelectedProviderId());
  return provider || (window as any).StacksProvider || (window as any).BlockstackProvider;
}

/**
 * Checks if a Stacks-compatible wallet extension is installed and available.
 * 
 * @returns `true` if a Stacks wallet provider is detected, `false` otherwise.
 * 
 * @example
 * ```ts
 * if (isStacksWalletInstalled()) {
 *   console.log('Wallet is available!');
 * } else {
 *   console.log('Please install a Stacks wallet');
 * }
 * ```
 */
export function isStacksWalletInstalled() {
  return !!getStacksProvider();
}

/** @internal */
export function legacyNetworkFromConnectNetwork(network?: ConnectNetwork): LegacyStacksNetwork {
  if (!network) return new LegacyStacksTestnet();
  if (typeof network === 'string') return LegacyStacksNetwork.fromName(network);
  if ('version' in network) return network; // legacy type

  if ('url' in network) return new LegacyStacksMainnet({ url: network.url }); // experimental

  return network.transactionVersion === (TransactionVersion.Mainnet as number)
    ? new LegacyStacksMainnet({ url: network.client.baseUrl })
    : new LegacyStacksTestnet({ url: network.client.baseUrl });
}

function isInstance<T>(object: any, clazz: { new(...args: any[]): T }): object is T {
  return object instanceof clazz || object?.constructor?.name?.toLowerCase() === clazz.name;
}

/**
 * Converts a ConnectNetwork to its string representation.
 * 
 * @internal
 * @param network - The network configuration to convert. Can be a string, legacy network object, or new network format.
 * @returns A string identifying the network: 'mainnet', 'testnet', 'devnet', or a custom URL.
 * 
 * @example
 * ```ts
 * connectNetworkToString('testnet'); // Returns 'testnet'
 * connectNetworkToString(undefined); // Returns 'mainnet'
 * ```
 */
export function connectNetworkToString(network: ConnectNetwork): string {
  // not perfect, but good enough to identify the legacy network in most cases
  if (!network) return 'mainnet';
  if (typeof network === 'string') return network;
  if (isInstance(network, LegacyStacksMainnet)) return 'mainnet';
  if (isInstance(network, LegacyStacksTestnet)) return 'testnet';
  if (isInstance(network, LegacyStacksDevnet)) return 'devnet';
  if (isInstance(network, LegacyStacksMocknet)) return 'devnet';

  if ('coreApiUrl' in (network as any)) return (network as any).coreApiUrl; // in case alternate network was used
  if ('url' in network) return network.url;
  if ('transactionVersion' in network) {
    return network.transactionVersion === (TransactionVersion.Mainnet as number)
      ? 'mainnet'
      : 'testnet';
  }
  return 'mainnet';
}

/**
 * Converts a legacy Clarity value format to the modern format.
 * 
 * @internal - This may be moved to Stacks.js in the future.
 * @param cv - The Clarity value to convert. Can be either legacy or modern format.
 * @returns The converted Clarity value in modern format.
 * @throws {Error} If an unknown Clarity type is encountered.
 * 
 * @remarks
 * This function handles conversion from the v6 transaction format to the current format.
 * If the value is already in modern format (string type), it's returned as-is.
 */
export function legacyCVToCV(cv: LegacyClarityValue | ClarityValue): ClarityValue {
  if (typeof cv.type === 'string') return cv;

  switch (cv.type) {
    case LegacyClarityType.BoolFalse:
      return Cl.bool(false);
    case LegacyClarityType.BoolTrue:
      return Cl.bool(true);
    case LegacyClarityType.Int:
      return Cl.int(cv.value);
    case LegacyClarityType.UInt:
      return Cl.uint(cv.value);
    case LegacyClarityType.Buffer:
      return Cl.buffer(cv.buffer);
    case LegacyClarityType.StringASCII:
      return Cl.stringAscii(cv.data);
    case LegacyClarityType.StringUTF8:
      return Cl.stringUtf8(cv.data);
    case LegacyClarityType.List:
      return Cl.list(cv.list.map(legacyCVToCV));
    case LegacyClarityType.Tuple:
      return Cl.tuple(
        Object.fromEntries(Object.entries(cv.data).map(([k, v]) => [k, legacyCVToCV(v)]))
      );
    case LegacyClarityType.OptionalNone:
      return Cl.none();
    case LegacyClarityType.OptionalSome:
      return Cl.some(legacyCVToCV(cv.value));
    case LegacyClarityType.ResponseErr:
      return Cl.error(legacyCVToCV(cv.value));
    case LegacyClarityType.ResponseOk:
      return Cl.ok(legacyCVToCV(cv.value));
    case LegacyClarityType.PrincipalContract:
      return Cl.contractPrincipal(Address.stringify(cv.address), cv.contractName.content);
    case LegacyClarityType.PrincipalStandard:
      return Cl.standardPrincipal(Address.stringify(cv.address));
    default:
      const _exhaustiveCheck: never = cv;
      throw new Error(`Unknown clarity type: ${_exhaustiveCheck}`);
  }
}

/**
 * Removes callback functions that cannot be serialized from an options object.
 * 
 * @internal
 * @param obj - The object to sanitize, typically wallet request options.
 * @returns A new object with `onFinish` and `onCancel` callbacks removed.
 * 
 * @remarks
 * This is used when preparing request parameters to be sent to wallet providers,
 * as callback functions cannot be serialized for cross-context communication.
 */
export function removeUnserializableKeys<O>(
  obj: O | { onFinish?: Function; onCancel?: Function }
): O {
  return {
    ...obj,
    onFinish: undefined,
    onCancel: undefined,
  } as O;
}
