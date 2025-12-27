package com.mysabr.api.dbhelpers;

import org.jdbi.v3.core.argument.Argument;
import org.jdbi.v3.core.argument.ArgumentFactory;
import org.jdbi.v3.core.config.ConfigRegistry;
import org.postgresql.util.PGobject;

import java.lang.reflect.Type;
import java.sql.Types;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class LocalDateArrayArgumentFactory implements ArgumentFactory {

  @Override
  public Optional<Argument> build(Type type, Object value, ConfigRegistry config) {
    if (!(value instanceof List)) {
      return Optional.empty();
    }

    List<?> list = (List<?>) value;
    if (!list.stream().allMatch(i -> i instanceof LocalDate)) {
      return Optional.empty();
    }

    @SuppressWarnings("unchecked")
    List<LocalDate> localDates = (List<LocalDate>) value;
    String pgArray = localDates.stream()
        .map(ld -> "\"" + ld.toString() + "\"") // format as string literals
        .collect(Collectors.joining(",", "{", "}"));

    return Optional.of((position, statement, ctx) -> {
      PGobject pgObject = new PGobject();
      pgObject.setType("date[]");
      pgObject.setValue(pgArray);
      statement.setObject(position, pgObject, Types.OTHER);
    });
  }
}
