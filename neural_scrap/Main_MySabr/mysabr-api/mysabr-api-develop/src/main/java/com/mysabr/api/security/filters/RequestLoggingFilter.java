package com.mysabr.api.security.filters;

import com.mysabr.api.security.context.UserContext;
import com.mysabr.api.security.utils.SensitiveFieldMasker;
import jakarta.annotation.Priority;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.ext.Provider;
import org.jboss.logging.Logger;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Provider
@Priority(Priorities.USER)
@ApplicationScoped
public class RequestLoggingFilter implements ContainerRequestFilter, ContainerResponseFilter {

  private static final Logger LOG = Logger.getLogger(RequestLoggingFilter.class);
  private static final String START_TIME = "request-start-time";

  private final UserContext userContext;

  @Inject
  public RequestLoggingFilter(UserContext userContext) {
    this.userContext = userContext;
  }

  @Override
  public void filter(ContainerRequestContext requestContext) throws IOException {
    requestContext.setProperty(START_TIME, System.currentTimeMillis());

    String method = requestContext.getMethod();
    String path = requestContext.getUriInfo().getRequestUri().toString();
    String queryParams = requestContext.getUriInfo().getQueryParameters().toString();

    LOG.infof("%s %s", method, path);
    if (!queryParams.isEmpty()) {
      LOG.infof("Query Params: %s", queryParams);
    }

    if (requestContext.hasEntity()) {
      InputStream entityStream = requestContext.getEntityStream();
      byte[] bytes = entityStream.readAllBytes();
      String body = new String(bytes, StandardCharsets.UTF_8);
      String maskedBody = SensitiveFieldMasker.maskSensitiveFields(body);
      LOG.infof("Request Body: %s", maskedBody);
      requestContext.setEntityStream(new ByteArrayInputStream(bytes));
    }
  }

  @Override
  public void filter(ContainerRequestContext requestContext,
      ContainerResponseContext responseContext) {
    Object startTimeObj = requestContext.getProperty(START_TIME);
    long durationMs = -1;

    if (startTimeObj instanceof Long) {
      durationMs = System.currentTimeMillis() - ((Long) startTimeObj).longValue();
    }

      UUID userId = userContext.getUserId();
    int status = responseContext.getStatus();

    LOG.infof("Completed %s %s | User: %s | Status: %d | Time: %s",
        requestContext.getMethod(),
        requestContext.getUriInfo().getPath(),
        userId != null ? userId : "anonymous",
        status,
        durationMs != -1 ? durationMs + "ms" : "unknown");
  }
}
