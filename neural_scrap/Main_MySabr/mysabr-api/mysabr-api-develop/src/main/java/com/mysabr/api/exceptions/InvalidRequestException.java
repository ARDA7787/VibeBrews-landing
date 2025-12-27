package com.mysabr.api.exceptions;

import lombok.Getter;

@Getter
public class InvalidRequestException extends RuntimeException {
    private final ErrorCode errorCode;

    public InvalidRequestException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
  }
}
