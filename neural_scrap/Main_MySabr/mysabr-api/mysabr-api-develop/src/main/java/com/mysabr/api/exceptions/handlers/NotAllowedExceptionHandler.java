package com.mysabr.api.exceptions.handlers;

import com.mysabr.api.exceptions.records.ErrorResponse;
import jakarta.ws.rs.NotAllowedException;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;
import jakarta.ws.rs.core.UriInfo;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.slf4j.Slf4j;

import static com.mysabr.api.exceptions.ErrorCode.INVALID_REQUEST_METHOD;

@Provider
@Slf4j
public class NotAllowedExceptionHandler implements ExceptionMapper<NotAllowedException> {

  @Context
  private UriInfo uriInfo;

  @Override
  public Response toResponse(NotAllowedException ex) {
    log.error("NotAllowedExceptionHandler -> Error ", ex);
    final ErrorResponse error = new ErrorResponse(
        Status.METHOD_NOT_ALLOWED.getStatusCode(),
            INVALID_REQUEST_METHOD.getMessage(),
            INVALID_REQUEST_METHOD.getCode(),
        uriInfo.getPath(),
        null
    );
    return Response.status(Response.Status.METHOD_NOT_ALLOWED)
        .entity(error)
        .type(MediaType.APPLICATION_JSON)
        .build();
  }
}
