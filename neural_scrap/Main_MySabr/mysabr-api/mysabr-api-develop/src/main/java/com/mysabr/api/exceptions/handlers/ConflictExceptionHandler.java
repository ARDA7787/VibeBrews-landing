package com.mysabr.api.exceptions.handlers;

import com.mysabr.api.exceptions.ConflictException;
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
public class ConflictExceptionHandler implements ExceptionMapper<ConflictException> {

  @Context
  private UriInfo uriInfo;

  @Override
  public Response toResponse(ConflictException ex) {
    log.error("ConflictExceptionHandler -> Error ", ex);
    final ErrorResponse error = new ErrorResponse(
        Response.Status.CONFLICT.getStatusCode(),
            ex.getErrorCode().getMessage(),
            ex.getErrorCode().getCode(),
        uriInfo.getPath(),
        null
    );

    return Response.status(Response.Status.CONFLICT)
        .entity(error)
        .type(MediaType.APPLICATION_JSON)
        .build();
  }
}
