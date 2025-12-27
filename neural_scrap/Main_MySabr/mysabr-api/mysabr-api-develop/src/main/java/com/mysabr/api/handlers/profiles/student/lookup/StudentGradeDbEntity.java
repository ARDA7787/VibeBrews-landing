package com.mysabr.api.handlers.profiles.student.lookup;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentGradeDbEntity {
    private UUID gradeId;
    private String gradeName;
}

