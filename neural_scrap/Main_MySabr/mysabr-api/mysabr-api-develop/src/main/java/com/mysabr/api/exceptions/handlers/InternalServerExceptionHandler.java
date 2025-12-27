package com.mysabr.api.exceptions.handlers;

import com.mysabr.api.exceptions.records.ErrorResponse;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.slf4j.Slf4j;

import static com.mysabr.api.exceptions.ErrorCode.INTERNAL_SERVER_ERROR;

@Provider
@Slf4j
public class InternalServerExceptionHandler implements ExceptionMapper<Throwable> {


  @Context
  private UriInfo uriInfo;

  @Override
  public Response toResponse(Throwable exception) {
    log.error("InternalServerExceptionHandler -> Error: ", exception);
    return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
        .entity(
                new ErrorResponse(Response.Status.INTERNAL_SERVER_ERROR.getStatusCode(),
                        INTERNAL_SERVER_ERROR.getMessage(),
                        INTERNAL_SERVER_ERROR.getCode(),
                uriInfo.getPath(), null))
        .type(MediaType.APPLICATION_JSON)
        .build();
  }
}
