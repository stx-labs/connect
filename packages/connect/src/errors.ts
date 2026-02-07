import { JsonRpcResponseError } from './methods';

/**
 * Represents a JSON-RPC 2.0 error with code, message, and optional data.
 * 
 * @see {@link JsonRpcErrorCode} for standard and custom error codes
 * 
 * @example
 * ```ts
 * const error = new JsonRpcError('User rejected request', JsonRpcErrorCode.UserRejection);
 * console.log(error.toString()); // "JsonRpcError (-32000): User rejected request"
 * ```
 */
export class JsonRpcError extends Error {
  constructor(
    public message: string,
    public code: number,
    public data?: string,

    public cause?: Error
  ) {
    super(message);
    this.name = 'JsonRpcError';
    this.message = message;
    this.code = code;
    this.data = data;

    this.cause = cause;
  }

  /**
   * Creates a JsonRpcError from a JSON-RPC response error object.
   * 
   * @param error - The error object from a JSON-RPC response
   * @returns A new JsonRpcError instance
   */
  static fromResponse(error: JsonRpcResponseError) {
    return new JsonRpcError(error.message, error.code, error.data);
  }

  /**
   * Returns a human-readable string representation of the error.
   * 
   * @returns Formatted error string including name, code, message, and optional data
   */
  toString() {
    return `${this.name} (${this.code}): ${this.message}${this.data ? `: ${JSON.stringify(this.data)}` : ''}`;
  }
}

/**
 * Type guard to check if an error is a JsonRpcError.
 * 
 * @param error - The error to check
 * @returns `true` if the error is a JsonRpcError instance
 * 
 * @example
 * ```ts
 * try {
 *   await request('stx_transferStx', params);
 * } catch (error) {
 *   if (isJsonRpcError(error)) {
 *     console.log('JSON-RPC Error:', error.code, error.message);
 *   }
 * }
 * ```
 */
export function isJsonRpcError(error: unknown): error is JsonRpcError {
  return error instanceof JsonRpcError;
}

/**
 * Numeric error codes for JSON-RPC errors, used for `.code` in {@link JsonRpcError}.
 * Implementation-defined wallet errors range from `-32099` to `-32000`.
 */
export enum JsonRpcErrorCode {
  // https://www.jsonrpc.org/specification#error_object
  // > The error codes from and including -32768 to -32000 are reserved for pre-defined errors.

  /** Invalid JSON received by server while parsing */
  ParseError = -32_700,

  /** Invalid Request object */
  InvalidRequest = -32_600,

  /** Method not found/available */
  MethodNotFound = -32_601,

  /** Invalid method params */
  InvalidParams = -32_602,

  /** Internal JSON-RPC error */
  InternalError = -32_603,

  // IMPLEMENTATION-DEFINED WALLET ERRORS
  /** User rejected the request (implementation-defined wallet error) */
  UserRejection = -32_000,

  /** Address mismatch for the requested method (implementation-defined wallet error) */
  MethodAddressMismatch = -32_001,

  /** Access denied for the requested method (implementation-defined wallet error) */
  MethodAccessDenied = -32_002,

  /** Network-related error, e.g., node unavailable (implementation-defined wallet error) */
  NetworkError = -32_003,

  /** Request timed out (implementation-defined wallet error) */
  TimeoutError = -32_004,

  /** Wallet provider not found or not installed (implementation-defined wallet error) */
  ProviderNotFound = -32_005,

  /** Method is not supported by this wallet (implementation-defined wallet error) */
  UnsupportedMethod = -32_006,

  /** Invalid or unsupported network configuration (implementation-defined wallet error) */
  InvalidNetwork = -32_007,

  // CUSTOM ERRORS (Custom range, not inside the JSON-RPC error code range)
  /**
   * Unknown external error.
   * Error does not originate from the wallet.
   */
  UnknownError = -31_000,

  /**
   * User canceled the request.
   * Error may not originate from the wallet.
   */
  UserCanceled = -31_001,
}

