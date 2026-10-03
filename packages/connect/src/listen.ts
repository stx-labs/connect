import { getProvider } from '@stacks/connect-ui';
import { GetNetworksResult } from './methods';
import { requestRaw } from './request';
import { StacksProvider } from './types';

export interface ConnectListenOptions {
  provider?: StacksProvider;
  /** Translate legacy Xverse network notifications by re-reading the SIP result. */
  enableOverrides?: boolean;
  /** Async compatibility-query failures are surfaced here, never as fake network data. */
  onError?: (error: unknown) => void;
}

export function listen(
  event: 'stx_networkChange',
  listener: (result: GetNetworksResult) => void
): () => void;
export function listen(
  options: ConnectListenOptions,
  event: 'stx_networkChange',
  listener: (result: GetNetworksResult) => void
): () => void;
export function listen(
  ...args:
    | [event: 'stx_networkChange', listener: (result: GetNetworksResult) => void]
    | [
        options: ConnectListenOptions,
        event: 'stx_networkChange',
        listener: (result: GetNetworksResult) => void,
      ]
): () => void {
  const [options, event, listener] =
    typeof args[0] === 'string'
      ? ([{}, args[0], args[1]] as [
          ConnectListenOptions,
          'stx_networkChange',
          (result: GetNetworksResult) => void,
        ])
      : (args as [ConnectListenOptions, 'stx_networkChange', (result: GetNetworksResult) => void]);
  const provider = options.provider ?? (typeof window !== 'undefined' ? getProvider() : undefined);
  if (!provider) throw new Error('[Connect] Select a wallet before registering a listener.');
  if (event !== 'stx_networkChange') throw new Error('[Connect] Unsupported SIP-030 event.');
  if (provider.listen) return provider.listen(event, listener);
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
