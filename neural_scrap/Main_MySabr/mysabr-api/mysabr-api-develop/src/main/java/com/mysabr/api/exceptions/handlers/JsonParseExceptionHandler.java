package com.mysabr.api.exceptions.handlers;

import com.fasterxml.jackson.core.JsonParseException;
import com.mysabr.api.exceptions.records.ErrorResponse;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.slf4j.Slf4j;

import static com.mysabr.api.exceptions.ErrorCode.MALFORMED_JSON_REQUEST;

@Provider
@Slf4j
public class JsonParseExceptionHandler implements ExceptionMapper<JsonParseException> {

  @Context
  UriInfo uriInfo;

  @Override
  public Response toResponse(JsonParseException ex) {
    log.error("JsonParseExceptionHandler -> Error: ", ex);
    ErrorResponse error = new ErrorResponse(
        Response.Status.BAD_REQUEST.getStatusCode(),
            MALFORMED_JSON_REQUEST.getMessage(),
            MALFORMED_JSON_REQUEST.getCode(),
        uriInfo.getPath(),
        null
    );

    return Response.status(Response.Status.BAD_REQUEST)
        .entity(error)
        .type(MediaType.APPLICATION_JSON)
        .build();
  }
}
