package com.mysabr.api.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "student_grades")
@Data
public class StudentGrade {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID) // requires Jakarta Persistence 3.1+
    @Column(name = "grade_id")
    private UUID gradeId;

    @Column(name = "grade_name", nullable = false, unique = true)
    private String gradeName;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
