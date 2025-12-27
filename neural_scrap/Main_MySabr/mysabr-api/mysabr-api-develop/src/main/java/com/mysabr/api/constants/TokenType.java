package com.mysabr.api.constants;

public enum TokenType {
  ACCESS, REFRESH, RESET_PASSWORD, REMEMBER_ME;

  public static TokenType from(String method) {
    return TokenType.valueOf(method.toUpperCase());
  }
}
