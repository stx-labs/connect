# Stacks Connect

## ⚡️ Building a Stacks-enabled web app?

Head over to the [`@stacks/connect` README](https://github.com/stx-labs/connect/tree/main/packages/connect).

---

## Development Notes

### Packages

This repository includes three packages:

- [`@stacks/connect`](./packages/connect): The one-stop-shop tool for letting web-apps interact with Stacks web wallets.
- [`@stacks/connect-ui`](./packages/connect-ui): A web-component UI for displaying an intro modal in Stacks web-apps during authentication _(used in the background by `@stacks/connect`)_.
- ~~[`@stacks/connect-react`](./packages/connect-react): A wrapper library for making `@stacks/connect` use in React even easier~~

### Wallet Implementation Guide

Wallets implement a "Provider" interface.
The latest spec uses a simple JS Object exposing a `.request(method: string, params?: object)` method.

Pseudo-code:

```ts
window.MyProvider = {
  async request(method, params) {
    // Somehow communicate with the wallet (e.g. via events)

    // Recommendation: Create a JSON RPC 2.0 request object
    // https://www.jsonrpc.org/specification

    return Promise.resolve({
      // Respond with a JSON RPC 2.0 response object
      id: crypto.randomUUID(), // required, same as request
      jsonrpc: '2.0', // required

      // `.result` is required on success
      result: {
        // object matching specified RPC methods
      },

      // `.error` is required on error
      error: {
        // Use existing codes from https://www.jsonrpc.org/specification#error_object
        code: number, // required, integer
        message: string, // recommended, single sentence
        data: object, // optional
      },
    });
  },
  isMyWallet: true, // optional, a way of identifying the wallet for developers
};

window.wbip_providers = window.wbip_providers || [];
window.wbip_providers.push({
  // `WbipProvider` type
    /** The global "path" of the provider (e.g. `"MyProvider"` if registered at `window.MyProvider`) */
  id: 'MyProvider',
  /** The name of the provider, as displayed to the user */
  name: 'My Wallet';
  /** The data URL of an image to show (e.g. `data:image/png;base64,iVBORw0...`) @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs */
  icon?: 'data:image/png;base64,iVBORw0...';
  /** Web URL of the provider */
  webUrl?: 'https://mywallet.example.com';

  // Addional URLs
  chromeWebStoreUrl?: string;
  mozillaAddOnsUrl?: string;
  googlePlayStoreUrl?: string;
  iOSAppStoreUrl?: string;
});
```

#### JSON RPC 2.0

Wallets may add their own unstandardized methods.
However, the minimum recommended methods are:

- `getAddresses` [WBIP](https://wbips.netlify.app/request_api/getAddresses)
- `sendTransfer` [WBIP](https://wbips.netlify.app/request_api/sendTransfer)
- `signPsbt` [WBIP](https://wbips.netlify.app/request_api/signPsbt)
- `stx_getAddresses` [SIP-030](https://github.com/janniks/sips/blob/main/sips/sip-030/sip-030-wallet-interface.md)
- `stx_transferStx` [SIP-030](https://github.com/janniks/sips/blob/main/sips/sip-030/sip-030-wallet-interface.md)
- `stx_callContract` [SIP-030](https://github.com/janniks/sips/blob/main/sips/sip-030/sip-030-wallet-interface.md)
- `stx_signMessage` [SIP-030](https://github.com/janniks/sips/blob/main/sips/sip-030/sip-030-wallet-interface.md)
- `stx_signStructuredMessage` [SIP-030](https://github.com/janniks/sips/blob/main/sips/sip-030/sip-030-wallet-interface.md)

---

## 🎁 Contribute

Development of this product happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving the product.

### Code of Conduct

Please read our [Code of conduct](https://github.com/stx-labs/connect/blob/main/CODE_OF_CONDUCT.md) since we expect project participants to adhere to it.

### Contributing Guide

Read our [contributing guide](https://github.com/stx-labs/connect/blob/main/.github/CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.
