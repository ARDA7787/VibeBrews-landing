package com.mysabr.api.security.filters;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.mysabr.api.constants.Constants;
import com.mysabr.api.constants.RedisConstants;
import com.mysabr.api.constants.UserType;
import com.mysabr.api.exceptions.ErrorCode;
import com.mysabr.api.exceptions.UnauthorizedException;
import com.mysabr.api.security.context.UserContext;
import com.mysabr.api.utils.HashUtil;
import com.mysabr.api.utils.RedisUtil;
import jakarta.annotation.Priority;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Cookie;
import jakarta.ws.rs.ext.Provider;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import static com.mysabr.api.constants.Constants.AUTHORIZATION;
import static com.mysabr.api.constants.TokenType.ACCESS;
import static com.mysabr.api.constants.TokenType.REMEMBER_ME;
import static com.mysabr.api.constants.UserType.*;

@Provider
@Priority(Priorities.AUTHENTICATION)
@ApplicationScoped
public class AuthorizationBearerRequestFilter implements ContainerRequestFilter {

  private static final Logger log = LoggerFactory.getLogger(AuthorizationBearerRequestFilter.class);
  private static final String AUTH_HEADER_BEARER = "Bearer ";
  private static final List<String> VALID_USER_TYPES = List.of(STUDENT.getValue(),
          PARENT.getValue(), EDUCATOR.getValue(), SERVICE_PROVIDER.getValue());
    private static final Map<String, List<String>> ANONYMOUS_ACCESS = Map.ofEntries();
  private final RedisUtil redisUtil;
  private final UserContext userContext;
  private final String jwtSecret;
  private final String jwtIssuer;
  private final int jwtAccessTokenExpiresInHrs;
  private final int jwtRememberMeTokenExpiresInHrs;

  @Inject
  public AuthorizationBearerRequestFilter(
          RedisUtil redisUtil,
      UserContext userContext,
      @ConfigProperty(name = "app.jwt.secret") String jwtSecret,
      @ConfigProperty(name = "app.jwt.issuer") String jwtIssuer,
      @ConfigProperty(name = "app.jwt.access.token.expires.in.hrs") int jwtAccessTokenExpiresInHrs,
      @ConfigProperty(name = "app.jwt.remember.me.token.expires.in.hrs") int jwtRememberMeTokenExpiresInHrs
  ) {
    this.redisUtil = redisUtil;
    this.userContext = userContext;
    this.jwtSecret = jwtSecret;
    this.jwtIssuer = jwtIssuer;
    this.jwtAccessTokenExpiresInHrs = jwtAccessTokenExpiresInHrs;
    this.jwtRememberMeTokenExpiresInHrs = jwtRememberMeTokenExpiresInHrs;
  }

  @Override
  public void filter(ContainerRequestContext requestContext) {
    doAuthenticate(requestContext);
  }

  private void doAuthenticate(ContainerRequestContext requestContext) {
    final String path = requestContext.getUriInfo().getPath();
    final String method = requestContext.getMethod();
    if (isAnonymousAllowed(path, method)) {
      log.info("isAnonymousAllowed -> true");
      return;
    }
    final String token = this.validateAuthAndExtractToken(requestContext);
    try {
      DecodedJWT jwt = this.verifyToken(token);
      final String tokenType = jwt.getClaim(Constants.JWT_TOKEN_TYPE).asString();
      final String userType = jwt.getClaim(Constants.USER_TYPE).asString();
      final String userId = jwt.getSubject();
      this.validateUserType(userType);
        this.validateToken(token, userId, tokenType);
        userContext.setUserId(UUID.fromString(userId));
        userContext.setUserType(UserType.fromString(userType));
    } catch (Exception e) {
      log.error("doAuthenticate(...) -> Error: ", e);
      throw new UnauthorizedException(ErrorCode.INVALID_TOKEN);
    }
  }

  private DecodedJWT verifyToken(String token) {
    try {
      final Algorithm algorithm = Algorithm.HMAC256(jwtSecret);
      final JWTVerifier verifier = JWT.require(algorithm)
          .withIssuer(jwtIssuer)
          .build();
      final DecodedJWT jwt = verifier.verify(token);
      if (jwt == null) {
        throw new UnauthorizedException(ErrorCode.INVALID_TOKEN);
      }
      return jwt;
    } catch (TokenExpiredException e) {
      log.error(e.getMessage());
      throw new UnauthorizedException(ErrorCode.YOUR_TOKEN_HAS_EXPIRED);
    }
  }

  private String validateAuthAndExtractToken(ContainerRequestContext requestContext) {
    final String authHeader = requestContext.getHeaderString(AUTHORIZATION);
    final Cookie accessCookie = requestContext.getCookies().get(Constants.AUTH_AT_COOKIE_NAME);
    final Cookie rememberMeCookie = requestContext.getCookies().get(Constants.AUTH_AT_REMEMBER_ME_COOKIE_NAME);
    String accessToken = null;
    if (authHeader != null && authHeader.startsWith(AUTH_HEADER_BEARER)) {
      accessToken = authHeader.substring(AUTH_HEADER_BEARER.length());
      log.debug("Access token found in Authorization header.");
    } else if (accessCookie != null) {
      accessToken = accessCookie.getValue();
      log.debug("Access token found in cookie.");
    }else if (rememberMeCookie != null) {
      accessToken = rememberMeCookie.getValue();
      log.debug("Remember me token found in cookie.");
    }
    if (accessToken == null || accessToken.isEmpty()) {
      throw new UnauthorizedException(ErrorCode.MISSING_OR_INVALID_AUTH_HEADER_OR_TOKEN_NOT_FOUND_IN_COOKIE);
    }
    return accessToken;
  }

  private void validateUserType(String userType) {
    if (userType == null || !VALID_USER_TYPES.contains(userType)) {
      throw new UnauthorizedException(ErrorCode.INVALID_USER_TYPE);
    }
  }

    private void validateToken(String token, String userId, String tokenType) {
        if (!isTokenExist(HashUtil.toMD5(token), userId, tokenType)) {
      throw new UnauthorizedException(ErrorCode.INVALID_TOKEN);
    }
  }

  private boolean isTokenExist(String token, String userId, String tokenType) {
    String baseKey;
    if (tokenType.equals(ACCESS.name())){
      baseKey = RedisConstants.USER_ACCESS_TOKEN_BASE_KEY;
    }else {
      baseKey = RedisConstants.USER_REMEMBER_ME_TOKEN_BASE_KEY;
    }
    final String key = baseKey + userId + RedisConstants.TOKEN_DELIMITER + token;
    String storedUserId = redisUtil.get(key);
    log.debug("isTokenExist -> key: {} token: {} storedUserId: {}", key, token, storedUserId);
    if (storedUserId.equals(userId)) {
      if (tokenType.equals(ACCESS.name())) {
        redisUtil.set(key, jwtAccessTokenExpiresInHrs * 3600);
      } else if (tokenType.equals(REMEMBER_ME.name())) {
        redisUtil.set(key, jwtRememberMeTokenExpiresInHrs * 3600);
      }
      log.debug("Set ttl to redis is done");
      return true;
    }
    return false;
  }

  private boolean isAnonymousAllowed(String path, String method) {
    log.debug("path: {} method: {}", path, method);
    return ANONYMOUS_ACCESS.entrySet().stream()
        .anyMatch(entry -> path.startsWith(entry.getKey()) &&
            entry.getValue().contains(method.toUpperCase()));
  }
}
