package com.mysabr.api.exceptions.handlers;

import com.mysabr.api.exceptions.InvalidRequestException;
import com.mysabr.api.exceptions.records.ErrorResponse;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.slf4j.Slf4j;

@Provider
@Slf4j
public class InvalidRequestExceptionHandler implements ExceptionMapper<InvalidRequestException> {

  @Context
  private UriInfo uriInfo;

  @Override
  public Response toResponse(InvalidRequestException ex) {
    log.error("InvalidRequestExceptionHandler -> Error ", ex);
    final ErrorResponse error = new ErrorResponse(
        Response.Status.BAD_REQUEST.getStatusCode(),
            ex.getErrorCode().getMessage(),
            ex.getErrorCode().getCode(),
        uriInfo.getPath(),
        null
    );
    return Response.status(Response.Status.BAD_REQUEST)
        .entity(error)
        .type(MediaType.APPLICATION_JSON)
        .build();
  }
}
