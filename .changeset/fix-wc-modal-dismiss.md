---
"@stacks/connect": patch
---

Fix WalletConnect modal dismissal leaving the request promise hanging indefinitely. When the user closes the WalletConnect pairing modal without completing the connection, the promise now correctly rejects with an error instead of hanging forever.
