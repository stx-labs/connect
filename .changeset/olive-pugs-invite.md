---
'@stacks/connect': patch
---

Add the experimental Leather-specific `allowPolicyAccounts` param to `getAddresses`, for
opting in to policy (multisig) accounts, and forward it through `connect()`
