import {
  authenticate,
  AuthOptions,
  ContractCallOptions,
  ContractCallRegularOptions,
  ContractCallSponsoredOptions,
  ContractDeployOptions,
  ContractDeployRegularOptions,
  ContractDeploySponsoredOptions,
  FinishedAuthData,
  openContractCall,
  openContractDeploy,
  openProfileUpdateRequestPopup,
  openPsbtRequestPopup,
  openSignatureRequestPopup,
  openSignTransaction,
  openStructuredDataSignatureRequestPopup,
  openSTXTransfer,
  ProfileUpdateRequestOptions,
  PsbtRequestOptions,
  showBlockstackConnect,
  SignatureRequestOptions,
  SignTransactionOptions,
  StacksProvider,
  StructuredDataSignatureRequestOptions,
  STXTransferOptions,
  STXTransferRegularOptions,
  STXTransferSponsoredOptions,
} from '@stacks/connect';
import { useContext } from 'react';
import { ConnectContext, ConnectDispatchContext, States } from '../components/connect/context';

const useConnectDispatch = () => {
  const dispatch = useContext(ConnectDispatchContext);
  if (!dispatch) {
    throw new Error('This must be used within the ConnectProvider component.');
  }
  return dispatch;
};

/**
 * React hook that provides wallet connection and transaction capabilities
 * for Stacks applications. Must be used within a `ConnectProvider`.
 *
 * @returns An object with authentication state and action functions for
 * wallet connection, contract calls, STX transfers, signing, and more.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { doAuth, doContractCall, doSTXTransfer } = useConnect();
 *   return <button onClick={() => doAuth()}>Connect Wallet</button>;
 * }
 * ```
 */
export const useConnect = () => {
  // todo: add custom provider injection in connect context
  const { isOpen, isAuthenticating, authData, authOptions, userSession } =
    useContext(ConnectContext);

  const dispatch = useConnectDispatch();

  const doUpdateAuthOptions = (payload: Partial<AuthOptions>) => {
    return dispatch({ type: States.UPDATE_AUTH_OPTIONS, payload });
  };

  /**
   *
   * @param signIn Whether the user should be sent to sign in
   * @param options
   */
  const doOpenAuth = (
    signIn?: boolean,
    options?: Partial<AuthOptions>,
    provider?: StacksProvider
  ) => {
    if (signIn) {
      const _options: AuthOptions = {
        ...authOptions,
        ...options,
        onFinish: (payload: FinishedAuthData) => {
          authOptions.onFinish?.(payload);
        },
        sendToSignIn: true,
      };
      void authenticate(_options, provider);
      return;
    } else {
      void showBlockstackConnect({
        ...authOptions,
        sendToSignIn: false,
      });
    }

    if (authOptions) doUpdateAuthOptions(authOptions);
  };

  const doAuth = (options: Partial<AuthOptions> = {}, provider?: StacksProvider) => {
    void authenticate(
      {
        ...authOptions,
        ...options,
        onFinish: (payload: FinishedAuthData) => {
          authOptions.onFinish?.(payload);
        },
      },
      provider
    );
  };

  /**
   * Opens a contract call transaction popup.
   *
   * @param options - Contract call options including contract address, name, function, and args
   * @param provider - Optional specific wallet provider to use
   */
  function doContractCall(
    options: ContractCallOptions | ContractCallRegularOptions | ContractCallSponsoredOptions,
    provider?: StacksProvider
  ) {
    return openContractCall(
      {
        ...options,
        authOrigin: authOptions.authOrigin,
        appDetails: authOptions.appDetails,
      },
      provider
    );
  }

  /**
   * Opens a contract deploy transaction popup.
   *
   * @param options - Contract deploy options including contract name and code body
   * @param provider - Optional specific wallet provider to use
   */
  function doContractDeploy(
    options: ContractDeployOptions | ContractDeployRegularOptions | ContractDeploySponsoredOptions,
    provider?: StacksProvider
  ) {
    return openContractDeploy(
      {
        ...options,
        authOrigin: authOptions.authOrigin,
        appDetails: authOptions.appDetails,
      },
      provider
    );
  }

  /**
   * Opens a STX transfer transaction popup.
   *
   * @param options - Transfer options including recipient address, amount, and optional memo
   * @param provider - Optional specific wallet provider to use
   */
  function doSTXTransfer(
    options: STXTransferOptions | STXTransferRegularOptions | STXTransferSponsoredOptions,
    provider?: StacksProvider
  ) {
    return openSTXTransfer(
      {
        ...options,
        authOrigin: authOptions.authOrigin,
        appDetails: authOptions.appDetails,
      },
      provider
    );
  }

  /**
   * Opens a profile update request popup.
   *
   * @param options - Profile update options
   * @param provider - Optional specific wallet provider to use
   */
  function doProfileUpdate(options: ProfileUpdateRequestOptions, provider?: StacksProvider) {
    return openProfileUpdateRequestPopup(
      {
        ...options,
        authOrigin: authOptions.authOrigin,
        appDetails: authOptions.appDetails,
      },
      provider
    );
  }

  /**
   * Opens a sign transaction popup for signing a pre-built transaction hex.
   *
   * @param options - Sign transaction options including the transaction hex string
   * @param provider - Optional specific wallet provider to use
   */
  function doSignTransaction(options: SignTransactionOptions, provider?: StacksProvider) {
    return openSignTransaction(
      {
        ...options,
        authOrigin: authOptions.authOrigin,
        appDetails: authOptions.appDetails,
      },
      provider
    );
  }

  /**
   * Opens a message signing popup for signing an arbitrary string message.
   *
   * @param options - Signature request options including the message to sign
   * @param provider - Optional specific wallet provider to use
   */
  function sign(options: SignatureRequestOptions, provider?: StacksProvider) {
    return openSignatureRequestPopup(
      {
        ...options,
        authOrigin: authOptions.authOrigin,
        appDetails: authOptions.appDetails,
      },
      provider
    );
  }

  function signStructuredData(
    options: StructuredDataSignatureRequestOptions,
    provider?: StacksProvider
  ) {
    return openStructuredDataSignatureRequestPopup(
      {
        ...options,
        authOrigin: authOptions.authOrigin,
        appDetails: authOptions.appDetails,
      },
      provider
    );
  }

  /**
   * Opens a PSBT (Partially Signed Bitcoin Transaction) signing popup.
   *
   * @param options - PSBT request options including the base64-encoded PSBT
   * @param provider - Optional specific wallet provider to use
   */
  function signPsbt(options: PsbtRequestOptions, provider?: StacksProvider) {
    return openPsbtRequestPopup(
      {
        ...options,
        authOrigin: authOptions.authOrigin,
        appDetails: authOptions.appDetails,
      },
      provider
    );
  }

  return {
    isOpen,
    isAuthenticating,
    authData,
    authOptions,
    userSession,
    doOpenAuth,
    doAuth,
    authenticate,
    doContractCall,
    doContractDeploy,
    doSTXTransfer,
    doSignTransaction,
    doProfileUpdate,
    sign,
    signStructuredData,
    signPsbt,
  };
};
