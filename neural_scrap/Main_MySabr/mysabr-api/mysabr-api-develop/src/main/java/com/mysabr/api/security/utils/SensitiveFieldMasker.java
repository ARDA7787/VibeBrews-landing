package com.mysabr.api.security.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.util.Set;

public class SensitiveFieldMasker {

  private static final Set<String> SENSITIVE_FIELDS = Set.of(
      "password", "confirm_password", "old_password", "new_password", "token", "access_token",
      "refresh_token", "otp"
  );
  private static final ObjectMapper mapper = new ObjectMapper();

  private SensitiveFieldMasker() {
    throw new AssertionError();
  }

  public static String maskSensitiveFields(String json) {
    try {
      JsonNode root = mapper.readTree(json);
      maskRecursive(root);
      return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(root);
    } catch (Exception e) {
        return json;
    }
  }

  private static void maskRecursive(JsonNode node) {
    if (node.isObject()) {
      ObjectNode obj = (ObjectNode) node;
      obj.fieldNames().forEachRemaining(field -> {
        JsonNode child = obj.get(field);
        if (SENSITIVE_FIELDS.contains(field)) {
          obj.put(field, "***MASKED***");
        } else {
          maskRecursive(child);
        }
      });
    } else if (node.isArray()) {
      node.forEach(SensitiveFieldMasker::maskRecursive);
    }
  }
}
