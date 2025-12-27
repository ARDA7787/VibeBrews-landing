package com.mysabr.api.handlers.lookups.educatorroles;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@ApplicationScoped
@Slf4j
public class EducatorRolesLookupService {

    private final EducatorRoleLookupDao educatorRoleLookupDao;

    @Inject
    public EducatorRolesLookupService(EducatorRoleLookupDao educatorRoleLookupDao) {
        this.educatorRoleLookupDao = educatorRoleLookupDao;
    }

    public EducatorRolesResponse fetchAllActiveEducatorRoles() {
        log.debug("fetchAllActiveEducatorRoles(...) -> Method Execution Started.");

        List<EducatorRoleDto> roleDtos = educatorRoleLookupDao.fetchActiveEducatorRoles();
        log.debug("fetchAllActiveEducatorRoles(...) -> Fetched {} roles from database.", roleDtos.size());

        log.debug("fetchAllActiveEducatorRoles(...) -> Method Execution Completed.");
        return new EducatorRolesResponse(roleDtos);
    }
}


