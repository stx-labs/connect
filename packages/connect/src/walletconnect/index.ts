import { UniversalConnector, UniversalConnectorConfig } from '@reown/appkit-universal-connector';
import {
  AddressEntry,
  GetAddressesResult,
  JsonRpcResponse,
  MethodParamsRaw,
  MethodsRaw,
  NetworkString,
  SignMessageResult,
} from '../methods';
import { StacksProvider } from '../types/provider';
import { Chains, Default } from './config';

function jsonRpcResponse<M extends keyof MethodsRaw>(result: unknown): JsonRpcResponse<M> {
  return {
    jsonrpc: '2.0',
    id: 1,
    result,
  } as JsonRpcResponse<M>;
}

class WalletConnectProvider implements StacksProvider {
  private connector: UniversalConnector;
  constructor(connector: UniversalConnector) {
    this.connector = connector;
  }

  private async connect() {
    try {
      const { session } = await this.connector.connect();
      return session;
    } catch (error) {
      console.error('>> WalletConnectProvider connect error', error);
      throw error;
    }
  }

  private get stacksAddresses(): (AddressEntry & { path?: string; purpose?: string })[] {
    const session = this.connector.provider?.session;

    if (!session?.namespaces?.stacks?.accounts) return [];

    const stacksSessionAddressesString = session?.sessionProperties?.['stacks_getAddresses'];
    const stacksSessionAddresses = JSON.parse(stacksSessionAddressesString || '[]');
    const stacksAddresses = session.namespaces.stacks.accounts.map(account => ({
      address: account.split(':')[2],
      publicKey: '',
    }));

    const allAddresses: AddressEntry[] = [
      ...(stacksAddresses || []),
      ...(stacksSessionAddresses || []),
    ].sort(a => (a.publicKey ? 1 : -1));

    return Array.from(new Map(allAddresses.map(addr => [addr.address, addr])).values());
  }

  private get btcAddresses(): AddressEntry[] {
    const session = this.connector.provider?.session;

    if (!session?.namespaces?.bip122?.accounts) return [];

    const btcSessionAddressesString = session?.sessionProperties['bip122_getAccountAddresses'];
    const btcSessionAddresses = JSON.parse(btcSessionAddressesString || '{}');
    const btcAddresses = session.namespaces.bip122.accounts.map(account => ({
      address: account.split(':')[2],
      publicKey: '',
    }));

    const allAddresses: (AddressEntry & { path?: string; purpose?: string })[] = [
      ...(btcSessionAddresses?.payment.map(a => ({ ...a, purpose: 'payment' })) || []),
      ...(btcSessionAddresses?.ordinal.map(a => ({ ...a, purpose: 'ordinal' })) || []),
      ...(btcAddresses || []),
    ]
      // Sort entries without public key first, to overwrite with entries from session with public key
      .sort(a => (a.publicKey ? 1 : -1))
      // Sort by address length ascending (payment first)
      .sort((a, b) => a?.address.length - b?.address.length);

    return Array.from(new Map(allAddresses.map(addr => [addr.address, addr])).values());
  }

  private async getAddresses(): Promise<GetAddressesResult> {
    let session = this.connector.provider?.session;

    if (!session) {
      session = await this.connect();
    }

    const stacksAddresses = this.stacksAddresses;
    const btcAddresses = this.btcAddresses;
    const addresses = [...stacksAddresses, ...btcAddresses];

    return { addresses };
  }

  private validateRpcMethod(method: keyof MethodsRaw) {
    const accountMethods = ['getAddresses', 'stx_getAccounts', 'stx_getAddresses'];
    if (accountMethods.includes(method)) {
      return;
    }

    if (!this.connector.provider?.session) {
      throw new Error('WalletConnectProvider not connected. Please connect first.');
    }
    const namespaces = this.connector.provider?.session.namespaces;
    const stacksMethods = namespaces['stacks']?.methods || [];
    const btcMethods = namespaces['bip122']?.methods || [];
    const methods = [...stacksMethods, ...btcMethods];

    if (!methods.includes(method)) {
      throw new Error(
        `WalletConnectProvider does not support method ${method}. Please use a supported method.`
      );
    }
  }

  private getTargetCaipNetworkId<M extends keyof MethodsRaw>(
    method: M,
    params?: MethodParamsRaw<M>
  ) {
    const accountMethods = ['getAddresses', 'stx_getAccounts', 'stx_getAddresses'];
    const network = params && 'network' in params ? (params.network as NetworkString) : undefined;

    if (network) {
      return {
        mainnet: Chains.Stacks.Mainnet.caipNetworkId,
        testnet: Chains.Stacks.Testnet.caipNetworkId,
      }[network];
    }

    if (accountMethods.includes(method)) {
      return Chains.Stacks.Mainnet.caipNetworkId;
    }

    if (this.connector.provider?.session?.namespaces?.stacks?.methods.includes(method)) {
      return Chains.Stacks.Mainnet.caipNetworkId;
    }

    if (this.connector.provider?.session?.namespaces?.bip122?.methods.includes(method)) {
      return Chains.Bitcoin.Mainnet.caipNetworkId;
    }

    throw new Error(
      `WalletConnectProvider does not support method ${method}. Please use a supported method.`
    );
  }

  async request<M extends keyof MethodsRaw>(
    method: M,
    params?: MethodParamsRaw<M>
  ): Promise<JsonRpcResponse<M>> {
    try {
      this.validateRpcMethod(method);
      const caipNetworkId = this.getTargetCaipNetworkId(method, params);

      switch (method) {
        case 'getAddresses':
        case 'stx_getAddresses':
        case 'stx_getAccounts':
          const addresses = await this.getAddresses();
          return jsonRpcResponse(addresses);
        case 'stx_signMessage':
          const caipAddress = this.connector.provider?.session?.namespaces?.stacks?.accounts[0];
          const address = caipAddress.split(':')[2];
          const result = (await this.connector.request(
            { method, params: { address, ...params } },
            caipNetworkId
          )) as SignMessageResult;
          return jsonRpcResponse(result);
        default:
          return (await this.connector.request(
            { method, params },
            caipNetworkId
          )) as JsonRpcResponse<M>;
      }
    } catch (error) {
      console.error('>> WalletConnectProvider request error', error);
      throw error;
    }
  }

  async disconnect() {
    await this.connector.disconnect();
  }
}

export async function initializeWalletConnectProvider(projectId: string): Promise<void>;
export async function initializeWalletConnectProvider(
  config: Partial<Pick<UniversalConnectorConfig, 'metadata' | 'networks'>> &
    Omit<UniversalConnectorConfig, 'metadata' | 'networks'>
): Promise<void>;
export async function initializeWalletConnectProvider(
  arg:
    | string
    | (Partial<Pick<UniversalConnectorConfig, 'metadata' | 'networks'>> &
        Omit<UniversalConnectorConfig, 'metadata' | 'networks'>)
): Promise<void> {
  if (window['WalletConnectProvider']) return;

  const { projectId, config } =
    typeof arg === 'string'
      ? { projectId: arg, config: undefined }
      : { projectId: arg.projectId, config: arg };

  const provider = await UniversalConnector.init({
    ...Default,
    ...config,
    projectId,
  });

  const walletConnectProvider = new WalletConnectProvider(provider);

  window['WalletConnectProvider'] = walletConnectProvider;
}

// Re-export config constants
export { Networks, Chains, Default } from './config';

// Export with consumer-facing name
export { initializeWalletConnectProvider as initializeProvider };
