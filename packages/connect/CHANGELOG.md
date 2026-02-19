# Change Log

## 8.2.5

### Patch Changes

- 8074b1c: Expose `WalletConnect.initializeProvider()` function to allow initializing WalletConnect independently from the `request` flow
- 8f729d1: Lazy-load @reown/appkit to reduce initial bundle size and eliminate Lit SSR warnings

## 8.2.4

### Patch Changes

- 9cd2aa8: Fix regression where all default providers are shown as installed
- Updated dependencies [9cd2aa8]
  - @stacks/connect-ui@8.1.2

## 8.2.3

### Patch Changes

- 7f3063a: Fix a crash when used wallet providers don't properly support WalletConnect.

## 8.2.2

### Patch Changes

- [#470](https://github.com/hirosystems/connect/pull/470) [`47c259b`](https://github.com/hirosystems/connect/commit/47c259b547eb93f6e1f9ad620e23018714463a14) Thanks [@jfstn](https://github.com/jfstn)! - Export `WalletConnect` namespace for easy WalletConnect network configuration

- [#469](https://github.com/hirosystems/connect/pull/469) [`73d9d49`](https://github.com/hirosystems/connect/commit/73d9d4904569093ac6f1f18c5acab350f060fa5f) Thanks [@jfstn](https://github.com/jfstn)! - Prevent wallet selection modal from showing unnecessarily when using WalletConnect

- [#470](https://github.com/hirosystems/connect/pull/470) [`47c259b`](https://github.com/hirosystems/connect/commit/47c259b547eb93f6e1f9ad620e23018714463a14) Thanks [@jfstn](https://github.com/jfstn)! - Add duplicate WalletConnect Provider initialization prevention and null-safe checks for namespace access

## 8.2.1

### Patch Changes

- [#465](https://github.com/hirosystems/connect/pull/465) [`745f1f0`](https://github.com/hirosystems/connect/commit/745f1f0cf5d462ca195d8ca20dc1897dbba483a2) Thanks [@tomiir](https://github.com/tomiir)! - Add support for testnet with WalletConnect wallets

- [#462](https://github.com/hirosystems/connect/pull/462) [`18f6464`](https://github.com/hirosystems/connect/commit/18f6464d3f5bfdb4c8b01ee565c0705b6eb1cba5) Thanks [@janniks](https://github.com/janniks)! - Fix provider filtering order

- [#462](https://github.com/hirosystems/connect/pull/462) [`18f6464`](https://github.com/hirosystems/connect/commit/18f6464d3f5bfdb4c8b01ee565c0705b6eb1cba5) Thanks [@janniks](https://github.com/janniks)! - Add preferred `walletConnect` option to ConnectRequestOptions. Deprecate `walletConnectProjectId` in favor of nested config object

- [#462](https://github.com/hirosystems/connect/pull/462) [`18f6464`](https://github.com/hirosystems/connect/commit/18f6464d3f5bfdb4c8b01ee565c0705b6eb1cba5) Thanks [@janniks](https://github.com/janniks)! - Fix error handling of empty provider responses

- Updated dependencies [[`18f6464`](https://github.com/hirosystems/connect/commit/18f6464d3f5bfdb4c8b01ee565c0705b6eb1cba5)]:
  - @stacks/connect-ui@8.1.1

## 8.2.0

### Minor Changes

- [#458](https://github.com/hirosystems/connect/pull/458) [`976e77a`](https://github.com/hirosystems/connect/commit/976e77a6bffce12aad32dc5ec0e87560350d5d16) Thanks [@tomiir](https://github.com/tomiir)! - Add WalletConnect support to Stacks Connect. Setup a project at https://dashboard.reown.com/onboarding and create an App project. Then set the new `walletConnectProjectId` option in the `connect`/`request` params.

### Patch Changes

- [#453](https://github.com/hirosystems/connect/pull/453) [`7c90b51`](https://github.com/hirosystems/connect/commit/7c90b516742f62b4ef881d08fd963cee2f4ea00a) Thanks [@janniks](https://github.com/janniks)! - Update underlying dependencies

- [#454](https://github.com/hirosystems/connect/pull/454) [`c6217ff`](https://github.com/hirosystems/connect/commit/c6217ffaaa15b7fb4f31f5e204b1bc7aa78c47db) Thanks [@janniks](https://github.com/janniks)! - Strip unserializable function values from parameters passed into the request function. This previously caused errors during JSON serialization in some providers.

- [#457](https://github.com/hirosystems/connect/pull/457) [`1bd329e`](https://github.com/hirosystems/connect/commit/1bd329ee4ad1f2dc68eb5d293d739aceb7ac5355) Thanks [@friedger](https://github.com/friedger)! - Rename incorrect request method (`stx_transferSip10Nft` to correct `stx_transferSip9Nft`)

- Updated dependencies [[`7c90b51`](https://github.com/hirosystems/connect/commit/7c90b516742f62b4ef881d08fd963cee2f4ea00a), [`976e77a`](https://github.com/hirosystems/connect/commit/976e77a6bffce12aad32dc5ec0e87560350d5d16)]:
  - @stacks/connect-ui@8.1.0

## 8.1.9

### Patch Changes

- [#448](https://github.com/hirosystems/connect/pull/448) [`caed78e`](https://github.com/hirosystems/connect/commit/caed78ebf17c3628eac407b95e1d6404fe50af72) Thanks [@janniks](https://github.com/janniks)! - Add override for experimental non-standard parameter `publicKey` in the `stx_signMessage` wallet method. This parameter will now be stripped for non-Xverse-like wallets.

## 8.1.8

### Patch Changes

- [#443](https://github.com/hirosystems/connect/pull/443) [`e39f915`](https://github.com/hirosystems/connect/commit/e39f915c7b14234cdfde6e6944509b7333f020e4) Thanks [@jeffrystone](https://github.com/jeffrystone)! - Add request method to Asigna iframe provider

## 8.1.7

### Patch Changes

- [#440](https://github.com/hirosystems/connect/pull/440) [`693c5d2`](https://github.com/hirosystems/connect/commit/693c5d28c1423a142523d2c2f2b5f1fbca6e6458) Thanks [@jeffrystone](https://github.com/jeffrystone)! - Fix Asigna iframe check

## 8.1.6

### Patch Changes

- [#436](https://github.com/hirosystems/connect/pull/436) [`1323dc0`](https://github.com/hirosystems/connect/commit/1323dc0ec89932b765335adc0e447eb99b5e7720) Thanks [@janniks](https://github.com/janniks)! - Add `approvedProviderIds` options to filter allowed wallets

- [#436](https://github.com/hirosystems/connect/pull/436) [`1323dc0`](https://github.com/hirosystems/connect/commit/1323dc0ec89932b765335adc0e447eb99b5e7720) Thanks [@janniks](https://github.com/janniks)! - Export error types

## 8.1.5

### Patch Changes

- [#432](https://github.com/hirosystems/connect/pull/432) [`a054271`](https://github.com/hirosystems/connect/commit/a0542714aab1a99e97847e0b21d9e0f2c7318fb2) Thanks [@janniks](https://github.com/janniks)! - Export method types

- [#433](https://github.com/hirosystems/connect/pull/433) [`a980e7e`](https://github.com/hirosystems/connect/commit/a980e7e7b7d5be6d5b4d66e06572303db1c43afe) Thanks [@janniks](https://github.com/janniks)! - Add wallet result overrides for inconsistent wallet results

## 8.1.4

### Patch Changes

- [#429](https://github.com/hirosystems/connect/pull/429) [`cf1fcb4`](https://github.com/hirosystems/connect/commit/cf1fcb48efcf0abd630b031b2db346b702f3b6b6) Thanks [@janniks](https://github.com/janniks)! - Add authResponsePayload to authentication result for more backwards compatibility

- [#429](https://github.com/hirosystems/connect/pull/429) [`cf1fcb4`](https://github.com/hirosystems/connect/commit/cf1fcb48efcf0abd630b031b2db346b702f3b6b6) Thanks [@janniks](https://github.com/janniks)! - Allow `connect()` to take any `getAddresses` params as options

- [#429](https://github.com/hirosystems/connect/pull/429) [`cf1fcb4`](https://github.com/hirosystems/connect/commit/cf1fcb48efcf0abd630b031b2db346b702f3b6b6) Thanks [@janniks](https://github.com/janniks)! - Fix address storage issue for Xverse-like wallets

- [#429](https://github.com/hirosystems/connect/pull/429) [`cf1fcb4`](https://github.com/hirosystems/connect/commit/cf1fcb48efcf0abd630b031b2db346b702f3b6b6) Thanks [@janniks](https://github.com/janniks)! - Remove potentially unwanted private information from being stored in local storage

## 8.1.3

### Patch Changes

- [#427](https://github.com/hirosystems/connect/pull/427) [`b0f8251`](https://github.com/hirosystems/connect/commit/b0f8251ac7daf16d05c77885c45d004cedef4302) Thanks [@janniks](https://github.com/janniks)! - Add missing export

## 8.1.2

### Patch Changes

- [#426](https://github.com/hirosystems/connect/pull/426) [`3866f88`](https://github.com/hirosystems/connect/commit/3866f888755a344041a797c2553854db45a9f76d) Thanks [@janniks](https://github.com/janniks)! - Fix signPsbt overrides for Xverse and Leather

- [#424](https://github.com/hirosystems/connect/pull/424) [`ebe41f7`](https://github.com/hirosystems/connect/commit/ebe41f733a49293429a82e7710b679d0762ad40b) Thanks [@janniks](https://github.com/janniks)! - Strip `network` from sendTransfer method on Xverse-like wallets

## 8.1.1

### Patch Changes

- [#422](https://github.com/hirosystems/connect/pull/422) [`886746b`](https://github.com/hirosystems/connect/commit/886746b53815d1370938e1b4d385fa589ee61b42) Thanks [@janniks](https://github.com/janniks)! - Only persist wallet selection on success case

- Updated dependencies [[`886746b`](https://github.com/hirosystems/connect/commit/886746b53815d1370938e1b4d385fa589ee61b42)]:
  - @stacks/connect-ui@8.0.0

## 8.1.0

### Minor Changes

- [#417](https://github.com/hirosystems/connect/pull/417) [`eeeeef6`](https://github.com/hirosystems/connect/commit/eeeeef62cf2fb780190653f28213994f3d707446) Thanks [@janniks](https://github.com/janniks)! - Add local storage features: `isConnected`, `getLocalStorage` and cache address requests

- [#417](https://github.com/hirosystems/connect/pull/417) [`eeeeef6`](https://github.com/hirosystems/connect/commit/eeeeef62cf2fb780190653f28213994f3d707446) Thanks [@janniks](https://github.com/janniks)! - Add localstorage helpers to ease migration

### Patch Changes

- [#420](https://github.com/hirosystems/connect/pull/420) [`2e7eff5`](https://github.com/hirosystems/connect/commit/2e7eff5e5b5c935a937e55ba0c8b0eca76c9f5eb) Thanks [@janniks](https://github.com/janniks)! - Fix faulty param serialization

- [#417](https://github.com/hirosystems/connect/pull/417) [`eeeeef6`](https://github.com/hirosystems/connect/commit/eeeeef62cf2fb780190653f28213994f3d707446) Thanks [@janniks](https://github.com/janniks)! - Add `connect` method as alias for default connection request

## 8.0.2

### Patch Changes

- [#415](https://github.com/hirosystems/connect/pull/415) [`bcf50b4`](https://github.com/hirosystems/connect/commit/bcf50b4c58bc8fa1e8fb93b638482c679ebf9f81) Thanks [@janniks](https://github.com/janniks)! - Add missing broadcast argument for signPsbt

- [#412](https://github.com/hirosystems/connect/pull/412) [`006af80`](https://github.com/hirosystems/connect/commit/006af801676661fc407722157a39052123fd3e16) Thanks [@janniks](https://github.com/janniks)! - Fix case where Xverse-like wallet isn't included in overrides

## 8.0.1

### Patch Changes

- [#410](https://github.com/hirosystems/connect/pull/410) [`7a18f63`](https://github.com/hirosystems/connect/commit/7a18f63d76ba3dc2308c98df5f75fdf984ddde4a) Thanks [@janniks](https://github.com/janniks)! - Add missing `sendTransfer` method

- [#410](https://github.com/hirosystems/connect/pull/410) [`7a18f63`](https://github.com/hirosystems/connect/commit/7a18f63d76ba3dc2308c98df5f75fdf984ddde4a) Thanks [@janniks](https://github.com/janniks)! - Fix raw methods for `requestRaw` function

## 8.0.0

### Major Changes

- [#403](https://github.com/hirosystems/connect/pull/403) [`cb82258`](https://github.com/hirosystems/connect/commit/cb822582318348e3b36b2e5d048db465b0668ebc) Thanks [@janniks](https://github.com/janniks)! - Switch to new RPC API with SIP-030

  BREAKING CHANGE:

  Adds the new `request` method to the `@stacks/connect` package.
  Which is the default way of interacting with Bitcoin and Stacks wallets.
  This update needs a slightly breaking change to the `showXyz` and `openXyz` methods.
  - ADDED `request` (UI) and `requestRaw` for calling wallet RPC methods
  - UPDATED `SessionData` and `UserSession` to only expose a light `UserData` with `profile.stxAddress`
  - UPDATED `StacksProvider` to only have a `request` method
  - REMOVED `BlockstackProvider`, `StacksProvider`

### Patch Changes

- Updated dependencies [[`cb82258`](https://github.com/hirosystems/connect/commit/cb822582318348e3b36b2e5d048db465b0668ebc)]:
  - @stacks/connect-ui@7.0.0

## 7.10.1

### Patch Changes

- [#405](https://github.com/hirosystems/connect/pull/405) [`ed9532a`](https://github.com/hirosystems/connect/commit/ed9532ac1b88cbcdb4d909cd6c45030fc00b78dd) Thanks [@martinsvinicius](https://github.com/martinsvinicius)! - Avoid Asigna initialization when the window object is not defined

## 7.10.0

### Minor Changes

- [#400](https://github.com/hirosystems/connect/pull/400) [`d6ea424`](https://github.com/hirosystems/connect/commit/d6ea424331a022be0bf38e95a04832e050c0c143) Thanks [@janniks](https://github.com/janniks)! - Add iframe capable Asigna provider.

### Patch Changes

- Updated dependencies [[`d6ea424`](https://github.com/hirosystems/connect/commit/d6ea424331a022be0bf38e95a04832e050c0c143)]:
  - @stacks/connect-ui@6.6.0

## 7.9.0

### Minor Changes

- [#392](https://github.com/hirosystems/connect/pull/392) [`0631e6e`](https://github.com/hirosystems/connect/commit/0631e6e26b8c9edd0a8a95de496fdc8915d59664) Thanks [@janniks](https://github.com/janniks)! - Add `clarityVersion` to contract deploys.

### Patch Changes

- [#395](https://github.com/hirosystems/connect/pull/395) [`b75b7ca`](https://github.com/hirosystems/connect/commit/b75b7caf460aa01a48b391166d3f4fd3bed2a6b4) Thanks [@janniks](https://github.com/janniks)! - Fix bug where url wasn't passed to network instance

## 7.8.0

### Minor Changes

- [#389](https://github.com/hirosystems/connect/pull/389) [`ada779a`](https://github.com/hirosystems/connect/commit/ada779ad9b25fb83f8f3b055923424138e57fe6f) Thanks [@janniks](https://github.com/janniks)! - Add backwards compatible stacks network and string options

### Patch Changes

- Updated dependencies [[`ada779a`](https://github.com/hirosystems/connect/commit/ada779ad9b25fb83f8f3b055923424138e57fe6f)]:
  - @stacks/connect-ui@6.5.0

## 7.7.1

### Patch Changes

- [#364](https://github.com/hirosystems/connect/pull/364) [`2c61ef3`](https://github.com/hirosystems/connect/commit/2c61ef3589dcd6b94e4d966ccb964ae55200906d) Thanks [@janniks](https://github.com/janniks)! - Update link behavior

- Updated dependencies [[`2c61ef3`](https://github.com/hirosystems/connect/commit/2c61ef3589dcd6b94e4d966ccb964ae55200906d)]:
  - @stacks/connect-ui@6.4.1

## 7.7.0

### Minor Changes

- [#362](https://github.com/hirosystems/connect/pull/362) [`8dac7b2`](https://github.com/hirosystems/connect/commit/8dac7b22211d7cd55a03b555c167557d8167d8ba) Thanks [@janniks](https://github.com/janniks)! - Disables scrolling of the site when the modal is open

- [#362](https://github.com/hirosystems/connect/pull/362) [`8dac7b2`](https://github.com/hirosystems/connect/commit/8dac7b22211d7cd55a03b555c167557d8167d8ba) Thanks [@janniks](https://github.com/janniks)! - Adds cancelCallback to modal, which is triggered onCancel

### Patch Changes

- Updated dependencies [[`8dac7b2`](https://github.com/hirosystems/connect/commit/8dac7b22211d7cd55a03b555c167557d8167d8ba), [`8dac7b2`](https://github.com/hirosystems/connect/commit/8dac7b22211d7cd55a03b555c167557d8167d8ba)]:
  - @stacks/connect-ui@6.4.0

## 7.6.0

### Minor Changes

- [#360](https://github.com/hirosystems/connect/pull/360) [`270b8aa`](https://github.com/hirosystems/connect/commit/270b8aa3b7f6a22a040d224eff043c42eb129df0) Thanks [@fess-v](https://github.com/fess-v)! - Add Asigna to recommended wallet list

### Patch Changes

- Updated dependencies [[`270b8aa`](https://github.com/hirosystems/connect/commit/270b8aa3b7f6a22a040d224eff043c42eb129df0)]:
  - @stacks/connect-ui@6.3.0

## 7.5.1

### Patch Changes

- [#351](https://github.com/hirosystems/connect/pull/351) [`97c80e5`](https://github.com/hirosystems/connect/commit/97c80e5739384303c4a84127b38f6824566bc3ae) Thanks [@janniks](https://github.com/janniks)! - Fix bug that would revert to undefined wallet popup behavior.

- Updated dependencies [[`97c80e5`](https://github.com/hirosystems/connect/commit/97c80e5739384303c4a84127b38f6824566bc3ae)]:
  - @stacks/connect-ui@6.2.1

## 7.5.0

### Minor Changes

- [#341](https://github.com/hirosystems/connect/pull/341) [`5284ddf`](https://github.com/hirosystems/connect/commit/5284ddf721535e90b6a1cbbc77e46f1e1b14d58e) Thanks [@janniks](https://github.com/janniks)! - Add new UI to allow selecting which wallet to use

### Patch Changes

- Updated dependencies [[`5284ddf`](https://github.com/hirosystems/connect/commit/5284ddf721535e90b6a1cbbc77e46f1e1b14d58e)]:
  - @stacks/connect-ui@6.2.0

## 7.4.2

### Patch Changes

- Updated dependencies [[`7439332`](https://github.com/hirosystems/connect/commit/7439332c796b6fa36275680c1026abf588b76556)]:
  - @stacks/connect-ui@6.1.3

## 7.4.1

### Patch Changes

- Updated dependencies [[`2b0f867`](https://github.com/hirosystems/connect/commit/2b0f8670624d9ce8f098ccbe6a8614e9556c79e3)]:
  - @stacks/connect-ui@6.1.2

## 7.4.0

### Minor Changes

- [#331](https://github.com/hirosystems/connect/pull/331) [`79eb587`](https://github.com/hirosystems/connect/commit/79eb5874f64f1996e44142d4d16598f3bf6fd28c) Thanks [@janniks](https://github.com/janniks)! - Allow custom providers to be passed to Connect methods.

## 7.3.1

### Patch Changes

- Updated dependencies [[`edfad7b`](https://github.com/hirosystems/connect/commit/edfad7b093e50f359934352b57764d29ac2f1bdc)]:
  - @stacks/connect-ui@6.1.1

## 7.3.0

### Minor Changes

- [#305](https://github.com/hirosystems/connect/pull/305) [`c987060`](https://github.com/hirosystems/connect/commit/c987060a1771789db804466b0855e3758ee923c0) Thanks [@janniks](https://github.com/janniks)! - Update build tools to tsup

### Patch Changes

- Updated dependencies [[`c987060`](https://github.com/hirosystems/connect/commit/c987060a1771789db804466b0855e3758ee923c0)]:
  - @stacks/connect-ui@6.1.0

## 7.2.1

### Patch Changes

- [#310](https://github.com/hirosystems/connect/pull/310) [`104d513`](https://github.com/hirosystems/connect/commit/104d513f8167100b20e6cfa4e82eb5a18a475e9c) Thanks [@fbwoolf](https://github.com/fbwoolf)! - Change psbt request option signAtIndex to a number or an array of numbers.

## 7.2.0

### Minor Changes

- [#308](https://github.com/hirosystems/connect/pull/308) [`0299f76`](https://github.com/hirosystems/connect/commit/0299f765eeb5d06a6c1d43630330e1af1b5cdff7) Thanks [@fbwoolf](https://github.com/fbwoolf)! - Add support for Partially Signed Bitcoin Transaction requests

## 7.1.1

### Patch Changes

- [#300](https://github.com/hirosystems/connect/pull/300) [`9d73405`](https://github.com/hirosystems/connect/commit/9d734052b9d195165660035c71bd3ddb3228c18e) Thanks [@janniks](https://github.com/janniks)! - Change absolute imports to relative, to fix issues in types with some bundlers.

- [#299](https://github.com/hirosystems/connect/pull/299) [`3718639`](https://github.com/hirosystems/connect/commit/3718639bb09191d087d66c6062acd76551fb24e7) Thanks [@janniks](https://github.com/janniks)! - Update stacks.js dependencies

- Updated dependencies [[`a1f4948`](https://github.com/hirosystems/connect/commit/a1f49482f43185e89f28ed56b5d8aac55f2734d3)]:
  - @stacks/connect-ui@6.0.1

## 7.1.0

### Minor Changes

- [#280](https://github.com/hirosystems/connect/pull/280) [`e811acf`](https://github.com/hirosystems/connect/commit/e811acf91491d7cf1ee3d5a1837ff576a7e0543f) Thanks [@friedger](https://github.com/friedger)! - Adds `openProfileUpdateRequestPopup` method to allow users to update profiles via wallets

### Patch Changes

- [#289](https://github.com/hirosystems/connect/pull/289) [`0d1dee8`](https://github.com/hirosystems/connect/commit/0d1dee88a3c16a8ae8c94608d5c3bb934cd9e669) Thanks [@kyranjamie](https://github.com/kyranjamie)! - Fixes issue where STX address not passed to wallet in Ledger mode

## 7.0.0

### Major Changes

- [#268](https://github.com/hirosystems/connect/pull/268) [`1ca6ba7`](https://github.com/hirosystems/connect/commit/1ca6ba7bbf5eeb7ed35936dfc9af4b72b12cc160) Thanks [@janniks](https://github.com/janniks)! - Update Stacks.js dependencies to remove Buffer

  BREAKING CHANGE:
  To reduce the bundle sizes of applications using Stacks.js we are moving away from Buffer.
  For more information visit the Stacks.js repository https://github.com/hirosystems/stacks.js

### Patch Changes

- Updated dependencies [[`1ca6ba7`](https://github.com/hirosystems/connect/commit/1ca6ba7bbf5eeb7ed35936dfc9af4b72b12cc160)]:
  - @stacks/connect-ui@6.0.0

## 6.10.2

### Patch Changes

- Updated dependencies [[`228ad3e`](https://github.com/hirosystems/connect/commit/228ad3e680b465e8ed4aa5d865283c2e00c9c792)]:
  - @stacks/connect-ui@5.5.4

## 6.10.1

### Patch Changes

- [#270](https://github.com/hirosystems/connect/pull/270) [`f96b2ad`](https://github.com/hirosystems/connect/commit/f96b2adbc0bcdb17ee1fc4b35791368884952cd4) Thanks [@janniks](https://github.com/janniks)! - Update stencil components

- Updated dependencies [[`f96b2ad`](https://github.com/hirosystems/connect/commit/f96b2adbc0bcdb17ee1fc4b35791368884952cd4)]:
  - @stacks/connect-ui@5.5.3

## 6.10.0

### Minor Changes

- [#264](https://github.com/hirosystems/connect/pull/264) [`c323625`](https://github.com/hirosystems/connect/commit/c3236255139aabc75906d688ed13e2450dd58c98) Thanks [@kyranjamie](https://github.com/kyranjamie)! - We now fallback to creating an unsigned payload if no app private key exists

### Patch Changes

- [#257](https://github.com/hirosystems/connect/pull/257) [`ba4b0c6`](https://github.com/hirosystems/connect/commit/ba4b0c6083cae9623c046f282d0022ded2d8ca33) Thanks [@janniks](https://github.com/janniks)! - Updated @stacks.js packages

## 6.9.1

### Patch Changes

- [#255](https://github.com/hirosystems/connect/pull/255) [`592a974`](https://github.com/hirosystems/connect/commit/592a974e4149190ea2ef8c36f939436642a662f6) Thanks [@kyranjamie](https://github.com/kyranjamie)! - Updated @stacks.js packages

## 6.9.0

### Minor Changes

- [#253](https://github.com/hirosystems/connect/pull/253) [`8bd1a66`](https://github.com/hirosystems/connect/commit/8bd1a66962eebdde93a0d19b354492f815411d96) Thanks [@kyranjamie](https://github.com/kyranjamie)! - Removed some logic that breaks JWT signing with Ledger

## 6.8.8

### Patch Changes

- [#248](https://github.com/hirosystems/connect/pull/248) [`3702aa0`](https://github.com/hirosystems/connect/commit/3702aa0c0d1d436a7eef09e5bc49331e81f33736) Thanks [@janniks](https://github.com/janniks)! - Revert adding a static showConnect alternative

- Updated dependencies [[`3702aa0`](https://github.com/hirosystems/connect/commit/3702aa0c0d1d436a7eef09e5bc49331e81f33736)]:
  - @stacks/connect-ui@5.5.2

## 6.8.7

### Patch Changes

- [#236](https://github.com/hirosystems/connect/pull/236) [`20020c4`](https://github.com/hirosystems/connect/commit/20020c4bb1490949b6ce6a4f5de6594b31cc5427) Thanks [@beguene](https://github.com/beguene)! - Add better support for SIP-018 signing structured data

## 6.8.6

### Patch Changes

- [#234](https://github.com/hirosystems/connect/pull/234) [`425e771`](https://github.com/hirosystems/connect/commit/425e771f2d07b45254a9c63387a07480a0dee2c1) Thanks [@janniks](https://github.com/janniks)! - Add static show method

- Updated dependencies [[`425e771`](https://github.com/hirosystems/connect/commit/425e771f2d07b45254a9c63387a07480a0dee2c1)]:
  - @stacks/connect-ui@5.5.1

## 6.8.5

### Patch Changes

- [#239](https://github.com/hirosystems/connect/pull/239) [`49f02a1`](https://github.com/hirosystems/connect/commit/49f02a1a1176e47c3d90378e79c918d3ade79de5) Thanks [@janniks](https://github.com/janniks)! - Fix relative import

## 6.8.4

### Patch Changes

- [#232](https://github.com/hirosystems/connect/pull/232) [`d1879be`](https://github.com/hirosystems/connect/commit/d1879bedfc6b5141eb81d7327341b31c1f4775c8) Thanks [@janniks](https://github.com/janniks)! - Update stacks.js deps

## 6.8.3

### Patch Changes

- [#229](https://github.com/hirosystems/connect/pull/229) [`08f7099`](https://github.com/hirosystems/connect/commit/08f7099ff4a3ff478641a21bbd7e0f759fd1437b) Thanks [@janniks](https://github.com/janniks)! - Update dependecy

## 6.8.2

### Patch Changes

- [#227](https://github.com/hirosystems/connect/pull/227) [`968f8da`](https://github.com/hirosystems/connect/commit/968f8da610b1bcbc8b8267729c9023c0d5c9ea8d) Thanks [@janniks](https://github.com/janniks)! - Fix package browser field

## 6.8.1

### Patch Changes

- [#222](https://github.com/hirosystems/connect/pull/222) [`57bd667`](https://github.com/hirosystems/connect/commit/57bd6674e72dc1b5726174037148f09f1a8f920d) Thanks [@janniks](https://github.com/janniks)! - Update stacks.js dependencies

## 6.8.0

### Minor Changes

- [#214](https://github.com/hirosystems/connect/pull/214) [`909cdd8`](https://github.com/hirosystems/connect/commit/909cdd8205a2fb6c8e9a04f07b0241ce4525d141) Thanks [@kyranjamie](https://github.com/kyranjamie)! - Allow initiating transactions without a private key

## 6.7.0

### Minor Changes

- [#216](https://github.com/hirosystems/connect/pull/216) [`1f3e94a`](https://github.com/hirosystems/connect/commit/1f3e94aa09a356cf8d8a0b555caeabbed120d741) Thanks [@beguene](https://github.com/beguene)! - Add helper to request the signature of a structure data (Clarity Value)

## 6.6.0

### Minor Changes

- [#205](https://github.com/hirosystems/connect/pull/205) [`b490098`](https://github.com/hirosystems/connect/commit/b4900985624641510f3b93d8a0286cca93b72085) Thanks [@beguene](https://github.com/beguene)! - Add helpers to request a message (string) signature

## 6.5.0

### Minor Changes

- [#204](https://github.com/hirosystems/connect/pull/204) [`b03d98c`](https://github.com/hirosystems/connect/commit/b03d98c74e795dfd3f8f38e9b7dad6c283e91f58) Thanks [@janniks](https://github.com/janniks)! - Upgrade stacks.js dependencies to 3.3.0.

### Patch Changes

- Updated dependencies [[`b03d98c`](https://github.com/hirosystems/connect/commit/b03d98c74e795dfd3f8f38e9b7dad6c283e91f58)]:
  - @stacks/connect-ui@5.5.0

## 6.4.2

### Patch Changes

- Updated dependencies [[`25341ab`](https://github.com/hirosystems/connect/commit/25341ab52d8350cd2be6ec726157a3b9095682a2)]:
  - @stacks/connect-ui@5.4.1

## 6.4.1

### Patch Changes

- Updated dependencies [[`4073fee`](https://github.com/hirosystems/connect/commit/4073feedc39fc6223129787bd9dc122398ba0ab6)]:
  - @stacks/connect-ui@5.4.0

## 6.2.1

### Patch Changes

- Updated dependencies [[`0cad6f1`](https://github.com/hirosystems/connect/commit/0cad6f169594ab3d6b66f829556221610c6538f3)]:
  - @stacks/connect-ui@5.3.0

## 6.2.0

### Minor Changes

- [#159](https://github.com/blockstack/connect/pull/159) [`a499f61`](https://github.com/blockstack/connect/commit/a499f6127b511bcb030b082d6c7d0c8643638b47) Thanks [@kyranjamie](https://github.com/kyranjamie)! - This updates all stacks.js packages.

### Patch Changes

- Updated dependencies [[`a499f61`](https://github.com/blockstack/connect/commit/a499f6127b511bcb030b082d6c7d0c8643638b47)]:
  - @stacks/connect-ui@5.2.0

## 6.1.0

### Minor Changes

- [#163](https://github.com/blockstack/connect/pull/163) [`c8e9fc5`](https://github.com/blockstack/connect/commit/c8e9fc590b98df587d7adf3f5984bc2ee4f94c9c) Thanks [@fbwoolf](https://github.com/fbwoolf)! - This adds the optional fee property to transactions so it can be set by apps.

## 6.0.1

### Patch Changes

- [#155](https://github.com/blockstack/connect/pull/155) [`3ec7fee`](https://github.com/blockstack/connect/commit/3ec7fee3b14aec048e4534bc2fbe804b7933454d) Thanks [@fbwoolf](https://github.com/fbwoolf)! - This updates the wallet name in all places to Hiro Wallet.

- Updated dependencies [[`3ec7fee`](https://github.com/blockstack/connect/commit/3ec7fee3b14aec048e4534bc2fbe804b7933454d)]:
  - @stacks/connect-ui@5.1.6

## 6.0.0

### Major Changes

- [#131](https://github.com/blockstack/connect/pull/131) [`c7bd34e`](https://github.com/blockstack/connect/commit/c7bd34e77f874fcf38196cd48d5b514e4c49ec2f) Thanks [@fbwoolf](https://github.com/fbwoolf)! - This exposes the profile_url and other properties in the auth response. It also removes the deprecated 'finished' prop from AuthOptions and transaction options as a breaking change. We will now only support the use of 'onFinish'.

### Patch Changes

- [#139](https://github.com/blockstack/connect/pull/139) [`8c0fc9a`](https://github.com/blockstack/connect/commit/8c0fc9acf068fa49e8dbb82652d5cfc54ceb182a) Thanks [@fbwoolf](https://github.com/fbwoolf)! - This makes modifications to our stencil config so we can import our custom elements properly in connect.

- Updated dependencies [[`8c0fc9a`](https://github.com/blockstack/connect/commit/8c0fc9acf068fa49e8dbb82652d5cfc54ceb182a)]:
  - @stacks/connect-ui@5.1.3

## 5.5.0

### Minor Changes

- [#132](https://github.com/blockstack/connect/pull/132) [`af31f53`](https://github.com/blockstack/connect/commit/af31f530552ba3d506ab2371f6dc5dad47f178aa) Thanks [@pgray-hiro](https://github.com/pgray-hiro)! - This update moves `tsdx` and other dependencies to the correct category of `devDependencies`, fixing a downstream issue in the todos example app.

### Patch Changes

- [#133](https://github.com/blockstack/connect/pull/133) [`8e3d021`](https://github.com/blockstack/connect/commit/8e3d021d7f33f55f79a40b1e439c10f0c5dae8d1) Thanks [@fbwoolf](https://github.com/fbwoolf)! - This removes the cancel boolean added to the tx response because it is not needed.

## 5.4.0

### Minor Changes

- [#129](https://github.com/blockstack/connect/pull/129) [`480f720`](https://github.com/blockstack/connect/commit/480f7200791613052315036534ed142a6377f11d) Thanks [@aulneau](https://github.com/aulneau)! - This update fixes the path used to import `defineCustomElement`.

## 5.3.0

### Minor Changes

- [#122](https://github.com/blockstack/connect/pull/122) [`09be9fc`](https://github.com/blockstack/connect/commit/09be9fc5bdb1ee34763c2bbbfa927875a07cb66a) Thanks [@fbwoolf](https://github.com/fbwoolf)! - This adds calling an onCancel callback when the auth and transaction requests fail.

### Patch Changes

- [#125](https://github.com/blockstack/connect/pull/125) [`107908d`](https://github.com/blockstack/connect/commit/107908dd78faae2d92673ec6eb7c0963e1052f51) Thanks [@fbwoolf](https://github.com/fbwoolf)! - This fixes closing the modal that prompts users to install the stacks wallet.

- Updated dependencies [[`f21e8fb`](https://github.com/blockstack/connect/commit/f21e8fbbb03d5057235d116aced914eaafc1a293), [`107908d`](https://github.com/blockstack/connect/commit/107908dd78faae2d92673ec6eb7c0963e1052f51)]:
  - @stacks/connect-ui@5.1.2

## 5.2.0

### Minor Changes

- [#119](https://github.com/blockstack/connect/pull/119) [`dcb1ef4`](https://github.com/blockstack/connect/commit/dcb1ef431c2bfad68bc8c1d2ea897e5184428b5b) Thanks [@aulneau](https://github.com/aulneau)! - This fixes the import used for the defineCustomElement stencil method.

## 5.1.0

### Minor Changes

- [#113](https://github.com/blockstack/connect/pull/113) [`a403957`](https://github.com/blockstack/connect/commit/a403957c39e136fc31504e5e12cc7f96c797aa51) Thanks [@aulneau](https://github.com/aulneau)! - This adds the `attachment` field to the options you can pass to the extension for including an attachment with a transaction.

### Patch Changes

- [#102](https://github.com/blockstack/connect/pull/102) [`0507abf`](https://github.com/blockstack/connect/commit/0507abf83b30682bc01f7e2876cf3e881d06ff74) Thanks [@agraebe](https://github.com/agraebe)! - This updates connect and connect-react to support the sponsored argument that gets passed to the web extension to enable creating sponsored transactions.

* [#93](https://github.com/blockstack/connect/pull/93) [`d8b58a5`](https://github.com/blockstack/connect/commit/d8b58a5c5ac525d6383eb1c62c23a16ad02a91b8) Thanks [@aulneau](https://github.com/aulneau)! - This update brings with it many of the changes that we've already added to the @stacks/ui and `stacks-wallet-web` repositories. Namely:
  - esbuild is used for both tsdx and webpack builds
  - the type declaration outputs for `@stacks/connect` and `@stacks/connect-react` have been cleaned up
  - we are now using changesets to version and document our changes in these projects
  - adds `patch-package` so that we can make a small patch to `tsdx` to enable better directory output of dist files
* Updated dependencies [[`d8b58a5`](https://github.com/blockstack/connect/commit/d8b58a5c5ac525d6383eb1c62c23a16ad02a91b8)]:
  - @stacks/connect-ui@5.0.6

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 5.0.5 (2021-03-17)

### Bug Fixes

- promise handling in `authenticate` ([1075ee2](https://github.com/blockstack/connect/commit/1075ee2c8181f9130ed5e0f073359b4bd2f78daf))

## 5.0.3 (2021-03-08)

### Bug Fixes

- object-src replace ([5f54666](https://github.com/blockstack/ux/commit/5f54666f36a9b24362a09c5f03ebeeed28c12b33))

## 5.0.2 (2021-03-08)

### Bug Fixes

- deps ([86de1c1](https://github.com/blockstack/ux/commit/86de1c1a931ceaa141d4baf0c88612c180216f35))

## 5.0.1 (2021-03-08)

### Bug Fixes

- checkout main when publishing npm on main ([40446a0](https://github.com/blockstack/ux/commit/40446a0264ccdbcc4ddc556118517680e39b246f))

# [5.0.0](https://github.com/blockstack/ux/compare/@stacks/connect@4.3.15...@stacks/connect@5.0.0) (2021-03-05)

### Bug Fixes

- correct network/chainID matching in tx signing, nonce error ([6190d5f](https://github.com/blockstack/ux/commit/6190d5fcfb62067d494718532215a1e043db8594))
- link packages when building in npm ([34aff46](https://github.com/blockstack/ux/commit/34aff4632fcb24dbb0d8e2b9c20beb30298cfc41))
- serialize post conditions in connect payload ([faebbec](https://github.com/blockstack/ux/commit/faebbecb4994de6a439b78ad693017c279c3bc82))
- showing connect ui and opening extension ([f1f75de](https://github.com/blockstack/ux/commit/f1f75dedfcde220c6c7eaabce2beeed62be67dbf))
- webpack 5, fast refresh :~) ([63d7d38](https://github.com/blockstack/ux/commit/63d7d383855ab46545bccea4302858960e806a5c))

### Features

- improved UX around wallet onboarding ([8ab3dd3](https://github.com/blockstack/ux/commit/8ab3dd397b16a6c46f225286826966b5ef5db250))
- refactor wallet logic, remove keychain ([0f3ac1f](https://github.com/blockstack/ux/commit/0f3ac1fa86b81d7eef1da1db89f8ab3c30540d6c))
- stacks wallet for web ([6957c04](https://github.com/blockstack/ux/commit/6957c04bdcfb816fcf757815b9b2720e7a9209eb))
- switch to signed-in account with connect tx calls ([d6a896f](https://github.com/blockstack/ux/commit/d6a896f39ab150fb8a9d3d3d6aba219334547c9b))
- use extension-native apis for app messaging ([663281a](https://github.com/blockstack/ux/commit/663281ad6e7a29e572ae6a6f24cf2bc6925a6a3b))
- use testnet by default in connect tx signing ([056dc00](https://github.com/blockstack/ux/commit/056dc0036e36fdae0d52caadfa5094e388d6de3b))

## 4.3.15 (2021-01-09)

**Note:** Version bump only for package @stacks/connect

## 4.3.14 (2021-01-08)

### Bug Fixes

- broken tx signing with extension ([0235140](https://github.com/blockstack/ux/commit/023514021c64e06a80bc31125831d5c35ece3118))

## 4.3.13 (2021-01-06)

### Bug Fixes

- ignore exit code from FF addon publish ([ae05d36](https://github.com/blockstack/ux/commit/ae05d3608ac48cf3944d6d62ead2be65bc11bfde))

## 4.3.12 (2021-01-06)

### Bug Fixes

- use job conditionals instead of workflow conditional ([772b374](https://github.com/blockstack/ux/commit/772b3740def1b31fccf004630ef2d29d167210a4))

## 4.3.11 (2021-01-06)

### Bug Fixes

- ignore tags refs for version workflow ([d2a18fc](https://github.com/blockstack/ux/commit/d2a18fc45a4198a112e881552fbb6c502e557d90))

## 4.3.10 (2021-01-06)

### Bug Fixes

- better syntax for excluding tagged commits' ([4729d01](https://github.com/blockstack/ux/commit/4729d01a5afea316c55dade9143f83748b25071b))

## 4.3.9 (2021-01-06)

### Bug Fixes

- dont run publish on master commits without tag ([0b7cb3a](https://github.com/blockstack/ux/commit/0b7cb3ac50af92bd9ad993b70d48cd930fd31c29))

## 4.3.8 (2021-01-06)

**Note:** Version bump only for package @stacks/connect

## 4.3.7 (2020-12-29)

### Bug Fixes

- build rpc pkg before deploying contracts ([c56d3f7](https://github.com/blockstack/ux/commit/c56d3f776494cd471aba77d35b7c5eba20ec245f))

## 4.3.6 (2020-12-29)

### Bug Fixes

- support ts paths in deploy-contracts script ([4bc3ce3](https://github.com/blockstack/ux/commit/4bc3ce3030e392f850cdeaea0e55c6bbaba7c15e))

## 4.3.5 (2020-12-29)

### Bug Fixes

- build packages before deploy-contracts script ([66f0857](https://github.com/blockstack/ux/commit/66f0857cde41d197c29682eedefd46bc16910096))

## 4.3.4 (2020-12-29)

### Bug Fixes

- auto-deploy testnet contracts with github actions ([b1b5c97](https://github.com/blockstack/ux/commit/b1b5c977bc90a9c47e08264d7e0aef665099696e))

## 4.3.3 (2020-12-14)

### Bug Fixes

- prod deploy apps job action ([b8ccc59](https://github.com/blockstack/ux/commit/b8ccc59d1c024705b80991ecb604030f8590e89d))

## 4.3.2 (2020-12-14)

### Bug Fixes

- change lerna publish to skip existing versions ([ac16572](https://github.com/blockstack/ux/commit/ac16572dba7e8d3e770bb4ba61d77094bcad02f9))

## 4.3.1 (2020-12-04)

### Bug Fixes

- export auth from connect ([d201aab](https://github.com/blockstack/ux/commit/d201aab14f2ced0b5f666be571035b7cbf76c602))

# 4.3.0 (2020-11-25)

### Features

- update extension build instructions ([4d55afa](https://github.com/blockstack/ux/commit/4d55afa51dbc3b4cedb81de679b16b91b2df007c))

## 4.2.4 (2020-11-18)

### Bug Fixes

- duplicate 'powered by' on sign in, fixes [#629](https://github.com/blockstack/ux/issues/629) ([6648517](https://github.com/blockstack/ux/commit/6648517e01cdd34a91225dfe08483055b418439c))

## 4.2.3 (2020-11-17)

### Bug Fixes

- update actions to fix set-path err ([0b4fd95](https://github.com/blockstack/ux/commit/0b4fd955f920d5c549690945a18673ea5f0462ae))

## 4.2.2 (2020-11-13)

**Note:** Version bump only for package @stacks/connect

## 4.2.1 (2020-11-09)

### Bug Fixes

- build connect ui in build-ext.sh ([c0bd586](https://github.com/blockstack/ux/commit/c0bd586da2baace269144d8797555177882de76a))

# 4.2.0 (2020-11-07)

### Features

- more tests for url validation ([cad6e6a](https://github.com/blockstack/ux/commit/cad6e6a489bfd4de67ff8c20e480b3db99e97e4e))

## 4.1.4 (2020-11-06)

### Bug Fixes

- blockstack, react dep versions ([7f23d36](https://github.com/blockstack/ux/commit/7f23d36b0b6e4531027cd4b2c3cf5d76c7a274d2))

## 4.1.3 (2020-11-05)

### Bug Fixes

- valid-url package for url validation ([2d0664b](https://github.com/blockstack/ux/commit/2d0664b302dbf7464a9c9c5730e85675375b5a0e))

## 4.1.2 (2020-11-05)

### Bug Fixes

- add dep to app ([eade246](https://github.com/blockstack/ux/commit/eade246edadfb2963c543f3647ba348f77c170ec))

## 4.1.1 (2020-11-05)

### Bug Fixes

- add additional url validation ([1b67fbd](https://github.com/blockstack/ux/commit/1b67fbd91d0eb3cbfabfed297b9e18dfd7ab497b))

# 4.1.0 (2020-11-04)

### Features

- further simplify app instructions ([598827d](https://github.com/blockstack/ux/commit/598827d919fb62f9cc5308ebee5eac6acec4e982))

## 4.0.1 (2020-11-03)

### Bug Fixes

- proper glob for lerna packages ([5367055](https://github.com/blockstack/ux/commit/5367055e9c6622dd0a93f97275ab652a9af56bf9))

# 4.0.0 (2020-11-02)

### Bug Fixes

- 32px horizontal padding ([c0391c3](https://github.com/blockstack/ux/commit/c0391c30953743c9218b44a65d91a5cfb32ab3b9))
- add 40px padding to intro title component ([adb3fd8](https://github.com/blockstack/ux/commit/adb3fd8df4faed8c85968617b8efbf2f1153ce8f))
- add ability for screen to be form, and use onSubmit. Additionally added --mode to webpack command ([3c4b961](https://github.com/blockstack/ux/commit/3c4b9614daf171fa953828f6d8eccff1723ab9cd))
- adjust case on button ([50d4bd4](https://github.com/blockstack/ux/commit/50d4bd41137212c8330405748bc7e6e350a334a8))
- adjust horizontal spacing on screen components ([21b481f](https://github.com/blockstack/ux/commit/21b481f58e843006aad717df4588260cb4c99ea0))
- adjust root dir so packages can build correctly ([f99c210](https://github.com/blockstack/ux/commit/f99c2109a0068250e0983c65a4c5a4e713ddc0e7))
- adjust size of buttons ([611c13d](https://github.com/blockstack/ux/commit/611c13d9d8b61aa50a3ff3b283db025b4c2e370e))
- adjust task names, add bootstrap task ([099038f](https://github.com/blockstack/ux/commit/099038f26e6664a6de9a64c86dfb24eb03d94a31))
- Allow optional title ([#21](https://github.com/blockstack/ux/issues/21)) ([68d44cd](https://github.com/blockstack/ux/commit/68d44cdeaa812085a4018ded47f6dd4310b56e57))
- allow type component to take BoxProps ([3831b40](https://github.com/blockstack/ux/commit/3831b4072a219e7203c56be6e594fb99c0697a50))
- better handling for mobile and blocked popups ([3151863](https://github.com/blockstack/ux/commit/31518632bf91c6217734c21c1163ae076f22368a))
- better readme for firefox install ([cbecc86](https://github.com/blockstack/ux/commit/cbecc86e975a9b758260dbb16e3c29a938717d60))
- Button size ([#31](https://github.com/blockstack/ux/issues/31)) ([218eb22](https://github.com/blockstack/ux/commit/218eb2273acdbf39e66722f2e32fcba8339669e2))
- change global variable for connect ([ffebb16](https://github.com/blockstack/ux/commit/ffebb16308809e5c079232a8da6fc6cd20c3999c))
- connect version was behind published ([2d7633e](https://github.com/blockstack/ux/commit/2d7633e8b842cf231f10c2ea032de3bcd67258ff))
- dont require built ui to build connect ([c354be7](https://github.com/blockstack/ux/commit/c354be7bae0937dbcfdbfbb971f1f85a0a6057a9))
- fix all eslint and prettier tasks ([217ca35](https://github.com/blockstack/ux/commit/217ca350500dafd45797f15251bee78c787c361a))
- footer link size ([285d4e9](https://github.com/blockstack/ux/commit/285d4e94db37e57b8fcea8a4d228d26af3996caa))
- force app icon 100% size in connect modal, fixes [#455](https://github.com/blockstack/ux/issues/455) ([4f69f75](https://github.com/blockstack/ux/commit/4f69f75cf7a153c6511cd200e3d1604e5a049226))
- header margins, change visual content flow, closes [#261](https://github.com/blockstack/ux/issues/261) ([21abfe6](https://github.com/blockstack/ux/commit/21abfe695a6b5a00c4a4f0bd2fe0dd9fec4a8397))
- hide close icon on how it works, [#84](https://github.com/blockstack/ux/issues/84) ([f1c0120](https://github.com/blockstack/ux/commit/f1c01209f17f7c977ac02f5510e8017e4c9c3ced))
- Incorrect intro page footer text ([3736b44](https://github.com/blockstack/ux/commit/3736b44c63d5024ed726b09de176c68174fac7b3))
- link size on how it works, [#83](https://github.com/blockstack/ux/issues/83) ([97935f7](https://github.com/blockstack/ux/commit/97935f7324e908201031590652c454017e585ead))
- lint ([fd708ff](https://github.com/blockstack/ux/commit/fd708ff79fc5bb620edf66a76938d9231bb84dea))
- manually fix new eslint bugs ([7650b7a](https://github.com/blockstack/ux/commit/7650b7a753465a1767a70df45ec1a9fbdd9db1d1))
- no need for -57px ([d1fde14](https://github.com/blockstack/ux/commit/d1fde1415b28ac7dc2562f3ad4a4873065d8d892))
- only use window for scroll lock if available ([6f30a3c](https://github.com/blockstack/ux/commit/6f30a3ce7ae4afac22a68192600d1a767b120394))
- pass close fn to modal for onclickoutside ([9b2c2d0](https://github.com/blockstack/ux/commit/9b2c2d0440e28c44a18a5ff944b69948beed3c24))
- remove background on button style ([9742771](https://github.com/blockstack/ux/commit/974277168b33ec0cf0aea8c541e8f607ab689b77))
- remove debug logging around message pong ([c91581c](https://github.com/blockstack/ux/commit/c91581cac99ff0bcbb1f61fa0d09c92206d1fb2a))
- remove repeating console log, closes [#628](https://github.com/blockstack/ux/issues/628) ([5aee7e1](https://github.com/blockstack/ux/commit/5aee7e153bdf0f854d779f0c4d76e52bc03b1cde))
- replace Connect README with link to documentation; resolve [#423](https://github.com/blockstack/ux/issues/423) ([ac0d2e9](https://github.com/blockstack/ux/commit/ac0d2e9afc1c9853948a04f6504b80d64f75ddbe))
- send to sign in when using showBlockstackConnect, fixes [#507](https://github.com/blockstack/ux/issues/507) ([d7698e8](https://github.com/blockstack/ux/commit/d7698e839e44177e56617701d9df0bca5a60924a))
- stencil publishing tweaks ([db45290](https://github.com/blockstack/ux/commit/db45290e6effbae8e91c9f0d2ab3c9d205cca0f0))
- **connect:** dep adjustments ([28cf998](https://github.com/blockstack/ux/commit/28cf998777e66a36e9d9568c05c5f235f7fcb721))
- **connect:** pass all data to token ([3f46f60](https://github.com/blockstack/ux/commit/3f46f600cccfeadca381574b2b493709b4bba590))
- **connect:** use authOrigin from authOptions ([e6602a8](https://github.com/blockstack/ux/commit/e6602a8a559158d3ecf92268495176619d1f340e))
- remove button border ([0d7a2c7](https://github.com/blockstack/ux/commit/0d7a2c7acd57e38f6d829bec57ddd65d80f8c466))
- Remove demo wording, Closes blockstack/app[#208](https://github.com/blockstack/ux/issues/208) ([21acc09](https://github.com/blockstack/ux/commit/21acc09b8cfa3b527244226efc0122b5e424d275))
- Remove hard coded app name, Closes blockstack/app[#134](https://github.com/blockstack/ux/issues/134) ([db460ad](https://github.com/blockstack/ux/commit/db460ad5ec4ff83e3ac3145b6813ee1154aa718a))
- remove hover from powered by, fixes blockstack/app[#123](https://github.com/blockstack/ux/issues/123) ([31cbd0d](https://github.com/blockstack/ux/commit/31cbd0d8467bf915588f1182acfcf9de15f0d048))
- remove returns ([6ac8d61](https://github.com/blockstack/ux/commit/6ac8d617e536b0167b233a6f9ce11639146fa471))
- removes title elements from modal header conditionally, adjust spacing of appElement component ([f713136](https://github.com/blockstack/ux/commit/f713136cd367d0a1a4d75dbca5b5d4ca6ca8ab41))
- replace css-reset with scoped version ([e5488c4](https://github.com/blockstack/ux/commit/e5488c441f19b44984892059ace86883f341198b))
- screen components horizontal padding ([81c7c1b](https://github.com/blockstack/ux/commit/81c7c1b475914523486d2bf34ee149a116636a1f))
- shouldForwardProp updates ([a2d3964](https://github.com/blockstack/ux/commit/a2d396459b62a1d11dd816b618e7f7e2edc3fe66))
- title styles on intro, size and line-height ([8dfdbd0](https://github.com/blockstack/ux/commit/8dfdbd0d024e01857ee26440bd2520f3e771e28b))
- tweaks to get extension working ([e068dce](https://github.com/blockstack/ux/commit/e068dcec1eca8c30375564a748ff3df4f0e8c715))
- ui version behind published ([8198ca0](https://github.com/blockstack/ux/commit/8198ca050baa5e7294f99f4521aba78cab7635d8))
- update units ([d3320bd](https://github.com/blockstack/ux/commit/d3320bddba5918f16faf879cf5bfd0528ed6debf))

### Code Refactoring

- rename all instances with "data vault" ([182849e](https://github.com/blockstack/ux/commit/182849ebcfcbae56cde06dea9d018e156e5b65ec))

### Features

- add ability to view secret key ([440c3e5](https://github.com/blockstack/ux/commit/440c3e5420321e1a3bcfe409cf65b44fe45e1330))
- add button to get extension ([f0ba354](https://github.com/blockstack/ux/commit/f0ba3545226886f928b01dbf2fb2e3e620ac5bf3))
- add CI, proper connections between packages ([5934829](https://github.com/blockstack/ux/commit/5934829a40338ac269b80783912c8dad17af1962))
- add debug mode for transaction signing ([3c66887](https://github.com/blockstack/ux/commit/3c6688714b070a38c2eefe0d93a6218163917c53))
- Add utm codes to app URL ([9b00a58](https://github.com/blockstack/ux/commit/9b00a58c42121bdc23d44a7c2c943a57e4593f8d))
- adds onCancel method for when popup closed ([c5800ae](https://github.com/blockstack/ux/commit/c5800aeb341c65e108b93b5e7a17a6d937292fc1))
- change copy of intro modal CTA, fixes [#466](https://github.com/blockstack/ux/issues/466) ([6b64222](https://github.com/blockstack/ux/commit/6b64222fc31ab5af4b9807ae280101039388b223))
- codebox and highlighter ([b9056f8](https://github.com/blockstack/ux/commit/b9056f8102eff8d32898201717a3cd3699234561))
- dont use popups in mobile, adds method to handle redirect auth ([450f58b](https://github.com/blockstack/ux/commit/450f58bcb5c3431d6b1ac649d19f319da34d9f7f))
- expose connect, app version ([b90a618](https://github.com/blockstack/ux/commit/b90a618fbeaac0ed998ec5ecd10eda8facdc6e10))
- implementation of router ([bd03411](https://github.com/blockstack/ux/commit/bd034112a098868d07e04dc6aba97d15145707d1))
- improve accessibility of connect modal, links ([74352c7](https://github.com/blockstack/ux/commit/74352c74b5894fa2a612a20f00c02d9f8791a5c2))
- make `manifestPath` optional ([bb1e287](https://github.com/blockstack/ux/commit/bb1e287d797545d5aa5f5e4fd682a1b8478d8f01))
- make redirectTo optional, default to '/' ([392c871](https://github.com/blockstack/ux/commit/392c8715b7d4c07009a8f3695ece914249eb2bfc))
- new hook -- useScrollLock -- lock body scroll when modal is open ([e058848](https://github.com/blockstack/ux/commit/e0588488745a4a7b9b59a5f28e10e1fa6dc92d25))
- prompt password managers earlier in flow, closes [#224](https://github.com/blockstack/ux/issues/224) ([12a6772](https://github.com/blockstack/ux/commit/12a6772fa86096687bcdc5801ea46f7ab42985ee))
- publish as @stacks/connect, rename showBlockstackConnect ([f9da35e](https://github.com/blockstack/ux/commit/f9da35efcbe03da21c80137629c6e20f0f391fce))
- refactor connect ui into web components with stencil ([7f65900](https://github.com/blockstack/ux/commit/7f65900fd6f648dcad57502d985b8dc862e7b72f)), closes [#581](https://github.com/blockstack/ux/issues/581) [#604](https://github.com/blockstack/ux/issues/604) [#612](https://github.com/blockstack/ux/issues/612) [#606](https://github.com/blockstack/ux/issues/606) [#613](https://github.com/blockstack/ux/issues/613)
- remove finished screen, closes [#32](https://github.com/blockstack/ux/issues/32) ([8d85e74](https://github.com/blockstack/ux/commit/8d85e74b0e43c7a8f39ddc3ba272736dbf00f8ef))
- remove secret key branding, [#334](https://github.com/blockstack/ux/issues/334) ([e57c8bc](https://github.com/blockstack/ux/commit/e57c8bc84540b352078e56f19cada41ba0ef6904))
- rename all packages to [@stacks](https://github.com/stacks) ([b56e750](https://github.com/blockstack/ux/commit/b56e750db5b30d4c56e9669285a11db565e8a675))
- show 'install extension' on intro, fixes [#469](https://github.com/blockstack/ux/issues/469) ([faa8071](https://github.com/blockstack/ux/commit/faa80714ab7269904ed3388d000eb96b8aab1676))
- update copy and branding ([7720d10](https://github.com/blockstack/ux/commit/7720d1065acb8cdea94dcd71f90cb58abceeb113))
- update default auth URL ([bd86c90](https://github.com/blockstack/ux/commit/bd86c90a6b9f14ab75d2a7531d83d8aaef7b78cf))
- updated README ([a61c4a4](https://github.com/blockstack/ux/commit/a61c4a403128ca4a2d01dea116b97465f661d30b)), closes [#22](https://github.com/blockstack/ux/issues/22)
- updates default domain to app.blockstack.org ([1b39068](https://github.com/blockstack/ux/commit/1b39068a6d5120d0ba885890519c3c14baef8d42))
- window.focus() after auth finished ([f3003f6](https://github.com/blockstack/ux/commit/f3003f699012c4f21489b0b41274cc171253b72f))

### BREAKING CHANGES

- some API methods have been renamed

## [3.0.1](https://github.com/blockstack/ux/compare/@stacks/connect@3.0.0...@stacks/connect@3.0.1) (2020-11-02)

**Note:** Version bump only for package @stacks/connect

# 3.0.0 (2020-11-02)

### Bug Fixes

- 32px horizontal padding ([c0391c3](https://github.com/blockstack/ux/commit/c0391c30953743c9218b44a65d91a5cfb32ab3b9))
- add 40px padding to intro title component ([adb3fd8](https://github.com/blockstack/ux/commit/adb3fd8df4faed8c85968617b8efbf2f1153ce8f))
- adjust horizontal spacing on screen components ([21b481f](https://github.com/blockstack/ux/commit/21b481f58e843006aad717df4588260cb4c99ea0))
- adjust root dir so packages can build correctly ([f99c210](https://github.com/blockstack/ux/commit/f99c2109a0068250e0983c65a4c5a4e713ddc0e7))
- adjust size of buttons ([611c13d](https://github.com/blockstack/ux/commit/611c13d9d8b61aa50a3ff3b283db025b4c2e370e))
- adjust task names, add bootstrap task ([099038f](https://github.com/blockstack/ux/commit/099038f26e6664a6de9a64c86dfb24eb03d94a31))
- change global variable for connect ([ffebb16](https://github.com/blockstack/ux/commit/ffebb16308809e5c079232a8da6fc6cd20c3999c))
- remove debug logging around message pong ([c91581c](https://github.com/blockstack/ux/commit/c91581cac99ff0bcbb1f61fa0d09c92206d1fb2a))
- remove repeating console log, closes [#628](https://github.com/blockstack/ux/issues/628) ([5aee7e1](https://github.com/blockstack/ux/commit/5aee7e153bdf0f854d779f0c4d76e52bc03b1cde))
- **connect:** pass all data to token ([3f46f60](https://github.com/blockstack/ux/commit/3f46f600cccfeadca381574b2b493709b4bba590))
- **connect:** use authOrigin from authOptions ([e6602a8](https://github.com/blockstack/ux/commit/e6602a8a559158d3ecf92268495176619d1f340e))
- add ability for screen to be form, and use onSubmit. Additionally added --mode to webpack command ([3c4b961](https://github.com/blockstack/ux/commit/3c4b9614daf171fa953828f6d8eccff1723ab9cd))
- adjust case on button ([50d4bd4](https://github.com/blockstack/ux/commit/50d4bd41137212c8330405748bc7e6e350a334a8))
- Allow optional title ([#21](https://github.com/blockstack/ux/issues/21)) ([68d44cd](https://github.com/blockstack/ux/commit/68d44cdeaa812085a4018ded47f6dd4310b56e57))
- allow type component to take BoxProps ([3831b40](https://github.com/blockstack/ux/commit/3831b4072a219e7203c56be6e594fb99c0697a50))
- better handling for mobile and blocked popups ([3151863](https://github.com/blockstack/ux/commit/31518632bf91c6217734c21c1163ae076f22368a))
- better readme for firefox install ([cbecc86](https://github.com/blockstack/ux/commit/cbecc86e975a9b758260dbb16e3c29a938717d60))
- Button size ([#31](https://github.com/blockstack/ux/issues/31)) ([218eb22](https://github.com/blockstack/ux/commit/218eb2273acdbf39e66722f2e32fcba8339669e2))
- connect version was behind published ([2d7633e](https://github.com/blockstack/ux/commit/2d7633e8b842cf231f10c2ea032de3bcd67258ff))
- dont require built ui to build connect ([c354be7](https://github.com/blockstack/ux/commit/c354be7bae0937dbcfdbfbb971f1f85a0a6057a9))
- fix all eslint and prettier tasks ([217ca35](https://github.com/blockstack/ux/commit/217ca350500dafd45797f15251bee78c787c361a))
- footer link size ([285d4e9](https://github.com/blockstack/ux/commit/285d4e94db37e57b8fcea8a4d228d26af3996caa))
- force app icon 100% size in connect modal, fixes [#455](https://github.com/blockstack/ux/issues/455) ([4f69f75](https://github.com/blockstack/ux/commit/4f69f75cf7a153c6511cd200e3d1604e5a049226))
- header margins, change visual content flow, closes [#261](https://github.com/blockstack/ux/issues/261) ([21abfe6](https://github.com/blockstack/ux/commit/21abfe695a6b5a00c4a4f0bd2fe0dd9fec4a8397))
- hide close icon on how it works, [#84](https://github.com/blockstack/ux/issues/84) ([f1c0120](https://github.com/blockstack/ux/commit/f1c01209f17f7c977ac02f5510e8017e4c9c3ced))
- Incorrect intro page footer text ([3736b44](https://github.com/blockstack/ux/commit/3736b44c63d5024ed726b09de176c68174fac7b3))
- link size on how it works, [#83](https://github.com/blockstack/ux/issues/83) ([97935f7](https://github.com/blockstack/ux/commit/97935f7324e908201031590652c454017e585ead))
- lint ([fd708ff](https://github.com/blockstack/ux/commit/fd708ff79fc5bb620edf66a76938d9231bb84dea))
- manually fix new eslint bugs ([7650b7a](https://github.com/blockstack/ux/commit/7650b7a753465a1767a70df45ec1a9fbdd9db1d1))
- no need for -57px ([d1fde14](https://github.com/blockstack/ux/commit/d1fde1415b28ac7dc2562f3ad4a4873065d8d892))
- only use window for scroll lock if available ([6f30a3c](https://github.com/blockstack/ux/commit/6f30a3ce7ae4afac22a68192600d1a767b120394))
- pass close fn to modal for onclickoutside ([9b2c2d0](https://github.com/blockstack/ux/commit/9b2c2d0440e28c44a18a5ff944b69948beed3c24))
- remove background on button style ([9742771](https://github.com/blockstack/ux/commit/974277168b33ec0cf0aea8c541e8f607ab689b77))
- remove button border ([0d7a2c7](https://github.com/blockstack/ux/commit/0d7a2c7acd57e38f6d829bec57ddd65d80f8c466))
- Remove demo wording, Closes blockstack/app[#208](https://github.com/blockstack/ux/issues/208) ([21acc09](https://github.com/blockstack/ux/commit/21acc09b8cfa3b527244226efc0122b5e424d275))
- Remove hard coded app name, Closes blockstack/app[#134](https://github.com/blockstack/ux/issues/134) ([db460ad](https://github.com/blockstack/ux/commit/db460ad5ec4ff83e3ac3145b6813ee1154aa718a))
- remove hover from powered by, fixes blockstack/app[#123](https://github.com/blockstack/ux/issues/123) ([31cbd0d](https://github.com/blockstack/ux/commit/31cbd0d8467bf915588f1182acfcf9de15f0d048))
- remove returns ([6ac8d61](https://github.com/blockstack/ux/commit/6ac8d617e536b0167b233a6f9ce11639146fa471))
- removes title elements from modal header conditionally, adjust spacing of appElement component ([f713136](https://github.com/blockstack/ux/commit/f713136cd367d0a1a4d75dbca5b5d4ca6ca8ab41))
- replace Connect README with link to documentation; resolve [#423](https://github.com/blockstack/ux/issues/423) ([ac0d2e9](https://github.com/blockstack/ux/commit/ac0d2e9afc1c9853948a04f6504b80d64f75ddbe))
- replace css-reset with scoped version ([e5488c4](https://github.com/blockstack/ux/commit/e5488c441f19b44984892059ace86883f341198b))
- screen components horizontal padding ([81c7c1b](https://github.com/blockstack/ux/commit/81c7c1b475914523486d2bf34ee149a116636a1f))
- send to sign in when using showBlockstackConnect, fixes [#507](https://github.com/blockstack/ux/issues/507) ([d7698e8](https://github.com/blockstack/ux/commit/d7698e839e44177e56617701d9df0bca5a60924a))
- shouldForwardProp updates ([a2d3964](https://github.com/blockstack/ux/commit/a2d396459b62a1d11dd816b618e7f7e2edc3fe66))
- title styles on intro, size and line-height ([8dfdbd0](https://github.com/blockstack/ux/commit/8dfdbd0d024e01857ee26440bd2520f3e771e28b))
- tweaks to get extension working ([e068dce](https://github.com/blockstack/ux/commit/e068dcec1eca8c30375564a748ff3df4f0e8c715))
- ui version behind published ([8198ca0](https://github.com/blockstack/ux/commit/8198ca050baa5e7294f99f4521aba78cab7635d8))
- **connect:** dep adjustments ([28cf998](https://github.com/blockstack/ux/commit/28cf998777e66a36e9d9568c05c5f235f7fcb721))
- update units ([d3320bd](https://github.com/blockstack/ux/commit/d3320bddba5918f16faf879cf5bfd0528ed6debf))

### Code Refactoring

- rename all instances with "data vault" ([182849e](https://github.com/blockstack/ux/commit/182849ebcfcbae56cde06dea9d018e156e5b65ec))

### Features

- add ability to view secret key ([440c3e5](https://github.com/blockstack/ux/commit/440c3e5420321e1a3bcfe409cf65b44fe45e1330))
- add button to get extension ([f0ba354](https://github.com/blockstack/ux/commit/f0ba3545226886f928b01dbf2fb2e3e620ac5bf3))
- add CI, proper connections between packages ([5934829](https://github.com/blockstack/ux/commit/5934829a40338ac269b80783912c8dad17af1962))
- add debug mode for transaction signing ([3c66887](https://github.com/blockstack/ux/commit/3c6688714b070a38c2eefe0d93a6218163917c53))
- Add utm codes to app URL ([9b00a58](https://github.com/blockstack/ux/commit/9b00a58c42121bdc23d44a7c2c943a57e4593f8d))
- adds onCancel method for when popup closed ([c5800ae](https://github.com/blockstack/ux/commit/c5800aeb341c65e108b93b5e7a17a6d937292fc1))
- change copy of intro modal CTA, fixes [#466](https://github.com/blockstack/ux/issues/466) ([6b64222](https://github.com/blockstack/ux/commit/6b64222fc31ab5af4b9807ae280101039388b223))
- codebox and highlighter ([b9056f8](https://github.com/blockstack/ux/commit/b9056f8102eff8d32898201717a3cd3699234561))
- dont use popups in mobile, adds method to handle redirect auth ([450f58b](https://github.com/blockstack/ux/commit/450f58bcb5c3431d6b1ac649d19f319da34d9f7f))
- expose connect, app version ([b90a618](https://github.com/blockstack/ux/commit/b90a618fbeaac0ed998ec5ecd10eda8facdc6e10))
- implementation of router ([bd03411](https://github.com/blockstack/ux/commit/bd034112a098868d07e04dc6aba97d15145707d1))
- improve accessibility of connect modal, links ([74352c7](https://github.com/blockstack/ux/commit/74352c74b5894fa2a612a20f00c02d9f8791a5c2))
- make `manifestPath` optional ([bb1e287](https://github.com/blockstack/ux/commit/bb1e287d797545d5aa5f5e4fd682a1b8478d8f01))
- make redirectTo optional, default to '/' ([392c871](https://github.com/blockstack/ux/commit/392c8715b7d4c07009a8f3695ece914249eb2bfc))
- new hook -- useScrollLock -- lock body scroll when modal is open ([e058848](https://github.com/blockstack/ux/commit/e0588488745a4a7b9b59a5f28e10e1fa6dc92d25))
- prompt password managers earlier in flow, closes [#224](https://github.com/blockstack/ux/issues/224) ([12a6772](https://github.com/blockstack/ux/commit/12a6772fa86096687bcdc5801ea46f7ab42985ee))
- publish as @stacks/connect, rename showBlockstackConnect ([f9da35e](https://github.com/blockstack/ux/commit/f9da35efcbe03da21c80137629c6e20f0f391fce))
- refactor connect ui into web components with stencil ([7f65900](https://github.com/blockstack/ux/commit/7f65900fd6f648dcad57502d985b8dc862e7b72f)), closes [#581](https://github.com/blockstack/ux/issues/581) [#604](https://github.com/blockstack/ux/issues/604) [#612](https://github.com/blockstack/ux/issues/612) [#606](https://github.com/blockstack/ux/issues/606) [#613](https://github.com/blockstack/ux/issues/613)
- remove finished screen, closes [#32](https://github.com/blockstack/ux/issues/32) ([8d85e74](https://github.com/blockstack/ux/commit/8d85e74b0e43c7a8f39ddc3ba272736dbf00f8ef))
- remove secret key branding, [#334](https://github.com/blockstack/ux/issues/334) ([e57c8bc](https://github.com/blockstack/ux/commit/e57c8bc84540b352078e56f19cada41ba0ef6904))
- rename all packages to [@stacks](https://github.com/stacks) ([b56e750](https://github.com/blockstack/ux/commit/b56e750db5b30d4c56e9669285a11db565e8a675))
- show 'install extension' on intro, fixes [#469](https://github.com/blockstack/ux/issues/469) ([faa8071](https://github.com/blockstack/ux/commit/faa80714ab7269904ed3388d000eb96b8aab1676))
- update copy and branding ([7720d10](https://github.com/blockstack/ux/commit/7720d1065acb8cdea94dcd71f90cb58abceeb113))
- update default auth URL ([bd86c90](https://github.com/blockstack/ux/commit/bd86c90a6b9f14ab75d2a7531d83d8aaef7b78cf))
- updated README ([a61c4a4](https://github.com/blockstack/ux/commit/a61c4a403128ca4a2d01dea116b97465f661d30b)), closes [#22](https://github.com/blockstack/ux/issues/22)
- updates default domain to app.blockstack.org ([1b39068](https://github.com/blockstack/ux/commit/1b39068a6d5120d0ba885890519c3c14baef8d42))
- window.focus() after auth finished ([f3003f6](https://github.com/blockstack/ux/commit/f3003f699012c4f21489b0b41274cc171253b72f))

### BREAKING CHANGES

- some API methods have been renamed
