package com.mysabr.api.exceptions;

import lombok.Getter;

@Getter
public class TooManyRequestException extends RuntimeException {
    private final ErrorCode errorCode;

    public TooManyRequestException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
  }
}
