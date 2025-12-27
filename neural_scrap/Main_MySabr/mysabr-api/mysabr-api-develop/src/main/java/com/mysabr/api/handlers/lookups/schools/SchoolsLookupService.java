package com.mysabr.api.handlers.lookups.schools;

import com.mysabr.api.exceptions.ErrorCode;
import com.mysabr.api.exceptions.InvalidRequestException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;
import lombok.extern.slf4j.Slf4j;

@ApplicationScoped
@Slf4j
public class SchoolsLookupService {

    private final SchoolLookupDao schoolLookupDao;

    @Inject
    public SchoolsLookupService(SchoolLookupDao schoolLookupDao) {
        this.schoolLookupDao = schoolLookupDao;
    }

    public SchoolsLookupResponse lookupSchools(String query) {
        log.debug("lookupSchools(...) -> Method Execution Started. query={}", query);

        validateQuery(query);
        
        String prefix = query.trim() + "%";
        List<SchoolLookup> schools = schoolLookupDao.findSchoolsByPrefix(prefix);
        
        log.debug("lookupSchools(...) -> Found {} schools for query='{}'", schools.size(), query);
        log.debug("lookupSchools(...) -> Method Execution Completed.");
        
        return createResponse(schools);
    }
    
    private SchoolsLookupResponse createResponse(List<SchoolLookup> schools) {
        SchoolsLookupResponse response = new SchoolsLookupResponse();
        response.setSchools(schools);
        return response;
    }

    private void validateQuery(String query) {
        if (query == null || query.trim().length() < 2) {
            log.warn("lookupSchools(...) -> Invalid query: '{}'", query);
            throw new InvalidRequestException(ErrorCode.INVALID_REQUEST);
        }
    }
}