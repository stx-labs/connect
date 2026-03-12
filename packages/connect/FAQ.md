# Frequently Asked Questions

Common questions and answers about `@stacks/connect`.

## General Questions

### What wallets are supported?

Stacks Connect supports any wallet that implements the [SIP-030](https://github.com/janniks/sips/blob/main/sips/sip-030/sip-030-wallet-interface.md) standard. Currently supported wallets include:

- [Leather](https://leather.io/) (formerly Hiro Wallet)
- [Xverse](https://www.xverse.app/)
- [OKX Wallet](https://www.okx.com/web3)
- [Asigna](https://asigna.io/)

### How do I check if a user is connected?

```typescript
import { isConnected, getLocalStorage } from '@stacks/connect';

// Check if user is connected
if (isConnected()) {
  const userData = getLocalStorage();
  console.log('User address:', userData.addresses.stx[0].address);
}
```

### How do I disconnect a user?

```typescript
import { disconnect } from '@stacks/connect';

// Clear stored user data
disconnect();
```

## Common Issues

### "No wallet found" error

**Problem:** The `connect()` function throws an error because no wallet is detected.

**Solution:** Ensure the user has a Stacks wallet extension installed. You can provide a fallback UI:

```typescript
import { connect, showWalletPicker } from '@stacks/connect';

try {
  await connect();
} catch (error) {
  // Show wallet installation options
  showWalletPicker();
}
```

### Transaction not showing in wallet

**Problem:** After calling `request('stx_callContract', ...)`, the wallet popup doesn't appear.

**Solutions:**
1. Ensure popup blockers are disabled for your site
2. Check browser console for errors
3. Verify the wallet extension is unlocked
4. Try calling `connect()` first to ensure a session is established

### Wrong network address returned

**Problem:** Getting testnet address when expecting mainnet (or vice versa).

**Solution:** The wallet returns addresses based on its current network setting. Check the network in the response:

```typescript
const response = await request('stx_getAddresses', {});
const network = response.addresses[0].network; // 'mainnet' or 'testnet'
```

### CORS errors when making API calls

**Problem:** Getting CORS errors when calling Stacks API endpoints.

**Solution:** Stacks Connect itself doesn't make API calls. If you're using `@stacks/network` or direct fetch calls:

```typescript
// Use the official API endpoints which have CORS enabled
const mainnetApi = 'https://api.hiro.so';
const testnetApi = 'https://api.testnet.hiro.so';
```

## TypeScript Questions

### How do I type the response from `request()`?

```typescript
import { request } from '@stacks/connect';
import type { StxCallContractResponse } from '@stacks/connect';

const response = await request('stx_callContract', {
  contract: 'SP123.my-contract',
  functionName: 'my-function',
  functionArgs: [],
}) as StxCallContractResponse;

console.log(response.txid);
```

### What types are available?

Import types from the package:

```typescript
import type {
  ConnectResponse,
  StxTransferResponse,
  StxCallContractResponse,
  StxDeployContractResponse,
  StxSignMessageResponse,
} from '@stacks/connect';
```

## React Integration

### How do I use Connect with React?

```tsx
import { useState, useEffect } from 'react';
import { connect, disconnect, isConnected, getLocalStorage } from '@stacks/connect';

function WalletButton() {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected()) {
      const data = getLocalStorage();
      setAddress(data?.addresses?.stx?.[0]?.address || null);
    }
  }, []);

  const handleConnect = async () => {
    try {
      const response = await connect();
      setAddress(response.addresses.stx[0].address);
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setAddress(null);
  };

  if (address) {
    return (
      <div>
        <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
        <button onClick={handleDisconnect}>Disconnect</button>
      </div>
    );
  }

  return <button onClick={handleConnect}>Connect Wallet</button>;
}
```

## Need More Help?

- [GitHub Issues](https://github.com/hirosystems/connect/issues)
- [Discord Community](https://discord.com/invite/pPwMzMx9k8)
- [Hiro Documentation](https://docs.hiro.so)
