package com.mysabr.api.exceptions.handlers;

import com.mysabr.api.exceptions.records.ErrorResponse;
import jakarta.ws.rs.NotSupportedException;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;
import jakarta.ws.rs.core.UriInfo;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.slf4j.Slf4j;

import static com.mysabr.api.exceptions.ErrorCode.INVALID_REQUEST_CONTENT_TYPE;

@Provider
@Slf4j
public class NotSupportExceptionHandler implements ExceptionMapper<NotSupportedException> {

  @Context
  private UriInfo uriInfo;

  @Override
  public Response toResponse(NotSupportedException ex) {
    log.error("NotSupportExceptionHandler -> Error ", ex);
    final ErrorResponse error = new ErrorResponse(
        Status.BAD_REQUEST.getStatusCode(),
            INVALID_REQUEST_CONTENT_TYPE.getMessage(),
            INVALID_REQUEST_CONTENT_TYPE.getCode(),
        uriInfo.getPath(),
        null
    );

    return Response.status(Status.BAD_REQUEST)
        .entity(error)
        .type(MediaType.APPLICATION_JSON)
        .build();
  }
}
