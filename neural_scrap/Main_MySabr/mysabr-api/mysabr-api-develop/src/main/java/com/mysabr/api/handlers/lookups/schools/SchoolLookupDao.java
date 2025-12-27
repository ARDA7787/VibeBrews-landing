package com.mysabr.api.handlers.lookups.schools;

import org.jdbi.v3.sqlobject.config.RegisterConstructorMapper;
import org.jdbi.v3.sqlobject.statement.SqlQuery;

import java.util.List;

@RegisterConstructorMapper(SchoolLookup.class)
public interface SchoolLookupDao {

    String SELECT_SCHOOLS_BY_PREFIX = """
        SELECT
            school_id   AS schoolId,
            school_name AS schoolName,
            city        AS city,
            state       AS state
        FROM schools
        WHERE is_active = true
          AND lower(school_name) LIKE lower(:prefix)
        ORDER BY school_name ASC
        LIMIT 10
        """;

    @SqlQuery(SELECT_SCHOOLS_BY_PREFIX)
    List<SchoolLookup> findSchoolsByPrefix(String prefix);
}