package com.mysabr.api.exceptions.handlers;

import com.mysabr.api.exceptions.NotFoundException;
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
public class NotFoundExceptionHandler implements ExceptionMapper<NotFoundException> {

  @Context
  private UriInfo uriInfo;

  @Override
  public Response toResponse(NotFoundException ex) {
    log.error("NotFoundExceptionHandler -> Error ", ex);
    final ErrorResponse error = new ErrorResponse(
        Status.NOT_FOUND.getStatusCode(),
            ex.getErrorCode().getMessage(),
            ex.getErrorCode().getCode(),
        uriInfo.getPath(),
        null
    );

    return Response.status(Status.NOT_FOUND)
        .entity(error)
        .type(MediaType.APPLICATION_JSON)
        .build();
  }
}
