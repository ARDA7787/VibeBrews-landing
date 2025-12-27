package com.mysabr.api.constants;

import lombok.Getter;

@Getter
public enum LoginMethod {
  EMAIL_PASSWORD("email_password");

  private final String method;

  LoginMethod(String method) {
    this.method = method;
  }

  public static LoginMethod fromString(String value) {
    for (LoginMethod lm : values()) {
      if (lm.method.equalsIgnoreCase(value)) {
        return lm;
      }
    }
    throw new IllegalArgumentException("Unknown login method: " + value);
  }

  @Override
  public String toString() {
    return method;
  }
}
