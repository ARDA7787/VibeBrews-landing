package com.mysabr.api.exceptions.handlers;

import com.mysabr.api.exceptions.TooManyRequestException;
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
public class TooManyRequestExceptionHandler implements ExceptionMapper<TooManyRequestException> {

  @Context
  private UriInfo uriInfo;

  @Override
  public Response toResponse(TooManyRequestException ex) {
    log.error("TooManyRequestExceptionHandler -> Error: ", ex);
    ErrorResponse error = new ErrorResponse(
        Status.TOO_MANY_REQUESTS.getStatusCode(),
            ex.getErrorCode().getMessage(),
            ex.getErrorCode().getCode(),
        uriInfo.getPath(),
        null
    );
    return Response.status(Response.Status.TOO_MANY_REQUESTS)
        .entity(error)
        .type(MediaType.APPLICATION_JSON)
        .build();
  }
}
