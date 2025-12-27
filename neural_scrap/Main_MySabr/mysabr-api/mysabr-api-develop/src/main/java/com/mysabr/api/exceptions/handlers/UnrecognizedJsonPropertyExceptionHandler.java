package com.mysabr.api.exceptions.handlers;

import com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException;
import com.mysabr.api.exceptions.records.ErrorResponse;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;
import jakarta.ws.rs.core.UriInfo;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.slf4j.Slf4j;

import static com.mysabr.api.exceptions.ErrorCode.INVALID_REQUEST_NOT_ABLE_TO_DESERIALIZE;

@Provider
@Slf4j
public class UnrecognizedJsonPropertyExceptionHandler implements
    ExceptionMapper<UnrecognizedPropertyException> {

  @Context
  private UriInfo uriInfo;

  @Override
  public Response toResponse(UnrecognizedPropertyException ex) {
    log.error("UnrecognizedJsonPropertyExceptionHandler -> Error ", ex);
    final ErrorResponse error = new ErrorResponse(
        Status.BAD_REQUEST.getStatusCode(),
            INVALID_REQUEST_NOT_ABLE_TO_DESERIALIZE.getMessage() + " field: "
            + ex.getPropertyName(),
            INVALID_REQUEST_NOT_ABLE_TO_DESERIALIZE.getCode(),
        uriInfo.getPath(),
        null
    );
    return Response.status(Status.BAD_REQUEST)
        .entity(error)
        .type(MediaType.APPLICATION_JSON)
        .build();
  }
}
