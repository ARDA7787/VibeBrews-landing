package com.mysabr.api.clients;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.Produces;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.eventbridge.EventBridgeClient;

import java.net.URI;

@ApplicationScoped
public class EventBridgeClientProducer {

  @ConfigProperty(name = "app.local.stack.enabled")
  private boolean isLocalStack;

  @ConfigProperty(name = "app.local.stack.endpoint")
  private String localStackEndpoint;

  @ConfigProperty(name = "app.local.stack.aws.credentials.accessKeyId")
  private String localStackAWSAccessKeyId;

  @ConfigProperty(name = "app.local.stack.aws.credentials.secretAccessKey")
  private String localStackAWSSecretAccessKey;

  @ConfigProperty(name = "aws.region")
  private String awsRegion;

  @Produces
  @ApplicationScoped
  public EventBridgeClient eventBridgeClient() {
    if (isLocalStack) {
      return EventBridgeClient.builder()
          .region(Region.of(awsRegion))
          .endpointOverride(URI.create(localStackEndpoint))
          .credentialsProvider(StaticCredentialsProvider.create(
              AwsBasicCredentials.create(localStackAWSAccessKeyId, localStackAWSSecretAccessKey)
          ))
          .build();
    }
    return EventBridgeClient.builder()
        .region(Region.of(awsRegion))
        .credentialsProvider(DefaultCredentialsProvider.create())
        .build();
  }
}
