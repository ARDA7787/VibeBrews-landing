package com.mysabr.api.exceptions.handlers;

import com.mysabr.api.exceptions.UnauthorizedException;
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
public class UnauthorizedExceptionHandler implements ExceptionMapper<UnauthorizedException> {

  @Context
  private UriInfo uriInfo;

  @Override
  public Response toResponse(UnauthorizedException ex) {
    log.error("UnauthorizedExceptionHandler -> Error: ", ex);
    ErrorResponse error = new ErrorResponse(
        Response.Status.UNAUTHORIZED.getStatusCode(),
            ex.getErrorCode().getMessage(),
            ex.getErrorCode().getCode(),
        uriInfo.getPath(),
        null
    );
    return Response.status(Response.Status.UNAUTHORIZED)
        .entity(error)
        .type(MediaType.APPLICATION_JSON)
        .build();
  }
}
