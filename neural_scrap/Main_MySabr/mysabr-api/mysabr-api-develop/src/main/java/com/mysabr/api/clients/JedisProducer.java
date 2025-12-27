package com.mysabr.api.clients;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.Produces;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import redis.clients.jedis.JedisPooled;

@ApplicationScoped
public class JedisProducer {

    @ConfigProperty(name = "redis.host")
    private String host;

    @ConfigProperty(name = "redis.port")
    private int port;

    @Produces
    @ApplicationScoped
    public JedisPooled jedis() {
        return new JedisPooled(host, port);
    }
}
