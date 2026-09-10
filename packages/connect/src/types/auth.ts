import { UserSession } from '../auth';

/** @deprecated */
export interface AuthResponsePayload {
  profile: any;

  /** @deprecated Not set in the `request` flow anymore. */
  private_key?: string;
  /** @deprecated Not set in the `request` flow anymore. */
  username?: string | null;
  /** @deprecated Not set in the `request` flow anymore. */
  hubUrl?: string;
  /** @deprecated Not set in the `request` flow anymore. */
  associationToken?: string;
  /** @deprecated Not set in the `request` flow anymore. */
  blockstackAPIUrl?: string | null;
  /** @deprecated Not set in the `request` flow anymore. */
  core_token?: string | null;
  /** @deprecated Not set in the `request` flow anymore. */
  email?: string | null;
  /** @deprecated Not set in the `request` flow anymore. */
  exp?: number;
  /** @deprecated Not set in the `request` flow anymore. */
  iat?: number;
  /** @deprecated Not set in the `request` flow anymore. */
  iss?: string;
  /** @deprecated Not set in the `request` flow anymore. */
  jti?: string;
  /** @deprecated Not set in the `request` flow anymore. */
  version?: string;
  /** @deprecated Not set in the `request` flow anymore. */
  profile_url?: string;
  /** @deprecated Not set in the `request` flow anymore. */
  public_keys?: string[];
}

/** @deprecated */
export interface FinishedAuthData {
  /** @deprecated Not used in the `request` flow anymore. */
  authResponse?: string;
  /** @deprecated Not used in the `request` flow anymore. */
  authResponsePayload?: AuthResponsePayload;
  userSession: UserSession;
}

declare global {
  interface Window {
    __CONNECT_VERSION__?: string;
  }
}

/** @deprecated */
export interface AuthOptions {
  /** The URL you want the user to be redirected to after authentication. */
  redirectTo?: string;
  manifestPath?: string;
  /**
   * This callback is fired after authentication is finished.
   * The callback is called with a single object argument, with three keys:
   * `authResponse`: the raw `authResponse` string that is returned from authentication
   * `authResponsePayload`: an AuthResponsePayload object
   * `userSession`: a UserSession object with `userData` included
   * */
  onFinish?: (payload: FinishedAuthData) => void;
  /** This callback is fired if the user exits before finishing */
  onCancel?: (error?: Error) => void;
  /**
   * @deprecated Authentication is no longer supported through a hosted
   * version. Users must install an extension.
   */
  authOrigin?: string;
  /** If `sendToSignIn` is `true`, then the user will be sent through the sign in flow. */
  sendToSignIn?: boolean;
  userSession?: UserSession;
  appDetails?: {
    /** A human-readable name for your application */
    name: string;
    /** A full URL that resolves to an image icon for your application */
    icon: string;
  };
}
