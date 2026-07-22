import type {
  AddressString,
  ClarityValue,
  ContractIdString,
  PostCondition,
  PostConditionModeName,
  TupleCV,
} from '@stacks/transactions';
import { LiteralUnion } from 'type-fest';

// Re-export types from Stacks.js
export type {
  AddressString,
  AssetString,
  ClarityValue,
  ContractIdString,
  FungibleComparator,
  FungiblePostCondition,
  NonFungibleComparator,
  NonFungiblePostCondition,
  PostCondition,
  PostConditionModeName,
  StxPostCondition,
} from '@stacks/transactions';

// TYPES

export type NetworkString = LiteralUnion<'mainnet' | 'testnet' | 'regtest' | 'devnet', string>;

export type PrincipalString = AddressString | ContractIdString;

export type Integer = number | bigint | string;

export interface AddressEntry {
  symbol?: string;
  address: string;
  publicKey: string;
}

export interface AccountEntry extends AddressEntry {
  gaiaHubUrl: string;
  gaiaAppKey: string;
}

// PARAMS

interface CommonTxParams {
  /**
   * The recommended address to use for the method.
   *
   * ⚠︎ Warning: Wallets may not implement this for privacy reasons.
   */
  address?: AddressString;

  network?: NetworkString;

  fee?: Integer;
  nonce?: Integer;

  sponsored?: boolean;

  postConditions?: (string | PostCondition)[]; // hex-encoded string or JSON PostCondition
  postConditionMode?: PostConditionModeName;
}

export interface TransferStxParams
  extends Omit<CommonTxParams, 'postConditions' | 'postConditionMode'> {
  recipient: string;
  amount: Integer;
  memo?: string;
}

export interface TransferFungibleParams extends CommonTxParams {
  recipient: string;
  asset: string;
  amount: Integer;
}

export interface TransferNonFungibleParams extends CommonTxParams {
  recipient: string;
  asset: string;
  assetId: string | ClarityValue; // todo: add string (hex-encoded), add string (clarity syntax)
}

export interface CallContractParams extends CommonTxParams {
  contract: ContractIdString;
  functionName: string;
  functionArgs?: string[] | ClarityValue[]; // todo: add string (hex-encoded), add string (clarity syntax)
}

export interface DeployContractParams extends CommonTxParams {
  name: string;
  clarityCode: string;
  clarityVersion?: number | string;
}

export interface SignTransactionParams {
  transaction: string;
  broadcast?: boolean; // todo: check before merging
}

export interface SignMessageParams {
  message: string;
  /**
   * ⚠︎ **Attention**: `.publicKey` is a non-standard parameter. Its usage is not recommended, but may be supported by some wallets.
   * @experimental This parameter may be removed in the future, when wallets align more.
   */
  publicKey?: string;
}

export interface SignStructuredMessageParams {
  message: ClarityValue;
  domain: TupleCV;
}

export interface GetAddressesParams {
  network?: NetworkString;
  // When updating this interface, make sure to update the `connect` function
  // in `request.ts`, to pass all available params to the wrapped method.
}

export interface SendTransferParams {
  recipients: {
    address: string;
    amount: Integer;
  }[];
  network?: NetworkString;
}

export interface GetAccountsParams {
  network?: NetworkString;
}

export interface UpdateProfileParams {
  profile: Record<string, any>;
}

// RESULTS

export interface TxidResult {
  txid: string;
}

export interface TransactionResult {
  txid?: string;
  transaction?: string; // todo: check before merging
}

export interface SignTransactionResult {
  txid?: string;
  transaction: string;
}

export interface SignMessageResult {
  signature: string;
  publicKey: string;
}

export interface GetAddressesResult {
  addresses: AddressEntry[];
}

export interface SendTransferResult {
  txid: string;
}

export interface GetAccountsResult {
  accounts: AccountEntry[];
}

