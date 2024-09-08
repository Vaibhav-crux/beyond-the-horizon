"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Custom error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error(`Error occurred in ${req.method} ${req.url}:`, err);
    // Determine the status code based on the error type or default to 500
    let statusCode;
    switch (err.name) {
        case 'ValidationError': // 400 Bad Request: Invalid request syntax
            statusCode = 400;
            break;
        case 'UnauthorizedError': // 401 Unauthorized: Authentication required
            statusCode = 401;
            break;
        case 'PaymentRequiredError': // 402 Payment Required: Reserved for future use
            statusCode = 402;
            break;
        case 'ForbiddenError': // 403 Forbidden: Access denied
            statusCode = 403;
            break;
        case 'NotFoundError': // 404 Not Found: Resource not found
            statusCode = 404;
            break;
        case 'MethodNotAllowedError': // 405 Method Not Allowed: HTTP method not allowed
            statusCode = 405;
            break;
        case 'NotAcceptableError': // 406 Not Acceptable: Cannot fulfill request based on accept headers
            statusCode = 406;
            break;
        case 'ProxyAuthenticationRequiredError': // 407 Proxy Authentication Required: Authentication needed for proxy
            statusCode = 407;
            break;
        case 'RequestTimeoutError': // 408 Request Timeout: Request took too long
            statusCode = 408;
            break;
        case 'ConflictError': // 409 Conflict: Request conflicts with current state of the server
            statusCode = 409;
            break;
        case 'GoneError': // 410 Gone: Resource is no longer available
            statusCode = 410;
            break;
        case 'LengthRequiredError': // 411 Length Required: Content-Length header is required
            statusCode = 411;
            break;
        case 'PreconditionFailedError': // 412 Precondition Failed: Preconditions in headers not met
            statusCode = 412;
            break;
        case 'PayloadTooLargeError': // 413 Payload Too Large: Request entity is too large
            statusCode = 413;
            break;
        case 'URITooLongError': // 414 URI Too Long: The URI requested is too long
            statusCode = 414;
            break;
        case 'UnsupportedMediaTypeError': // 415 Unsupported Media Type: Media type is not supported
            statusCode = 415;
            break;
        case 'RangeNotSatisfiableError': // 416 Range Not Satisfiable: Cannot satisfy range request
            statusCode = 416;
            break;
        case 'ExpectationFailedError': // 417 Expectation Failed: Expectation given in the request's Expect header could not be met
            statusCode = 417;
            break;
        case 'ImATeapotError': // 418 I'm a Teapot: RFC 2324-defined status code
            statusCode = 418;
            break;
        case 'MisdirectedRequestError': // 421 Misdirected Request: Request was directed at a server that is not able to produce a response
            statusCode = 421;
            break;
        case 'UnprocessableEntityError': // 422 Unprocessable Entity: Request well-formed but semantically incorrect
            statusCode = 422;
            break;
        case 'LockedError': // 423 Locked: The resource being accessed is locked
            statusCode = 423;
            break;
        case 'FailedDependencyError': // 424 Failed Dependency: The request failed due to failure of a previous request
            statusCode = 424;
            break;
        case 'TooEarlyError': // 425 Too Early: The server is unwilling to risk processing a request that might be replayed
            statusCode = 425;
            break;
        case 'UpgradeRequiredError': // 426 Upgrade Required: Client should switch to a different protocol
            statusCode = 426;
            break;
        case 'PreconditionRequiredError': // 428 Precondition Required: Server requires the request to be conditional
            statusCode = 428;
            break;
        case 'TooManyRequestsError': // 429 Too Many Requests: User has sent too many requests in a given time
            statusCode = 429;
            break;
        case 'RequestHeaderFieldsTooLargeError': // 431 Request Header Fields Too Large: Request header fields are too large
            statusCode = 431;
            break;
        case 'UnavailableForLegalReasonsError': // 451 Unavailable For Legal Reasons: Resource is unavailable due to legal reasons
            statusCode = 451;
            break;
        case 'InternalServerError': // 500 Internal Server Error: Generic server error
            statusCode = 500;
            break;
        case 'NotImplementedError': // 501 Not Implemented: Request method not supported by the server
            statusCode = 501;
            break;
        case 'BadGatewayError': // 502 Bad Gateway: Invalid response from the upstream server
            statusCode = 502;
            break;
        case 'ServiceUnavailableError': // 503 Service Unavailable: The server is not ready to handle the request
            statusCode = 503;
            break;
        case 'GatewayTimeoutError': // 504 Gateway Timeout: The server is acting as a gateway and cannot get a response in time
            statusCode = 504;
            break;
        case 'HTTPVersionNotSupportedError': // 505 HTTP Version Not Supported: The HTTP version used in the request is not supported by the server
            statusCode = 505;
            break;
        case 'VariantAlsoNegotiatesError': // 506 Variant Also Negotiates: The server has an internal configuration error
            statusCode = 506;
            break;
        case 'InsufficientStorageError': // 507 Insufficient Storage: The server is unable to store the representation needed to complete the request
            statusCode = 507;
            break;
        case 'LoopDetectedError': // 508 Loop Detected: The server detected an infinite loop while processing a request
            statusCode = 508;
            break;
        case 'NotExtendedError': // 510 Not Extended: Further extensions to the request are required for the server to fulfill it
            statusCode = 510;
            break;
        case 'NetworkAuthenticationRequiredError': // 511 Network Authentication Required: The client needs to authenticate to gain network access
            statusCode = 511;
            break;
        default:
            statusCode = err.status || 500; // Default to 500 if no status is set
    }
    // Set the response message
    const message = err.message || 'Internal Server Error';
    // Send the error response
    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack trace in production
    });
};
exports.default = errorHandler;
