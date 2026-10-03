# SIP-030 network discovery

After connecting, call `request('stx_getNetworks')` and register `listen('stx_networkChange', callback)`. The listener returns a synchronous unlisten function; it never opens a wallet-selection modal. Select a wallet first or pass `{ provider }` as the first argument.

The result has `active` and `networks: { id, chainId, transactionVersion }[]`. Chain IDs and versions are numbers. IDs identify wallet configurations, not necessarily URLs or unique blockchains. Xverse's `wallet_getNetworks` exposes configuration IDs and `stacksApiUrl` for richer endpoint discovery.

Native `provider.listen` is preferred. The compatibility path subscribes to legacy `networkChange` and re-reads `stx_getNetworks`; it cannot reconstruct signing parameters from legacy mainnet/testnet labels. Such a provider must implement the SIP request. Async errors go to `onError` (or the console). Unlisten cancels delivery of pending reads. Legacy event payloads and existing request payloads are unchanged.

Account/Gaia listeners are not part of this network-only change. No new WalletConnect session capability is advertised until its wallet transport supports these APIs.