export interface UpdateProfileResult {
  profile: Record<string, any>;
}

// ERROR RESPONSES

// todo: add error responses

// JSON RPC METHODS

/// BITCOIN METHODS

export type Sighash = 'ALL' | 'NONE' | 'SINGLE' | 'ANYONECANPAY';

export interface SignInputsByAddress {
  index: number;
  address: string; // todo: make optional again when Xverse adopts it
  publicKey?: string;

  /** @experimental Might need a rename, when wallets adopt SIPs/WBIPs. */
  allowedSighash?: Sighash[];
}

export interface SignPsbtParams {
  psbt: string;
  signInputs?: number[] | SignInputsByAddress[];
  broadcast?: boolean;
  network?: NetworkString;

  /** @experimental Might need a rename, when wallets adopt SIPs/WBIPs. */
  allowedSighash?: Sighash[];

  /**
   * A `wsh(...)` output descriptor, for signing a P2WSH miniscript policy input.
   * @experimental Leather-specific; not yet part of a SIP/WBIP.
   */
  descriptor?: string;
}

export interface SignPsbtResult {
  txid?: string;
  psbt: string;
}

export type JsonRpcResponseError = {
  code: number;
  message: string;
  data?: any;
};

// todo: double check spec
export type JsonRpcResponse<M extends keyof MethodsRaw> = {
  jsonrpc: '2.0';
  id: string | number | null;
} & (
  | {
      result: MethodsRaw[M]['result'];
    }
  | {
      error: JsonRpcResponseError;
    }
);

export type Methods = {
  // BTC
  getAddresses: {
    params: GetAddressesParams;
    result: GetAddressesResult;
  };
  sendTransfer: {
    params: SendTransferParams;
    result: TxidResult;
  };
  signPsbt: {
    params: SignPsbtParams;
    result: SignPsbtResult;
  };

  // STX
  stx_transferStx: {
    params: TransferStxParams;
    result: TransactionResult;
  };
  stx_transferSip10Ft: {
    params: TransferFungibleParams;
    result: TransactionResult;
  };
  stx_transferSip9Nft: {
    params: TransferNonFungibleParams;
    result: TransactionResult;
  };
  stx_callContract: {
    params: CallContractParams;
    result: TransactionResult;
  };
  stx_deployContract: {
    params: DeployContractParams;
    result: TransactionResult;
  };
  stx_signTransaction: {
    params: SignTransactionParams;
    result: SignTransactionResult;
  };
  stx_signMessage: {
    params: SignMessageParams;
    result: SignMessageResult;
  };
  stx_signStructuredMessage: {
    params: SignStructuredMessageParams;
    result: SignMessageResult;
  };
  stx_getAddresses: {
    params: GetAddressesParams;
    result: GetAddressesResult;
  };
  stx_getAccounts: {
    params: GetAccountsParams;
    result: GetAccountsResult;
  };
  stx_updateProfile: {
    params: UpdateProfileParams;
    result: UpdateProfileResult;
  };
};

export type MethodParams<M extends keyof Methods> = Methods[M]['params'];

export type MethodResult<M extends keyof Methods> = Methods[M]['result'];

/** @internal */
type TransformBigIntAndClarityToString<T> = T extends ClarityValue
  ? string
  : T extends bigint
    ? string
    : T extends (infer U)[]
      ? TransformBigIntAndClarityToString<U>[]
      : T extends object
        ? {
            [K in keyof T]: TransformBigIntAndClarityToString<T[K]>;
          }
        : T;

export type MethodsRaw = {
  [K in keyof Methods]: {
    params: TransformBigIntAndClarityToString<Methods[K]['params']>;
    result: TransformBigIntAndClarityToString<Methods[K]['result']>;
  };
};

export type MethodParamsRaw<M extends keyof Methods> = MethodsRaw[M]['params'];

export type MethodResultRaw<M extends keyof Methods> = MethodsRaw[M]['result'];
