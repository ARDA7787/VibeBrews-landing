package com.mysabr.api.security.filters;

import com.mysabr.api.constants.Constants;
import com.mysabr.api.security.context.UserContext;
import com.mysabr.api.utils.CookieUtil;
import jakarta.annotation.Priority;
import jakarta.inject.Inject;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.core.Cookie;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Slf4j
@Provider
@Priority(Priorities.HEADER_DECORATOR)
public class AuthResponseFilter implements ContainerResponseFilter {

  @Inject
  private UserContext userContext;

  @ConfigProperty(name = "app.jwt.access.token.expires.in.hrs")
  private int jwtAccessTokenExpiresInHrs;

  @ConfigProperty(name = "app.jwt.remember.me.token.expires.in.hrs")
  private int jwtRememberMeTokenExpiresInHrs;


  @Override
  public void filter(ContainerRequestContext requestContext,
      ContainerResponseContext responseContext) {

    if (userContext.getUserId() != null) {
      final Cookie accessTokenCookie = requestContext.getCookies().get(Constants.AUTH_AT_COOKIE_NAME);

      if(accessTokenCookie != null){
        log.debug("access token found, extending cookie");
        String  accessToken = accessTokenCookie.getValue();

        String accessTokenCookieHeader = CookieUtil.buildSetCookieHeader(
            Constants.AUTH_AT_COOKIE_NAME,
            accessToken,
            jwtAccessTokenExpiresInHrs * 3600
        );
        responseContext.getHeaders().add(HttpHeaders.SET_COOKIE, accessTokenCookieHeader);
      }

      final Cookie rememberMeCookie = requestContext.getCookies().get(Constants.AUTH_AT_REMEMBER_ME_COOKIE_NAME);

      if(rememberMeCookie != null){
        log.debug("remember me token found, extending cookie");
        String  rememberMeToken = rememberMeCookie.getValue();

        String rememberMeTokenCookieHeader = CookieUtil.buildSetCookieHeader(
            Constants.AUTH_AT_REMEMBER_ME_COOKIE_NAME,
            rememberMeToken,
            jwtRememberMeTokenExpiresInHrs * 3600
        );
        responseContext.getHeaders().add(HttpHeaders.SET_COOKIE, rememberMeTokenCookieHeader);
      }

    }
  }
}
