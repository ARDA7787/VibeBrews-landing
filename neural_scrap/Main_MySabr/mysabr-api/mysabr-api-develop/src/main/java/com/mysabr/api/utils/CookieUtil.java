package com.mysabr.api.utils;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class CookieUtil {

  private static final String DEFAULT_PATH = "/";
  private static final String DEFAULT_SAME_SITE = "None";

  private CookieUtil() {
    throw new AssertionError();
  }


  public static String buildSetCookieHeader(String name, String value, int maxAgeSeconds) {
    StringBuilder sb = new StringBuilder();
    sb.append(name).append("=");
    if (value != null) {
      sb.append(value);
    }
    sb.append("; Path=").append(DEFAULT_PATH);
    if (maxAgeSeconds >= 0) {
      sb.append("; Max-Age=").append(maxAgeSeconds);
      ZonedDateTime expires = ZonedDateTime.now(ZoneOffset.UTC).plusSeconds(maxAgeSeconds);
      sb.append("; Expires=")
          .append(expires.format(DateTimeFormatter.RFC_1123_DATE_TIME));
    }
    sb.append("; Secure");
    sb.append("; HttpOnly");
    sb.append("; SameSite=").append(DEFAULT_SAME_SITE);
    return sb.toString();
  }

}
