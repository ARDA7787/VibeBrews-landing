package com.mysabr.api.constants;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

@Getter
public enum UserType {
    STUDENT("student"),
    PARENT("parent"),
    EDUCATOR("educator"),
    SERVICE_PROVIDER("service_provider");

    private final String value;

    UserType(String value) {
        this.value = value;
    }

    @JsonCreator
    public static UserType fromString(String value) {
        for (UserType ut : values()) {
            if (ut.value.equalsIgnoreCase(value)) {
                return ut;
            }
        }
        throw new IllegalArgumentException("Unknown user type: " + value);
    }

    @JsonValue
    @Override
    public String toString() {
        return value;
    }
}
