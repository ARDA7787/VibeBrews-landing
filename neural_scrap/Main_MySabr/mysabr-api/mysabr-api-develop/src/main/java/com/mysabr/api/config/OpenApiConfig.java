package com.mysabr.api.config;

import org.eclipse.microprofile.openapi.annotations.OpenAPIDefinition;
import org.eclipse.microprofile.openapi.annotations.info.Info;

@OpenAPIDefinition(
        info = @Info(
                title = "mysabr-api",
                version = "1.0.0",
                description = "Mysabr Core API"
        )
)
public class OpenApiConfig {
    // Marker class for OpenAPI metadata
}

