package com.mysabr.api.dbhelpers;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Produces;
import lombok.AllArgsConstructor;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.sqlobject.SqlObjectPlugin;

import javax.sql.DataSource;

@ApplicationScoped
@AllArgsConstructor
public class JdbiProducer {

  private DataSource dataSource;

  @Produces
  public Jdbi jdbi() {
    Jdbi jdbi = Jdbi.create(dataSource);
    jdbi.installPlugin(new SqlObjectPlugin());
    jdbi.registerArgument(new LocalDateArrayArgumentFactory());
    return jdbi;
  }

}
