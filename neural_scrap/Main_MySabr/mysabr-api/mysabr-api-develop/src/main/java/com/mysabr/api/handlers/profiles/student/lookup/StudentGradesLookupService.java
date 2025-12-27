package com.mysabr.api.handlers.profiles.student.lookup;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
@Slf4j
public class StudentGradesLookupService {

    private final StudentGradeDao studentGradeDao;

    @Inject
    public StudentGradesLookupService(StudentGradeDao studentGradeDao) {
        this.studentGradeDao = studentGradeDao;
    }

    public StudentGradesResponse fetchAllActiveStudentGrades() {
        log.debug("fetchAllActiveStudentGrades(...) -> Method Execution Started.");

        List<StudentGradeDto> gradeDtos = studentGradeDao.fetchActiveStudentGrades();
        log.debug("fetchAllActiveStudentGrades(...) -> Fetched {} grades from database.", gradeDtos.size());

        log.debug("fetchAllActiveStudentGrades(...) -> Method Execution Completed.");
        return new StudentGradesResponse(gradeDtos);
    }

    
}

