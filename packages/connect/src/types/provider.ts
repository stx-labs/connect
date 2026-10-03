import {
  AccountEntry,
  GetNetworksResult,
  JsonRpcResponse,
  MethodParamsRaw,
  MethodsRaw,
} from '../methods';

export interface ListenEventMap {
  stx_networkChange: GetNetworksResult;
  stx_accountChange: AccountEntry[];
}

export interface StacksProvider {
  /** Optional so request-only providers remain source-compatible. */
  listen?: <E extends keyof ListenEventMap>(
    event: E,
    listener: (result: ListenEventMap[E]) => void
  ) => () => void;
  request<M extends keyof MethodsRaw>(
    method: M,
    params?: MethodParamsRaw<M>
  ): Promise<JsonRpcResponse<M>>;
}
