package com.mysabr.api.exceptions.records;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ErrorResponse(int status, String message, String code, String path, List<FieldError> errors) {

}

