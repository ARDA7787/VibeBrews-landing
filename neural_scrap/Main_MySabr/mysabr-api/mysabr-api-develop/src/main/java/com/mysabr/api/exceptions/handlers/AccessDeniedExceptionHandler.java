package com.mysabr.api.exceptions.handlers;

import com.mysabr.api.exceptions.AccessDeniedException;
import com.mysabr.api.exceptions.records.ErrorResponse;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;
import jakarta.ws.rs.core.UriInfo;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.slf4j.Slf4j;

@Provider
@Slf4j
public class AccessDeniedExceptionHandler implements ExceptionMapper<AccessDeniedException> {

  @Context
  private UriInfo uriInfo;

  @Override
  public Response toResponse(AccessDeniedException ex) {
    log.error("AccessDeniedExceptionHandler -> Error: ", ex);
    ErrorResponse error = new ErrorResponse(
        Status.FORBIDDEN.getStatusCode(),
            ex.getErrorCode().getMessage(),
            ex.getErrorCode().getCode(),
        uriInfo.getPath(),
        null
    );
    return Response.status(Response.Status.FORBIDDEN)
        .entity(error)
        .type(MediaType.APPLICATION_JSON)
        .build();
  }
}
