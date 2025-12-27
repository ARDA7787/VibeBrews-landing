package com.mysabr.api.constants;


public class Constants {

  public static final String JWT_TOKEN_TYPE = "type";

  public static final String AUTHORIZATION = "Authorization";

  public static final int BCRYPT_COST = 12;

  public static final String USER_TYPE = "ut";

  public static final String AUTH_AT_COOKIE_NAME = "access_token";

  public static final String AUTH_AT_REMEMBER_ME_COOKIE_NAME = "remember_me_token";

  private Constants() {
    throw new AssertionError();
  }
}
