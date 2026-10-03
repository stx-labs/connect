import { getProvider } from '@stacks/connect-ui';
import { GetNetworksResult } from './methods';
import { requestRaw } from './request';
import { ListenEventMap, StacksProvider } from './types';

export interface ConnectListenOptions {
  provider?: StacksProvider;
  /** Translate legacy Xverse network notifications by re-reading the SIP result. */
  enableOverrides?: boolean;
  /** Async compatibility-query failures are surfaced here, never as fake network data. */
  onError?: (error: unknown) => void;
}

export function listen<E extends keyof ListenEventMap>(
  event: E,
  listener: (result: ListenEventMap[E]) => void
): () => void;
export function listen<E extends keyof ListenEventMap>(
  options: ConnectListenOptions,
  event: E,
  listener: (result: ListenEventMap[E]) => void
): () => void;
export function listen<E extends keyof ListenEventMap>(
  ...args:
    | [event: E, listener: (result: ListenEventMap[E]) => void]
    | [options: ConnectListenOptions, event: E, listener: (result: ListenEventMap[E]) => void]
): () => void {
  const [options, event, listener] =
    typeof args[0] === 'string'
      ? ([{}, args[0], args[1]] as [ConnectListenOptions, E, (result: ListenEventMap[E]) => void])
      : (args as [ConnectListenOptions, E, (result: ListenEventMap[E]) => void]);
  const provider = options.provider ?? (typeof window !== 'undefined' ? getProvider() : undefined);
  if (!provider) throw new Error('[Connect] Select a wallet before registering a listener.');
  if (event !== 'stx_networkChange' && event !== 'stx_accountChange') {
    throw new Error('[Connect] Unsupported SIP-030 event.');
  }
  if (provider.listen) return provider.listen(event, listener);
  // A legacy account event cannot promise SIP fields or their wallet-specific Gaia policy.
  // Never re-read stx_getAccounts here: that can open an approval popup.
  if (event === 'stx_accountChange') {
    throw new Error('[Connect] This provider does not support SIP-030 account listeners.');
  }
  return listenLegacyNetwork(options, provider, listener as (result: GetNetworksResult) => void);
}

function listenLegacyNetwork(
  options: ConnectListenOptions,
  provider: StacksProvider,
  listener: (result: GetNetworksResult) => void
): () => void {
  const legacy = provider as StacksProvider & {
    addListener?: (...args: any[]) => () => void;
  };
  if (options.enableOverrides === false || !legacy.addListener) {
    throw new Error('[Connect] This provider does not support SIP-030 listeners.');
  }
  let active = true;
  // Serialize reads to preserve notification order and prevent delivery after unlisten.
  let queue = Promise.resolve();
  const callback = () => {
    queue = queue
      .then(async () => {
        if (!active) return;
        const result = await requestRaw(provider, 'stx_getNetworks');
        if (active) listener(result);
      })
      .catch(error => {
        if (active) (options.onError ?? console.error)(error);
      });
  };
  const unlisten =
    legacy.addListener.length >= 2
      ? legacy.addListener('networkChange', callback)
      : legacy.addListener({ eventName: 'networkChange', cb: callback });
  return () => {
    active = false;
    unlisten();
  };
}
