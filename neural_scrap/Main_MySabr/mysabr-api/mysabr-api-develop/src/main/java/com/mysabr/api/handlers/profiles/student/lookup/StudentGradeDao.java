package com.mysabr.api.handlers.profiles.student.lookup;

import org.jdbi.v3.sqlobject.config.RegisterConstructorMapper;
import org.jdbi.v3.sqlobject.statement.SqlQuery;

import java.util.List;

@RegisterConstructorMapper(StudentGradeDto.class)
public interface StudentGradeDao {

    String SELECT_ACTIVE_STUDENT_GRADES = """
        SELECT
            grade_id   AS gradeId,
            grade_name AS gradeName
        FROM student_grades
        WHERE is_active = true
        ORDER BY grade_name ASC
        """;

    @SqlQuery(SELECT_ACTIVE_STUDENT_GRADES)
    List<StudentGradeDto> fetchActiveStudentGrades();
}
