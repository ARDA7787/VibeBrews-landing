package com.mysabr.api.handlers.lookups.educatorroles;

import org.jdbi.v3.sqlobject.config.RegisterConstructorMapper;
import org.jdbi.v3.sqlobject.statement.SqlQuery;

import java.util.List;

@RegisterConstructorMapper(EducatorRoleDto.class)
public interface EducatorRoleLookupDao {

    String SELECT_ACTIVE_EDUCATOR_ROLES = """
        SELECT
            role_id   AS roleId,
            role_name AS roleName
        FROM educator_roles
        WHERE is_active = true
        ORDER BY role_name ASC
        """;

    @SqlQuery(SELECT_ACTIVE_EDUCATOR_ROLES)
    List<EducatorRoleDto> fetchActiveEducatorRoles();
}


