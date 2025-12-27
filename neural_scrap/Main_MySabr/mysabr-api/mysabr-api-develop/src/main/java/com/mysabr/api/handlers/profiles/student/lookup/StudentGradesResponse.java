package com.mysabr.api.handlers.profiles.student.lookup;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentGradesResponse {
    @JsonProperty("student_grades")
    private List<StudentGradeDto> studentGrades;
}

