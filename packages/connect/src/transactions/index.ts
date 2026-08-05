import { bytesToHex } from '@stacks/common';
import { ChainId } from '@stacks/network';
import {
  Cl,
  deserializeTransaction,
  PostCondition,
  PostConditionMode,
  PostConditionModeName,
} from '@stacks/transactions';
import {
  PostCondition as LegacyPostCondition,
  serializePostCondition as legacySerializePostCondition,
} from '@stacks/transactions-v6';
import { MethodParams, MethodResult } from '../methods';
import { requestRawLegacy } from '../request';
import { StacksProvider } from '../types';
import {
  ContractCallOptions,
  ContractCallRegularOptions,
  ContractCallSponsoredOptions,
  ContractDeployOptions,
  FinishedTxData,
  SignTransactionFinishedTxData,
  SignTransactionOptions,
  SponsoredFinishedTxData,
  STXTransferOptions,
  STXTransferRegularOptions,
  STXTransferSponsoredOptions,
  TransactionOptions,
} from '../types/transactions';
import {
  connectNetworkToString,
  getStacksProvider,
  legacyCVToCV,
  legacyNetworkFromConnectNetwork,
} from '../utils';
import { AppConfig, UserSession } from '../auth';

/** @deprecated Update to the latest `request` RPC methods. It's not recommended to use the UserSession. */
export const getUserSession = (_userSession?: UserSession) => {
  let userSession = _userSession;

  if (!userSession) {
    const appConfig = new AppConfig(['store_write'], document.location.href);
    userSession = new UserSession({ appConfig });
  }
  return userSession;
};

/** @deprecated Update to the latest `request` RPC methods. It's not recommended to use the UserSession. */
export function hasAppPrivateKey(userSession?: UserSession) {
  try {
    const session = getUserSession(userSession).loadUserData();
    return session.appPrivateKey;
  } catch (e) {
    return false;
  }
}

/** @deprecated No-op. Update to the latest `request` RPC methods. */
export const getKeys = (_userSession?: UserSession) => {};

/** @deprecated Update to the latest `request` RPC methods. It's not recommended to use the UserSession. */
export function getStxAddress(options: TransactionOptions) {
  const { stxAddress, userSession, network: _network } = options;

  if (stxAddress) return stxAddress;
  if (!userSession || !_network) return undefined;
  const stxAddresses = userSession?.loadUserData().profile?.stxAddress;

  const chainIdToKey = {
    [ChainId.Mainnet]: 'mainnet',
    [ChainId.Testnet]: 'testnet',
  };
  const network = legacyNetworkFromConnectNetwork(_network);
  const address: string | undefined = stxAddresses?.[chainIdToKey[network.chainId]];
  return address;
}

/** @deprecated No-op. Tokens are not needed for latest RPC endpoints. */
export const makeContractCallToken = async (_options: ContractCallOptions) => {};

/** @deprecated No-op. Tokens are not needed for latest RPC endpoints. */
export const makeContractDeployToken = async (_options: ContractDeployOptions) => {};

/** @deprecated No-op. Tokens are not needed for latest RPC endpoints. */
export const makeSTXTransferToken = async (_options: STXTransferOptions) => {};

/** @deprecated No-op. Tokens are not needed for latest RPC endpoints. */
export const makeSignTransaction = async (_options: SignTransactionOptions) => {};

// # TRANSACTION METHODS

// ## Contract Call

const METHOD_CALL_CONTRACT = 'stx_callContract' as const;

/** @internal */
export const LEGACY_CALL_CONTRACT_OPTIONS_MAP = (
  options: ContractCallOptions
): MethodParams<typeof METHOD_CALL_CONTRACT> => {
  const functionArgs = options.functionArgs
    ?.map(arg => {
      if (typeof arg === 'string') return Cl.deserialize(arg);
      return legacyCVToCV(arg);
    })
    // serialize to hex, since some wallets expect hex-encoded args
    .map(arg => Cl.serialize(arg));

  return {
    ...options,
    contract: `${options.contractAddress}.${options.contractName}`,
    functionArgs,
    network: connectNetworkToString(options.network),
    postConditionMode: optPostConditionMode(options.postConditionMode),
    postConditions: optPostCondition(options.postConditions),
    address: options.stxAddress,
  };
};

/** @internal */
export const LEGACY_CALL_CONTRACT_RESPONSE_MAP = (
  response: MethodResult<typeof METHOD_CALL_CONTRACT>
): FinishedTxData | SponsoredFinishedTxData => ({
  txId: response.txid,
  txRaw: response.transaction,
  stacksTransaction: deserializeTransaction(response.transaction),
});

/** Compatible interface with previous Connect `openContractCall` version, but using new SIP-030 RPC method. */
export function openContractCall(
  options: ContractCallOptions | ContractCallRegularOptions | ContractCallSponsoredOptions,
  provider: StacksProvider = getStacksProvider()
) {
  requestRawLegacy(
    METHOD_CALL_CONTRACT,
    LEGACY_CALL_CONTRACT_OPTIONS_MAP,
    LEGACY_CALL_CONTRACT_RESPONSE_MAP
  )(options, provider);
}

