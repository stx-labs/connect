// AUTO REGISTERED PROVIDERS

import { getSelectedProviderId } from './session';

/** Backwards compatible alias for `WbipProvider` */
export type WebBTCProvider = WbipProvider;

export interface WbipProvider {
  /** The global "path" of the provider (e.g. `"MyProvider"` if registered at `window.MyProvider`) */
  id: string;
  /** The name of the provider, as displayed to the user */
  name: string;
  /** The data URL of an image to show (e.g. `data:image/png;base64,iVBORw0...`) @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs */
  icon?: string;
  /** Web URL of the provider */
  webUrl?: string;

  chromeWebStoreUrl?: string;
  mozillaAddOnsUrl?: string;
  googlePlayStoreUrl?: string;
  iOSAppStoreUrl?: string;
}

declare global {
  interface Window {
    /**
     * @experimental @beta
     * An experimental global registry of providers that can be used by the UI to display a list of providers to the user.
     * Wallets can add their provider to this list without needing to update `@stacks/connect` itself.
     * This is an experimental API and may change in the future.
     * This will be used as a test-run before switching to `webbtc` and WBIP004.
     * The provider objects are WBIP004 compliant.
     * It may happen that no wallet implements this feature before `@stacks/connect` switches to `webbtc`.
     */
    webbtc_stx_providers?: WbipProvider[];

    /** @experimental @beta */
    wbip_providers?: WbipProvider[];
  }
}

export const getRegisteredProviders = () => {
  if (typeof window === 'undefined') return [];

  const legacyProviders = window.webbtc_stx_providers || [];
  const wbipProviders = window.wbip_providers || [];

  return [...legacyProviders, ...wbipProviders];
};

export const getInstalledProviders = (defaultProviders: WbipProvider[] = []) => {
  if (typeof window === 'undefined') return [];

  // Registered providers are installed by definition (they self-register)
  const registeredProviders = getRegisteredProviders();

  // Add default providers that are installed but didn't register themselves
  const additionalInstalledProviders = defaultProviders.filter(dp => {
    // Already registered, don't add again
    if (registeredProviders.find(rp => rp.id === dp.id)) return false;

    // Check if default provider is installed (even if not registered)
    const provider = getProviderFromId(dp.id);
    return !!provider;
  });

  return registeredProviders.concat(additionalInstalledProviders);
};

/**
 * Check if a wallet provider was previously selected via Connect.
 * @returns `true` if a provider was selected, `false` otherwise.
 */
export const isProviderSelected = () => {
  return !!getSelectedProviderId();
};

/**
 * Get the currently selected wallet provider.
 * Note that this will not return the default `window.StacksProvider` object.
 * @returns The wallet provider object, or null if no provider is selected.
 */
export const getProvider = () => {
  const providerId = getSelectedProviderId();
  return getProviderFromId(providerId);
};

export const getProviderFromId = (id: string | undefined) => {
  return id?.split('.').reduce((acc, part) => acc?.[part], window);
};
