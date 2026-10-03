import { GetNetworksResult, JsonRpcResponse, MethodParamsRaw, MethodsRaw } from '../methods';

export interface StacksProvider {
  /** Optional so request-only providers remain source-compatible. */
  listen?: (
    event: 'stx_networkChange',
    listener: (result: GetNetworksResult) => void
  ) => () => void;
  request<M extends keyof MethodsRaw>(
    method: M,
    params?: MethodParamsRaw<M>
  ): Promise<JsonRpcResponse<M>>;
}
