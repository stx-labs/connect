import { describe, expect, it, vi } from 'vitest';
import { isAddressTaproot, isMobile } from '../src/auth';

describe('auth utilities', () => {
    describe('isAddressTaproot', () => {
        describe('mainnet Taproot addresses (bc1p prefix)', () => {
            it('should return true for valid mainnet Taproot address', () => {
                // Valid bc1p address with 62 characters
                const address = 'bc1pp3ha248m0mnaevhp0txfxj5xaxmy03h0j7zuj2upg34mt7s7e32q7mdfae';
                expect(isAddressTaproot(address)).toBe(true);
            });

            it('should return false for bc1p with wrong length', () => {
                const shortAddress = 'bc1pp3ha248m0mnaevhp0txfxj5xaxmy03h0j7zuj2';
                expect(isAddressTaproot(shortAddress)).toBe(false);
            });
        });

        describe('testnet Taproot addresses (tb1p prefix)', () => {
            it('should return true for valid testnet Taproot address', () => {
                // Valid tb1p address with 62 characters
                const address = 'tb1pp3ha248m0mnaevhp0txfxj5xaxmy03h0j7zuj2upg34mt7s7e32q7mdfae';
                expect(isAddressTaproot(address)).toBe(true);
            });

            it('should return false for tb1p with wrong length', () => {
                const shortAddress = 'tb1pp3ha248m0mnaevhp0txfxj5x';
                expect(isAddressTaproot(shortAddress)).toBe(false);
            });
        });

        describe('regtest Taproot addresses (bcrt1p prefix)', () => {
            it('should return true for valid regtest Taproot address', () => {
                // Valid bcrt1p address with 64 characters
                const address = 'bcrt1pp3ha248m0mnaevhp0txfxj5xaxmy03h0j7zuj2upg34mt7s7e32q7mdfaex';
                expect(isAddressTaproot(address)).toBe(true);
            });

            it('should return false for bcrt1p with wrong length', () => {
                const shortAddress = 'bcrt1pp3ha248m0mnaevhp0tx';
                expect(isAddressTaproot(shortAddress)).toBe(false);
            });
        });

        describe('non-Taproot addresses', () => {
            it('should return false for native SegWit address (bc1q)', () => {
                const address = 'bc1qtmqe7hg4etkq4t384nzg0mrmwf2sam9fjsz0mr';
                expect(isAddressTaproot(address)).toBe(false);
            });

            it('should return false for legacy address (1...)', () => {
                const address = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
                expect(isAddressTaproot(address)).toBe(false);
            });

            it('should return false for P2SH address (3...)', () => {
                const address = '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy';
                expect(isAddressTaproot(address)).toBe(false);
            });

            it('should return false for Stacks address (S...)', () => {
                const address = 'SP2MF04VAGYHGAZWGTEDW5VYCPDWWSY08Z1QFNDSN';
                expect(isAddressTaproot(address)).toBe(false);
            });
        });

        describe('edge cases', () => {
            it('should return false for empty string', () => {
                expect(isAddressTaproot('')).toBe(false);
            });

            it('should return false for address with only prefix', () => {
                expect(isAddressTaproot('bc1p')).toBe(false);
                expect(isAddressTaproot('tb1p')).toBe(false);
                expect(isAddressTaproot('bcrt1p')).toBe(false);
            });

            it('should handle case sensitivity', () => {
                // Bitcoin addresses are case-sensitive for bech32
                const upperCase = 'BC1PP3HA248M0MNAEVHP0TXFXJ5XAXMY03H0J7ZUJ2UPG34MT7S7E32Q7MDFAE';
                expect(isAddressTaproot(upperCase)).toBe(false);
            });
        });
    });

    describe('isMobile', () => {
        const originalNavigator = globalThis.navigator;

        afterEach(() => {
            Object.defineProperty(globalThis, 'navigator', {
                value: originalNavigator,
                writable: true,
            });
        });

        it('should be a function', () => {
            expect(typeof isMobile).toBe('function');
        });

        it('should detect Android devices', () => {
            Object.defineProperty(globalThis, 'navigator', {
                value: { userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G975F)' },
                writable: true,
            });
            expect(isMobile()).toBe(true);
        });

        it('should detect iPhone devices', () => {
            Object.defineProperty(globalThis, 'navigator', {
                value: { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0)' },
                writable: true,
            });
            expect(isMobile()).toBe(true);
        });

        it('should detect iPad devices', () => {
            Object.defineProperty(globalThis, 'navigator', {
                value: { userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0)' },
                writable: true,
            });
            expect(isMobile()).toBe(true);
        });

        it('should detect Windows Phone devices', () => {
            Object.defineProperty(globalThis, 'navigator', {
                value: { userAgent: 'Mozilla/5.0 (compatible; Windows Phone 10)' },
                writable: true,
            });
            expect(isMobile()).toBe(true);
        });

        it('should return false for desktop browsers', () => {
            Object.defineProperty(globalThis, 'navigator', {
                value: { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0' },
                writable: true,
            });
            expect(isMobile()).toBe(false);
        });
    });
});
