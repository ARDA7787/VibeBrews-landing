package com.mysabr.api.utils;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import redis.clients.jedis.JedisPooled;
import redis.clients.jedis.params.ScanParams;
import redis.clients.jedis.resps.ScanResult;

import java.util.List;

@ApplicationScoped
public class RedisUtil {

    private final JedisPooled jedis;

    @Inject
    public RedisUtil(JedisPooled jedis) {
        this.jedis = jedis;
    }

    public void set(String key, int ttlSeconds) {
        jedis.expire(key, ttlSeconds);
    }

    public String get(String key) {
        return jedis.get(key);
    }

    public void delete(String key) {
        jedis.del(key);
    }

    public long deleteByPattern(String pattern) {
        String cursor = "0";
        long totalDeleted = 0;

        do {
            ScanResult<String> scanResult = jedis.scan(cursor, new ScanParams().match(pattern).count(100));
            List<String> keys = scanResult.getResult();
            if (!keys.isEmpty()) {
                try (var pipeline = jedis.pipelined()) {
                    for (String key : keys) {
                        pipeline.del(key);
                    }
                    pipeline.sync();
                }
                totalDeleted += keys.size();
            }
            cursor = scanResult.getCursor();
        } while (!cursor.equals("0"));

        return totalDeleted;
    }

}
