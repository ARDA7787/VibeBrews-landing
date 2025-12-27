package com.mysabr.api.exceptions;

import lombok.Getter;

@Getter
public enum ErrorCode {

    // Application related errors
    INVALID_USER_TYPE_OP("MSR-AC0001", "Invalid user type for this operation."),

    // Authorization Header related errors
    MISSING_OR_INVALID_AUTH_HEADER_OR_TOKEN_NOT_FOUND_IN_COOKIE("MSR-AH0006", "Missing or invalid Authorization header or access token not  found in cookie."),
    INVALID_TOKEN("MSR-AH0011", "Invalid Token."),
    YOUR_TOKEN_HAS_EXPIRED("MSR-AH0012", "Your token has expired. Please authenticate again to continue."),
    INVALID_REQUEST("MSR-AH0018", "Invalid Request."),
    MALFORMED_JSON_REQUEST("MSR-AH0019", "Malformed JSON request."),
    INVALID_REQUEST_METHOD("MSR-AH0020", "Invalid request. Please check the request method and try again."),
    INVALID_REQUEST_CONTENT_TYPE("MSR-AH0021", "Invalid request content type."),
    INVALID_REQUEST_NOT_ABLE_TO_DESERIALIZE("MSR-AH0022", "Invalid request payload, Not able to deserialize data provided."),
    MD5_ALGO_NOT_FOUND("MSR-AH0023", "MD5 algorithm not found"),
    INVALID_USER_TYPE("MSR-AH0027", "Invalid user type."),
    INTERNAL_SERVER_ERROR("DRE500", "Internal server error. Please try again later or contact support for assistance."),;

    private final String code;
    private final String message;

    ErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
