package com.mysabr.api.repositories;

import com.mysabr.api.entities.StudentGrade;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class StudentGradesRepository {

    @Inject
    EntityManager em;

    public StudentGrade findById(UUID id) {
        return em.find(StudentGrade.class, id);
    }

    public List<StudentGrade> findAll() {
        return em.createQuery("from StudentGrade", StudentGrade.class).getResultList();
    }

    public void persist(StudentGrade grade) {
        em.persist(grade);
    }
}
