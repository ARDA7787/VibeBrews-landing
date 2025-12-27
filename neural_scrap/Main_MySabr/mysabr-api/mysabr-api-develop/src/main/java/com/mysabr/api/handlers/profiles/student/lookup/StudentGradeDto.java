package com.mysabr.api.handlers.profiles.student.lookup;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.beans.ConstructorProperties;
import java.util.UUID;

@Data
@NoArgsConstructor
public class StudentGradeDto {
    @JsonProperty("grade_id")
    private UUID gradeId;

    @JsonProperty("grade_name")
    private String gradeName;

    @ConstructorProperties({"gradeId", "gradeName"})
    public StudentGradeDto(UUID gradeId, String gradeName) {
        this.gradeId = gradeId;
        this.gradeName = gradeName;
    }
}

