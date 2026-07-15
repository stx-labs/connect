import { Cl, PostCondition } from '@stacks/transactions';
import { describe, expect, it } from 'vitest';
import { getMethodOverrides, serializeParams } from '../src/request';

describe('serializeParams', () => {
  it('should handle basic params', () => {
    const params = {
      str: 'hello',
      num: 123,
      bool: true,
      null: null,
      undefined: undefined,
    };
    expect(serializeParams(params as any)).toEqual(params);
  });

  it('should handle bigint values', () => {
    const params = {
      bigNum: BigInt('9007199254740991'),
    };
    expect(serializeParams(params as any)).toEqual({
      bigNum: '9007199254740991',
    });
  });

  it('should handle arrays with mixed content', () => {
    const params = {
      arr: [BigInt('123'), 'string', 123, { type: 'uint', value: '123' }],
    };
    expect(serializeParams(params as any)).toEqual({
      arr: ['123', 'string', 123, '010000000000000000000000000000007b'],
    });
  });

  it('should handle post conditions', () => {
    const postCondition: PostCondition = {
      type: 'stx-postcondition',
      address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      condition: 'gt',
      amount: BigInt('1000000'),
    };
    const params = {
      postCondition,
    };
    expect(serializeParams(params as any)).toEqual({
      postCondition: '00021a6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce0200000000000f4240',
    });
  });

  it('should handle Clarity values', () => {
    const clarityValue = Cl.uint(123);
    const params = {
      value: clarityValue,
    };
    expect(serializeParams(params as any)).toEqual({
      value: '010000000000000000000000000000007b',
    });
  });

  it('should preserve falsy values', () => {
    const params = {
      zero: 0,
      empty: '',
      nullValue: null,
      falseValue: false,
    };
    expect(serializeParams(params as any)).toEqual(params);
  });

  it('should remove functions from params', () => {
    const params = {
      str: 'hello',
      onFinish: () => {
        console.log('finished');
      },
      network: {
        client: {
          fetch: () => Promise.resolve({}),
        },
      },
      num: 123,
    };
    expect(serializeParams(params as any)).toEqual({
      str: 'hello',
      network: { client: {} },
      num: 123,
    });
  });
});

describe('getMethodOverrides', () => {
  const leatherProvider = { isLeather: true } as any;
  const PSBT_BASE64 = 'cHNidP8='; // "psbt\xff"
  const PSBT_HEX = '70736274ff';

  it('maps Leather signPsbt params with signInputs', () => {
    const { method, params } = getMethodOverrides(leatherProvider, 'signPsbt', {
      psbt: PSBT_BASE64,
      signInputs: [0, { index: 2, address: 'bc1qexample' }],
      broadcast: false,
      network: 'mainnet',
    });
    expect(method).toBe('signPsbt');
    expect(params).toMatchObject({
      hex: PSBT_HEX,
      signAtIndex: [0, 2],
      broadcast: false,
      network: 'mainnet',
    });
  });

  it('omits signAtIndex when signInputs is undefined', () => {
    const { params } = getMethodOverrides(leatherProvider, 'signPsbt', {
      psbt: PSBT_BASE64,
    });
    expect(params.hex).toBe(PSBT_HEX);
    expect('signAtIndex' in params).toBe(false);
  });

  it('forwards descriptor to Leather', () => {
    const descriptor = 'wsh(and_v(v:pk(A),older(144)))';
    const { params } = getMethodOverrides(leatherProvider, 'signPsbt', {
      psbt: PSBT_BASE64,
      descriptor,
    });
    expect(params.descriptor).toBe(descriptor);
  });

  it('leaves signPsbt untouched for non-Leather providers', () => {
    const original = { psbt: PSBT_BASE64, signInputs: [0] };
    const { method, params } = getMethodOverrides({} as any, 'signPsbt', original);
    expect(method).toBe('signPsbt');
    expect(params).toBe(original);
  });
});