// ## Contract Deploy

const METHOD_DEPLOY_CONTRACT = 'stx_deployContract' as const;

/** @internal */
export const LEGACY_DEPLOY_CONTRACT_OPTIONS_MAP = (
  options: ContractDeployOptions
): MethodParams<typeof METHOD_DEPLOY_CONTRACT> => ({
  ...options,
  name: options.contractName,
  clarityCode: options.codeBody,
  network: connectNetworkToString(options.network),
  postConditionMode: optPostConditionMode(options.postConditionMode),
  postConditions: optPostCondition(options.postConditions),
  address: options.stxAddress,
});

/** @internal */
export const LEGACY_DEPLOY_CONTRACT_RESPONSE_MAP = (
  response: MethodResult<typeof METHOD_DEPLOY_CONTRACT>
): FinishedTxData | SponsoredFinishedTxData => ({
  txId: response.txid,
  txRaw: response.transaction,
  stacksTransaction: deserializeTransaction(response.transaction),
});

/** Compatible interface with previous Connect `openContractDeploy` version, but using new SIP-030 RPC method. */
export function openContractDeploy(
  options: ContractDeployOptions,
  provider: StacksProvider = getStacksProvider()
) {
  requestRawLegacy(
    METHOD_DEPLOY_CONTRACT,
    LEGACY_DEPLOY_CONTRACT_OPTIONS_MAP,
    LEGACY_DEPLOY_CONTRACT_RESPONSE_MAP
  )(options, provider);
}

// ## STX Transfer

const METHOD_TRANSFER_STX = 'stx_transferStx' as const;

/** @internal */
export const LEGACY_TRANSFER_STX_OPTIONS_MAP = (
  options: STXTransferOptions
): MethodParams<typeof METHOD_TRANSFER_STX> => ({
  ...options,
  amount: options.amount.toString(),
  network: connectNetworkToString(options.network),
  address: options.stxAddress,
});

/** @internal */
export const LEGACY_TRANSFER_STX_RESPONSE_MAP = (
  response: MethodResult<typeof METHOD_TRANSFER_STX>
): FinishedTxData | SponsoredFinishedTxData => ({
  txId: response.txid,
  txRaw: response.transaction,
  stacksTransaction: deserializeTransaction(response.transaction),
});

/** Compatible interface with previous Connect `openSTXTransfer` version, but using new SIP-030 RPC method. */
export function openSTXTransfer(
  options: STXTransferOptions | STXTransferRegularOptions | STXTransferSponsoredOptions,
  provider: StacksProvider = getStacksProvider()
) {
  requestRawLegacy(
    METHOD_TRANSFER_STX,
    LEGACY_TRANSFER_STX_OPTIONS_MAP,
    LEGACY_TRANSFER_STX_RESPONSE_MAP
  )(options, provider);
}

// ## Sign Transaction

const METHOD_SIGN_TRANSACTION = 'stx_signTransaction' as const;

/** @internal */
export const LEGACY_SIGN_TRANSACTION_OPTIONS_MAP = (
  options: SignTransactionOptions
): MethodParams<typeof METHOD_SIGN_TRANSACTION> => ({
  ...options,
  transaction: options.txHex,
});

/** @internal */
export const LEGACY_SIGN_TRANSACTION_RESPONSE_MAP = (
  response: MethodResult<typeof METHOD_SIGN_TRANSACTION>
): SignTransactionFinishedTxData => ({
  ...response, // additional fields, in case previous type was incorrect
  stacksTransaction: deserializeTransaction(response.transaction),
});

/** Compatible interface with previous Connect `openSignTransaction` version, but using new SIP-030 RPC method. */
export function openSignTransaction(
  options: SignTransactionOptions,
  provider: StacksProvider = getStacksProvider()
) {
  requestRawLegacy(
    METHOD_SIGN_TRANSACTION,
    LEGACY_SIGN_TRANSACTION_OPTIONS_MAP,
    LEGACY_SIGN_TRANSACTION_RESPONSE_MAP
  )(options, provider);
}

// ## Helpers

/** @internal */
function optPostCondition(pcs?: (string | LegacyPostCondition | PostCondition)[]) {
  if (typeof pcs === 'undefined') return undefined;
  return pcs.map(pc => {
    if (typeof pc === 'string') return pc;
    if (typeof pc.type === 'string') {
      return {
        ...pc,
        amount: 'amount' in pc ? pc.amount.toString() : undefined, // ensure amount is not bigint
      };
    }
    return bytesToHex(legacySerializePostCondition(pc));
  });
}

/** @internal */
function optPostConditionMode(mode?: PostConditionModeName | PostConditionMode) {
  if (typeof mode === 'undefined') return undefined;
  if (typeof mode === 'string') return mode;
  switch (mode) {
    case PostConditionMode.Allow:
      return 'allow';
    case PostConditionMode.Deny:
      return 'deny';
    case PostConditionMode.Originator:
      return 'originator';
    default:
      const _exhaustiveCheck: never = mode;
      throw new Error(
        `Unknown post condition mode: ${_exhaustiveCheck}. Should be one of: 'allow', 'deny', 'originator'`
      );
  }
}
