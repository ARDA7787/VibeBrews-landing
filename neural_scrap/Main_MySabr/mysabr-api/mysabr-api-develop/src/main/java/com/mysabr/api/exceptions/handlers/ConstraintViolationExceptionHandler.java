package com.mysabr.api.exceptions.handlers;

import com.mysabr.api.exceptions.ErrorCode;
import com.mysabr.api.exceptions.records.ErrorResponse;
import com.mysabr.api.exceptions.records.FieldError;
import jakarta.validation.ConstraintViolationException;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Provider
@Slf4j
public class ConstraintViolationExceptionHandler implements
    ExceptionMapper<ConstraintViolationException> {

  @Context
  private UriInfo uriInfo;

  @Override
  public Response toResponse(ConstraintViolationException ex) {
    log.error("ConstraintViolationExceptionHandler -> Error ", ex);
    final List<FieldError> fieldErrors = ex.getConstraintViolations()
        .stream()
        .map(violation -> {
          String path = violation.getPropertyPath().toString();
          String[] parts = path.split("\\.");
          String field = parts[parts.length - 1];
          return new FieldError(field, violation.getMessage());
        })
        .toList();

    final ErrorResponse errorResponse = new ErrorResponse(
        Response.Status.BAD_REQUEST.getStatusCode(),
            ErrorCode.INVALID_REQUEST.getMessage(),
            ErrorCode.INVALID_REQUEST.getCode(),
        uriInfo.getPath(),
        fieldErrors
    );

    return Response.status(Response.Status.BAD_REQUEST)
        .entity(errorResponse)
        .type(MediaType.APPLICATION_JSON)
        .build();
  }
}
