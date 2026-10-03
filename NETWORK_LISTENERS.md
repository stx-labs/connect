# SIP-030 network discovery

After connecting, call `request('stx_getNetworks')` and register `listen('stx_networkChange', callback)`. The listener returns a synchronous unlisten function; it never opens a wallet-selection modal. Select a wallet first or pass `{ provider }` as the first argument.

The result has `active` and `networks: { id, chainId, transactionVersion }[]`. Chain IDs and versions are numbers. IDs identify wallet configurations, not necessarily URLs or unique blockchains. Xverse's `wallet_getNetworks` exposes configuration IDs and `stacksApiUrl` for richer endpoint discovery.

Native `provider.listen` is preferred. The compatibility path subscribes to legacy `networkChange` and re-reads `stx_getNetworks`; it cannot reconstruct signing parameters from legacy mainnet/testnet labels. Such a provider must implement the SIP request. Async errors go to `onError` (or the console). Unlisten cancels delivery of pending reads. Legacy event payloads and existing request payloads are unchanged.

## Account listeners

`listen('stx_accountChange', accounts => { /* update app state */ })` returns an unlisten function and delivers a bare Stacks accounts array. Native provider support is required: Connect does not synthesize account payloads from legacy multi-chain events or call `stx_getAccounts` automatically, since that can open an approval popup. Request-only/legacy providers fail explicitly for this event. Legacy listener and RPC responses remain unchanged.

Xverse deliberately deprecates Gaia in this new event. Software and hardware accounts return their real public Stacks address/key with a 64-character all-zero hexadecimal `gaiaAppKey` and `https://gaia.invalid` as the mock hub URL. These placeholders must not be used for Gaia storage/authentication. Xverse suppresses account notifications while locked, never unlocks automatically, and sends an empty array to connected origins lacking read permission for the selected account (or when no usable Stacks account exists). Other wallets can have a different Gaia policy.

No new WalletConnect session capability is advertised until its wallet transport supports these APIs.
