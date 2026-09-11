import { describe, expect, it } from 'vitest';
import { JsonRpcError, JsonRpcErrorCode } from '../src/errors';

describe('JsonRpcError', () => {
    describe('constructor', () => {
        it('should create an error with message and code', () => {
            const error = new JsonRpcError('Test error', -32000);
            expect(error.message).toBe('Test error');
            expect(error.code).toBe(-32000);
            expect(error.name).toBe('JsonRpcError');
        });

        it('should create an error with optional data', () => {
            const error = new JsonRpcError('Test error', -32000, 'additional data');
            expect(error.data).toBe('additional data');
        });

        it('should create an error with optional cause', () => {
            const cause = new Error('Original error');
            const error = new JsonRpcError('Wrapped error', -32000, undefined, cause);
            expect(error.cause).toBe(cause);
        });

        it('should extend the Error class', () => {
            const error = new JsonRpcError('Test', -32000);
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(JsonRpcError);
        });
    });

    describe('fromResponse', () => {
        it('should create error from JsonRpcResponseError', () => {
            const responseError = {
                message: 'Response error',
                code: -32600,
                data: 'error details',
            };
            const error = JsonRpcError.fromResponse(responseError);
            expect(error.message).toBe('Response error');
            expect(error.code).toBe(-32600);
            expect(error.data).toBe('error details');
        });

        it('should handle response without data', () => {
            const responseError = {
                message: 'Simple error',
                code: -32601,
            };
            const error = JsonRpcError.fromResponse(responseError as any);
            expect(error.message).toBe('Simple error');
            expect(error.code).toBe(-32601);
            expect(error.data).toBeUndefined();
        });
    });

    describe('toString', () => {
        it('should format error without data', () => {
            const error = new JsonRpcError('Test error', -32000);
            const str = error.toString();
            expect(str).toBe('JsonRpcError (-32000): Test error');
        });

        it('should format error with data', () => {
            const error = new JsonRpcError('Test error', -32000, 'extra info');
            const str = error.toString();
            expect(str).toBe('JsonRpcError (-32000): Test error: "extra info"');
        });

        it('should format error with complex data', () => {
            const error = new JsonRpcError('Test error', -32000, JSON.stringify({ key: 'value' }));
            const str = error.toString();
            expect(str).toContain('JsonRpcError (-32000): Test error');
        });
    });
});

describe('JsonRpcErrorCode', () => {
    describe('standard JSON-RPC error codes', () => {
        it('should have ParseError code', () => {
            expect(JsonRpcErrorCode.ParseError).toBe(-32700);
        });

        it('should have InvalidRequest code', () => {
            expect(JsonRpcErrorCode.InvalidRequest).toBe(-32600);
        });

        it('should have MethodNotFound code', () => {
            expect(JsonRpcErrorCode.MethodNotFound).toBe(-32601);
        });

        it('should have InvalidParams code', () => {
            expect(JsonRpcErrorCode.InvalidParams).toBe(-32602);
        });

        it('should have InternalError code', () => {
            expect(JsonRpcErrorCode.InternalError).toBe(-32603);
        });
    });

    describe('wallet-specific error codes', () => {
        it('should have UserRejection code', () => {
            expect(JsonRpcErrorCode.UserRejection).toBe(-32000);
        });

        it('should have MethodAddressMismatch code', () => {
            expect(JsonRpcErrorCode.MethodAddressMismatch).toBe(-32001);
        });

        it('should have MethodAccessDenied code', () => {
            expect(JsonRpcErrorCode.MethodAccessDenied).toBe(-32002);
        });
    });

    describe('custom error codes', () => {
        it('should have UnknownError code', () => {
            expect(JsonRpcErrorCode.UnknownError).toBe(-31000);
        });

        it('should have UserCanceled code', () => {
            expect(JsonRpcErrorCode.UserCanceled).toBe(-31001);
        });
    });

    describe('error code ranges', () => {
        it('should have standard codes in reserved range (-32768 to -32000)', () => {
            expect(JsonRpcErrorCode.ParseError).toBeLessThanOrEqual(-32000);
            expect(JsonRpcErrorCode.ParseError).toBeGreaterThanOrEqual(-32768);
            expect(JsonRpcErrorCode.InvalidRequest).toBeLessThanOrEqual(-32000);
            expect(JsonRpcErrorCode.InternalError).toBeLessThanOrEqual(-32000);
        });

        it('should have implementation-defined codes in wallet range (-32099 to -32000)', () => {
            expect(JsonRpcErrorCode.UserRejection).toBe(-32000);
            expect(JsonRpcErrorCode.MethodAddressMismatch).toBe(-32001);
            expect(JsonRpcErrorCode.MethodAccessDenied).toBe(-32002);
        });

        it('should have custom codes outside JSON-RPC reserved range', () => {
            expect(JsonRpcErrorCode.UnknownError).toBeGreaterThan(-32000);
            expect(JsonRpcErrorCode.UserCanceled).toBeGreaterThan(-32000);
        });
    });
});
