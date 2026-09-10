import { NoSessionDataError } from '@stacks/common';
import { request } from './request';
import { AuthOptions, StacksProvider } from './types';

/** This package's version, substituted at build time by `define` in `tsup.config.ts`. */
declare const __VERSION__: string;

/** @deprecated Not used anymore. */
export const defaultAuthURL = 'https://app.blockstack.org';

if (typeof window !== 'undefined') {
  window.__CONNECT_VERSION__ = __VERSION__;
}

/** @deprecated Will be marked as internal going forward. */
export const isMobile = () => {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) {
    return true;
  }
  if (/iPad|iPhone|iPod/.test(ua)) {
    return true;
  }
  return /windows phone/i.test(ua);
};

/**
 * Special `authenticate` legacy request, to store addresses in userSession matching legacy behavior.
 * @internal Legacy UI request.
 */
export const authenticate = async (authOptions: AuthOptions, provider?: StacksProvider) => {
  const { onFinish, onCancel, userSession: _userSession } = authOptions;

  const userSession = getOrCreateUserSession(_userSession);
  if (userSession.isUserSignedIn()) userSession.signUserOut();

  try {
    const method = 'getAddresses';
    const response = await request({ provider, forceWalletSelect: true }, method);

    const sessionData = userSession.store.getSessionData();

    // Ensure user data structure exists
    sessionData.userData ??= { profile: {} };
    sessionData.userData.profile ??= {};
    sessionData.userData.profile.stxAddress ??= {
      mainnet: '',
      testnet: '',
    };

    // Take first STX address and use it for legacy connect user session storing.
    const address = response.addresses
      .find(a => a?.symbol === 'STX' || a.address.startsWith('S'))
      .address.toUpperCase();
    const isMainnet = address[1] === 'P' || address[1] === 'M';

    Object.assign(sessionData.userData.profile.stxAddress, {
      [isMainnet ? 'mainnet' : 'testnet']: address,
    });

    // Take first BTC address and use it for legacy connect user session storing.
    const btcAddress = response.addresses.find(a => {
      if (a?.address?.startsWith('S')) return false;
      if (a['purpose'] === 'payment') return true;

      // If it's taproot, only select it if no non-taproot addresses exist
      if (isAddressTaproot(a?.address)) {
        const onlyTaprootAddressesExist = response.addresses.every(
          addr => addr?.address?.startsWith('S') || isAddressTaproot(addr?.address)
        );
        return onlyTaprootAddressesExist;
      }

      return true;
    })?.address;
    if (btcAddress) sessionData.userData.profile.btcAddress = btcAddress;

    userSession.store.setSessionData(sessionData);

    onFinish?.({ userSession, authResponsePayload: sessionData.userData });
  } catch (error) {
    console.error('[Connect] Error during auth request', error);
    onCancel?.(error);
  }
};

// Legacy User Session, User Data, etc.

/** @deprecated Update to the latest `request` RPC methods. It's not recommended to use the UserSession. */
export const LOCALSTORAGE_SESSION_KEY = 'blockstack-session';

/**
 * Semi-compatible `AppConfig` type for configuring `UserSession`.
 *
 * @deprecated Update to the latest `request` RPC methods. It's not recommended to use the UserSession.
 */
export class AppConfig {
  // Copied over from legacy @stacks/auth
  constructor(
    _scopes?: any,
    _appDomain?: any,
    _redirectPath?: string,
    _manifestPath?: string,
    _coreNode?: string,
    _authenticatorURL?: string
  ) {}
}

/**
 * Semi-compatible `SessionOptions` type for accessing `userData`.
 *
 * @deprecated Update to the latest `request` RPC methods. It's not recommended to use the UserSession.
 */
export interface SessionOptions {
  userData?: UserData;
  localStorageKey?: string;
  storeOptions?: {
    localStorageKey?: string;
  };
}

/**
 * Semi-compatible `SessionData` type for accessing `userData`.
 *
 * @deprecated Update to the latest `request` RPC methods. It's not recommended to use the UserSession.
 */
export interface SessionData {
  userData?: UserData;
}

/**
 * Semi-compatible `UserSession` type for accessing `userData`.
 *
 * @deprecated Update to the latest `request` RPC methods. It's not recommended to use the UserSession.
 */
export class UserSession {
  // Copied over from legacy @stacks/auth
  appConfig: any;

  store: SessionDataStore;

  /**
   * UserSession might still work for some use cases, but it's not recommended.
   *
   * @deprecated Update to the latest `request` RPC methods.
   */
  constructor(options?: { appConfig?: any; sessionStore?: any; sessionOptions?: SessionOptions }) {
    if (options?.appConfig) this.appConfig = options.appConfig;

    if (typeof window === 'undefined' && typeof self === 'undefined') {
      // not running in browser
      this.store = new InstanceDataStore();
    } else {
      // running in browser
      this.store = new LocalStorageStore();
    }
  }

  /** @deprecated No-op. Update to the latest `request` RPC methods. */
  makeAuthRequestToken() {}

  /** @deprecated No-op. Update to the latest `request` RPC methods. */
  generateAndStoreTransitKey() {}

  /** @deprecated No-op. Update to the latest `request` RPC methods. */
  getAuthResponseToken() {}

  /** @deprecated No-op. Update to the latest `request` RPC methods. */
  isSignInPending() {
    return false;
  }

