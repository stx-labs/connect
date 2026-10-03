import { describe, expect, it, vi } from 'vitest';
import { listen } from '../src/listen';
import { requestRaw } from '../src/request';
import type { ListenEventMap, StacksProvider } from '../src/types';

const result = {
  active: 'custom',
  networks: [{ id: 'custom', chainId: 0, transactionVersion: 128 }],
};
describe('SIP-030 network APIs', () => {
  it('requests networks without transforming their payload', async () => {
    const request = vi.fn().mockResolvedValue({ jsonrpc: '2.0', id: '1', result });
    expect(await requestRaw({ request }, 'stx_getNetworks')).toBe(result);
  });
  it('preserves the native listener receiver and unlisten function', () => {
    const cleanup = vi.fn();
    const callback = vi.fn();
    const provider: StacksProvider = {
      request: vi.fn(),
      listen(event, listener) {
        expect(this).toBe(provider);
        expect(event).toBe('stx_networkChange');
        listener(result as ListenEventMap[typeof event]);
        return cleanup;
      },
    };
    expect(listen({ provider }, 'stx_networkChange', callback)).toBe(cleanup);
    expect(callback).toHaveBeenCalledWith(result);
  });
  it.each(['object', 'positional'])(
    'adapts the %s legacy listener without rewriting its payload',
    async convention => {
      let notify: () => void = () => {};
      const cleanup = vi.fn();
      const request = vi.fn().mockResolvedValue({ jsonrpc: '2.0', id: '1', result });
      const addListener =
        convention === 'object'
          ? ({ cb }: { cb: () => void }) => {
              notify = cb;
              return cleanup;
            }
          : (_event: string, cb: () => void) => {
              notify = cb;
              return cleanup;
            };
      const callback = vi.fn();
      const unlisten = listen(
        { provider: { request, addListener } as StacksProvider },
        'stx_networkChange',
        callback
      );
      notify();
      await vi.waitFor(() => expect(callback).toHaveBeenCalledWith(result));
      expect(request).toHaveBeenCalledWith('stx_getNetworks', undefined);
      unlisten();
      notify();
      await Promise.resolve();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(cleanup).toHaveBeenCalledTimes(1);
    }
  );
  it('suppresses pending results after unlisten', async () => {
    let notify: () => void = () => {};
    let resolve: (value: unknown) => void = () => {};
    const request = vi.fn(
      () =>
        new Promise(r => {
          resolve = r;
        })
    );
    const addListener = ({ cb }: { cb: () => void }) => {
      notify = cb;
      return () => {};
    };
    const callback = vi.fn();
    const unlisten = listen(
      { provider: { request, addListener } as StacksProvider },
      'stx_networkChange',
      callback
    );
    notify();
    await Promise.resolve();
    unlisten();
    resolve({ result });
    await Promise.resolve();
    await Promise.resolve();
    expect(callback).not.toHaveBeenCalled();
  });
  it('passes native account arrays and preserves the provider receiver', () => {
    const accounts = [
      {
        address: 'SP123',
        publicKey: '02abc',
        gaiaHubUrl: 'https://gaia.invalid',
        gaiaAppKey: '0'.repeat(64),
      },
    ];
    const cleanup = vi.fn();
    const callback = vi.fn();
    const provider: StacksProvider = {
      request: vi.fn(),
      listen(event, listener) {
        expect(this).toBe(provider);
        expect(event).toBe('stx_accountChange');
        listener(accounts as ListenEventMap[typeof event]);
        return cleanup;
      },
    };
    expect(listen({ provider }, 'stx_accountChange', callback)).toBe(cleanup);
    expect(callback).toHaveBeenCalledWith(accounts);
    expect(provider.request).not.toHaveBeenCalled();
  });
  it('does not adapt legacy accounts or open getAccounts approval popups', () => {
    const request = vi.fn();
    const addListener = vi.fn();
    expect(() =>
      listen({ provider: { request, addListener } as StacksProvider }, 'stx_accountChange', vi.fn())
    ).toThrow('account listeners');
    expect(addListener).not.toHaveBeenCalled();
    expect(request).not.toHaveBeenCalled();
  });
  it('fails explicitly for request-only providers', () => {
    expect(() => listen({ provider: { request: vi.fn() } }, 'stx_networkChange', vi.fn())).toThrow(
      'does not support'
    );
  });
});
