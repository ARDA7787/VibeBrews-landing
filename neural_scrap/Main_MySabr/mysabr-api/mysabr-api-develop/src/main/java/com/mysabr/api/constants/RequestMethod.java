package com.mysabr.api.constants;

public enum RequestMethod {
  GET, POST, PUT, DELETE;

  public static RequestMethod from(String method) {
    return RequestMethod.valueOf(method.toUpperCase());
  }
}
