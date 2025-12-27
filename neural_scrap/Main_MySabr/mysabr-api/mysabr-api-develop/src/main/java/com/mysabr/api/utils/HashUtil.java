package com.mysabr.api.utils;

import com.mysabr.api.exceptions.ErrorCode;
import com.mysabr.api.exceptions.InternalServerException;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class HashUtil {

  private HashUtil() {
    throw new AssertionError();
  }

  public static String toMD5(String input) {
    try {
      MessageDigest md = MessageDigest.getInstance("MD5");
      byte[] hashBytes = md.digest(input.getBytes());
      StringBuilder sb = new StringBuilder();
      for (byte b : hashBytes) {
        sb.append(String.format("%02x", b));
      }
      return sb.toString();
    } catch (NoSuchAlgorithmException e) {
        throw new InternalServerException(ErrorCode.MD5_ALGO_NOT_FOUND);
    }
  }

}
