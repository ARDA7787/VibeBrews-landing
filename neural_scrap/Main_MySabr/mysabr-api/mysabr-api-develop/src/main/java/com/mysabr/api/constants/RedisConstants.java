package com.mysabr.api.constants;

public class RedisConstants {


  public static final String USER_ACCESS_TOKEN_BASE_KEY = "u:at:";
  public static final String USER_REFRESH_TOKEN_BASE_KEY = "u:rt:";
  public static final String USER_REMEMBER_ME_TOKEN_BASE_KEY = "u:rmt:";
  public static final String TOKEN_DELIMITER = ":";

  private RedisConstants() {
    throw new AssertionError();
  }

}
