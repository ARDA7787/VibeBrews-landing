package com.mysabr.api.services;

import com.mysabr.api.entities.StudentGrade;
import com.mysabr.api.repositories.StudentGradesRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;

@ApplicationScoped
public class StudentGradesService {

    @Inject
    StudentGradesRepository repo;

    public List<StudentGrade> getAllGrades() {
        return repo.findAll();
    }
    
    public void saveGrade(StudentGrade grade) {
        repo.persist(grade);
    }
}
