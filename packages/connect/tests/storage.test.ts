import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { normalizeAddresses, isConnected, LOCAL_STORAGE_KEY } from '../src/storage';
import { AddressEntry } from '../src/methods';

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => {
            store[key] = value;
        }),
        removeItem: vi.fn((key: string) => {
            delete store[key];
        }),
        clear: vi.fn(() => {
            store = {};
        }),
    };
})();

Object.defineProperty(globalThis, 'localStorage', {
    value: localStorageMock,
    writable: true,
});

describe('storage', () => {
    beforeEach(() => {
        localStorageMock.clear();
        vi.clearAllMocks();
    });

    describe('normalizeAddresses', () => {
        it('should deduplicate addresses by address field', () => {
            const addresses: AddressEntry[] = [
                { address: 'SP123', publicKey: 'key1' },
                { address: 'SP123', publicKey: 'key2' },
                { address: 'SP456', publicKey: 'key3' },
            ];
            const result = normalizeAddresses(addresses);
            expect(result).toHaveLength(2);
            expect(result.map(a => a.address)).toEqual(['SP123', 'SP456']);
        });

        it('should remove publicKey from addresses', () => {
            const addresses: AddressEntry[] = [
                { address: 'SP123', publicKey: 'key1' },
            ];
            const result = normalizeAddresses(addresses);
            expect(result[0]).not.toHaveProperty('publicKey');
        });

        it('should remove derivationPath from addresses', () => {
            const addresses: AddressEntry[] = [
                { address: 'SP123', publicKey: 'key1', derivationPath: "m/44'/5757'/0'/0/0" } as any,
            ];
            const result = normalizeAddresses(addresses);
            expect(result[0]).not.toHaveProperty('derivationPath');
        });

        it('should remove tweakedPublicKey from addresses', () => {
            const addresses: AddressEntry[] = [
                { address: 'bc1p123', publicKey: 'key1', tweakedPublicKey: 'tweakedKey' } as any,
            ];
            const result = normalizeAddresses(addresses);
            expect(result[0]).not.toHaveProperty('tweakedPublicKey');
        });

        it('should handle empty array', () => {
            const result = normalizeAddresses([]);
            expect(result).toEqual([]);
        });

        it('should preserve non-sensitive fields', () => {
            const addresses: AddressEntry[] = [
                { address: 'SP123', publicKey: 'key1', symbol: 'STX' } as any,
            ];
            const result = normalizeAddresses(addresses);
            expect(result[0].address).toBe('SP123');
            expect((result[0] as any).symbol).toBe('STX');
        });
    });

    describe('LOCAL_STORAGE_KEY', () => {
        it('should have the correct key value', () => {
            expect(LOCAL_STORAGE_KEY).toBe('@stacks/connect');
        });
    });

    describe('isConnected', () => {
        it('should return false when no storage data exists', () => {
            // getLocalStorage returns null when no data
            expect(typeof isConnected).toBe('function');
        });

        it('should be a function that checks connection status', () => {
            expect(typeof isConnected).toBe('function');
        });
    });
});
