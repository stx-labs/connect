# Stacks Connect

## ⚡️ Building a Stacks-enabled web app?

Head over to the [`@stacks/connect` README](https://github.com/hirosystems/connect/tree/main/packages/connect).

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

<div align="center"><br>

[![Hiro Docs](https://img.shields.io/badge/%2F--%2F-Docs-orange?labelColor=gray)](https://docs.hiro.so/)&nbsp;&nbsp;[![Hiro Twitter](https://img.shields.io/badge/Follow%20%40hirosystems-orange?labelColor=gray&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iI2ZmZiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNNTAgMTAuNGMtMS44LjktMy44IDEuNC01LjggMS43IDItMS4zIDMuNy0zLjMgNC41LTUuNy0yIDEuMS00LjIgMi02LjYgMi41YTEwLjMgMTAuMyAwIDAgMC0xNy41IDkuM0EyOS4yIDI5LjIgMCAwIDEgMy40IDcuNWExMC4yIDEwLjIgMCAwIDAgMy4yIDEzLjdDNSAyMS4yIDMuMyAyMC43IDIgMjB2LjJjMCA1IDMuNSA5LjEgOC4yIDEwYTEwLjMgMTAuMyAwIDAgMS00LjYuMmMxLjMgNC4xIDUgNyA5LjYgNy4yQTIwLjYgMjAuNiAwIDAgMS0uMSA0MS43YTI5IDI5IDAgMCAwIDQ1LTI2YzItMS40IDMuOC0zLjIgNS4yLTUuM3oiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXNpemU9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6bm9ybWFsIiB0ZXh0LWFuY2hvcj0ibm9uZSIgdHJhbnNmb3JtPSJzY2FsZSg1LjEpIi8+PC9zdmc+&logoColor=white)](https://twitter.com/hirosystems)&nbsp;&nbsp;[![Stacks Discord](https://img.shields.io/badge/%23stacks--js_on%20Discord-orange?labelColor=gray&logo=discord&logoColor=white)](https://stacks.chat/)

</div>

## 🎁 Contribute

Development of this product happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving the product.

### Code of Conduct

Please read our [Code of conduct](https://github.com/hirosystems/connect/blob/main/CODE_OF_CONDUCT.md) since we expect project participants to adhere to it.

### Contributing Guide

Read our [contributing guide](https://github.com/hirosystems/connect/blob/main/.github/CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.