  /**
   * Check if a user is currently signed in.
   *
   * @returns {Boolean} `true` if the user is signed in (aka connected), `false` if not.
   */
  isUserSignedIn() {
    return !!this.store.getSessionData().userData;
  }

  /**
   * Try to process any pending sign in request by returning a `Promise` that resolves
   * to the user data object if the sign in succeeds.
   *
   * @returns {Promise} that resolves to the user data object if successful and rejects
   * if handling the sign in request fails or there was no pending sign in request.
   */
  async handlePendingSignIn(): Promise<UserData> {
    return Promise.resolve(this.loadUserData());
  }

  /**
   * Retrieves the user data object. The user's profile is stored in the key [[Profile]].
   *
   * @returns {Object} User data object.
   */
  loadUserData() {
    const userData = this.store.getSessionData().userData;
    if (!userData) throw new NoSessionDataError('No user data found. Did the user sign in?');
    return userData;
  }

  /** @deprecated No-op. Update to the latest `request` RPC methods. */
  encryptContent() {}

  /** @deprecated No-op. Update to the latest `request` RPC methods. */
  decryptContent() {}

  /**
   * Sign the user out and optionally redirect to given location.
   * @param redirectURL Location to redirect user to after sign out.
   */
  signUserOut(redirectURL?: string) {
    this.store.deleteSessionData();
    if (redirectURL && typeof location !== 'undefined' && location.href) {
      location.href = redirectURL;
    }
  }
}

/** @deprecated Update to the latest `request` RPC methods. It's not recommended to use the UserSession. */
export interface UserData {
  /** @deprecated */
  email?: string;
  /** @deprecated */
  decentralizedID?: string;
  /** @deprecated */
  identityAddress?: string;
  /** @deprecated */
  appPrivateKey?: string;
  /** @deprecated */
  hubUrl?: string;
  /** @deprecated */
  coreNode?: string;
  /** @deprecated */
  authResponseToken?: string;
  /** @deprecated */
  coreSessionToken?: string;
  /** @deprecated */
  gaiaAssociationToken?: string;
  /** @deprecated */
  profile: any;
  /** @deprecated */
  gaiaHubConfig?: any;
  /** @deprecated */
  appPrivateKeyFromWalletSalt?: string;
}

/**
 * @abstract An abstract class representing the SessionDataStore interface.
 * @deprecated Update to the latest `request` RPC methods. It's not recommended to use the UserSession.
 */
export class SessionDataStore {
  constructor(sessionOptions?: SessionOptions) {
    if (sessionOptions) this.setSessionData(sessionOptions);
  }

  getSessionData(): SessionData {
    throw new Error('Abstract class');
  }

  setSessionData(_session: SessionData): boolean {
    throw new Error('Abstract class');
  }

  deleteSessionData(): boolean {
    throw new Error('Abstract class');
  }
}

/**
 * Stores session data in the instance of this class.
 *
 * @deprecated Update to the latest `request` RPC methods. It's not recommended to use the UserSession.
 */
export class InstanceDataStore extends SessionDataStore {
  sessionData?: SessionData;

  constructor(sessionOptions?: SessionOptions) {
    super(sessionOptions);
    if (!this.sessionData) this.setSessionData({});
  }

  getSessionData(): SessionData {
    if (!this.sessionData) throw new NoSessionDataError('No session data was found.');
    return this.sessionData;
  }

  setSessionData(session: SessionData): boolean {
    this.sessionData = session;
    return true;
  }

  deleteSessionData(): boolean {
    this.setSessionData({});
    return true;
  }
}

/**
 * Stores session data in browser a localStorage entry.
 *
 * @deprecated Update to the latest `request` RPC methods. It's not recommended to use the UserSession.
 */
export class LocalStorageStore extends SessionDataStore {
  key: string;

  constructor(sessionOptions?: SessionOptions) {
    super(sessionOptions);
    this.key =
      typeof sessionOptions?.storeOptions?.localStorageKey === 'string'
        ? sessionOptions.storeOptions.localStorageKey
        : LOCALSTORAGE_SESSION_KEY;

    const data = localStorage.getItem(this.key);
    if (!data) this.setSessionData({});
  }

  getSessionData(): SessionData {
    const data = localStorage.getItem(this.key);
    if (!data) throw new NoSessionDataError('No session data was found in localStorage');

    return JSON.parse(data);
  }

  setSessionData(session: SessionData): boolean {
    localStorage.setItem(this.key, JSON.stringify(session));
    return true;
  }

  deleteSessionData(): boolean {
    localStorage.removeItem(this.key);
    this.setSessionData({});
    return true;
  }
}

/** @deprecated Update to the latest `request` RPC methods. It's not recommended to use the UserSession. */
export const getOrCreateUserSession = (userSession?: UserSession): UserSession => {
  if (userSession) return userSession;
  return new UserSession();
};

/** @deprecated Update to the latest `request` RPC methods. It's not recommended to use the UserSession. */
export const getUserData = async (userSession?: UserSession) => {
  userSession = getOrCreateUserSession(userSession);
  if (userSession.isUserSignedIn()) return Promise.resolve(userSession.loadUserData());
  return Promise.resolve(null);
};

/** @internal */
export function isAddressTaproot(address: string) {
  const PREFIXES = ['bc1p', 'tb1p', 'bcrt1p'];
  const LENGTHS = [62, 62, 64];

  const index = PREFIXES.findIndex(p => address.startsWith(p));
  if (index === -1) return false;

  return address.length === LENGTHS[index];
}
