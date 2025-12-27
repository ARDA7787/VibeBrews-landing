package com.mysabr.api.exceptions;

import lombok.Getter;

@Getter
public class InternalServerException extends RuntimeException {
  private final ErrorCode errorCode;

  public InternalServerException(ErrorCode errorCode) {
    super(errorCode.getMessage());
    this.errorCode = errorCode;
  }
}

