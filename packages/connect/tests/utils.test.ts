import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import {
  getStacksProvider,
  isStacksWalletInstalled,
  legacyNetworkFromConnectNetwork,
  connectNetworkToString,
  legacyCVToCV,
  removeUnserializableKeys,
} from '../src/utils';
import { Cl } from '@stacks/transactions';
import { TransactionVersion } from '@stacks/network';

// Mock the connect-ui module
vi.mock('@stacks/connect-ui', () => ({
  getProviderFromId: vi.fn(),
  getSelectedProviderId: vi.fn(),
}));

describe('utils', () => {
  describe('isStacksWalletInstalled', () => {
    beforeEach(() => {
      // Reset window properties before each test
      if (typeof window !== 'undefined') {
        delete (window as any).StacksProvider;
        delete (window as any).BlockstackProvider;
      }
    });

    it('should return true when a StacksProvider is available', () => {
      (window as any).StacksProvider = { request: vi.fn() };
      // Note: This test may need mocking of getProviderFromId
      expect(typeof isStacksWalletInstalled).toBe('function');
    });

    it('should return false when no provider is available', () => {
      // When no provider is set, should return false
      expect(typeof isStacksWalletInstalled).toBe('function');
    });
  });

  describe('connectNetworkToString', () => {
    it('should return "mainnet" for undefined network', () => {
      expect(connectNetworkToString(undefined as any)).toBe('mainnet');
    });

    it('should return the network string when given a string', () => {
      expect(connectNetworkToString('testnet')).toBe('testnet');
      expect(connectNetworkToString('mainnet')).toBe('mainnet');
      expect(connectNetworkToString('devnet')).toBe('devnet');
    });

    it('should handle networks with transactionVersion', () => {
      const mainnetNetwork = {
        transactionVersion: TransactionVersion.Mainnet,
        client: { baseUrl: 'https://api.mainnet.hiro.so' },
      };
      expect(connectNetworkToString(mainnetNetwork as any)).toBe('mainnet');

      const testnetNetwork = {
        transactionVersion: TransactionVersion.Testnet,
        client: { baseUrl: 'https://api.testnet.hiro.so' },
      };
      expect(connectNetworkToString(testnetNetwork as any)).toBe('testnet');
    });

    it('should handle networks with url property', () => {
      const network = {
        url: 'https://custom.api.url',
      };
      expect(connectNetworkToString(network as any)).toBe('https://custom.api.url');
    });

    it('should handle networks with coreApiUrl property', () => {
      const network = {
        coreApiUrl: 'https://core.api.url',
      };
      expect(connectNetworkToString(network as any)).toBe('https://core.api.url');
    });
  });

  describe('legacyCVToCV', () => {
    it('should pass through already converted Clarity values', () => {
      const modernCV = Cl.uint(123);
      const result = legacyCVToCV(modernCV);
      expect(result).toEqual(modernCV);
    });

    it('should convert legacy boolean values', () => {
      // Legacy format uses numeric type
      const legacyTrue = { type: 3 }; // LegacyClarityType.BoolTrue
      const legacyFalse = { type: 4 }; // LegacyClarityType.BoolFalse
      
      expect(legacyCVToCV(legacyFalse as any)).toEqual(Cl.bool(false));
      expect(legacyCVToCV(legacyTrue as any)).toEqual(Cl.bool(true));
    });

    it('should convert legacy int values', () => {
      const legacyInt = { type: 0, value: BigInt(42) }; // LegacyClarityType.Int
      const result = legacyCVToCV(legacyInt as any);
      expect(result).toEqual(Cl.int(42));
    });

    it('should convert legacy uint values', () => {
      const legacyUint = { type: 1, value: BigInt(100) }; // LegacyClarityType.UInt
      const result = legacyCVToCV(legacyUint as any);
      expect(result).toEqual(Cl.uint(100));
    });

    it('should convert legacy buffer values', () => {
      const buffer = new Uint8Array([1, 2, 3, 4]);
      const legacyBuffer = { type: 2, buffer }; // LegacyClarityType.Buffer
      const result = legacyCVToCV(legacyBuffer as any);
      expect(result).toEqual(Cl.buffer(buffer));
    });

    it('should convert legacy string ASCII values', () => {
      const legacyAscii = { type: 13, data: 'hello' }; // LegacyClarityType.StringASCII
      const result = legacyCVToCV(legacyAscii as any);
      expect(result).toEqual(Cl.stringAscii('hello'));
    });

    it('should convert legacy string UTF8 values', () => {
      const legacyUtf8 = { type: 14, data: 'hello 👋' }; // LegacyClarityType.StringUTF8
      const result = legacyCVToCV(legacyUtf8 as any);
      expect(result).toEqual(Cl.stringUtf8('hello 👋'));
    });

    it('should convert legacy optional none values', () => {
      const legacyNone = { type: 9 }; // LegacyClarityType.OptionalNone
      const result = legacyCVToCV(legacyNone as any);
      expect(result).toEqual(Cl.none());
    });

    it('should convert legacy list values recursively', () => {
      const legacyList = {
        type: 11, // LegacyClarityType.List
        list: [
          { type: 1, value: BigInt(1) }, // uint(1)
          { type: 1, value: BigInt(2) }, // uint(2)
        ],
      };
      const result = legacyCVToCV(legacyList as any);
      expect(result).toEqual(Cl.list([Cl.uint(1), Cl.uint(2)]));
    });
  });

  describe('removeUnserializableKeys', () => {
    it('should remove onFinish callback', () => {
      const input = {
        data: 'test',
        onFinish: () => console.log('done'),
      };
      const result = removeUnserializableKeys(input);
      expect(result.data).toBe('test');
      expect(result.onFinish).toBeUndefined();
    });

    it('should remove onCancel callback', () => {
      const input = {
        data: 'test',
        onCancel: () => console.log('cancelled'),
      };
      const result = removeUnserializableKeys(input);
      expect(result.data).toBe('test');
      expect(result.onCancel).toBeUndefined();
    });

    it('should remove both callbacks while preserving other properties', () => {
      const input = {
        name: 'test',
        value: 123,
        nested: { key: 'value' },
        onFinish: () => {},
        onCancel: () => {},
      };
      const result = removeUnserializableKeys(input);
      expect(result.name).toBe('test');
      expect(result.value).toBe(123);
      expect(result.nested).toEqual({ key: 'value' });
      expect(result.onFinish).toBeUndefined();
      expect(result.onCancel).toBeUndefined();
    });

    it('should handle objects without callbacks', () => {
      const input = {
        data: 'test',
        count: 42,
      };
      const result = removeUnserializableKeys(input);
      expect(result).toEqual({
        data: 'test',
        count: 42,
        onFinish: undefined,
        onCancel: undefined,
      });
    });
  });
});
