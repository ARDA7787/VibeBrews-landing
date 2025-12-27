package com.mysabr.api.controllers;

import com.mysabr.api.entities.StudentGrade;
import com.mysabr.api.services.StudentGradesService;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.inject.Inject;

import java.util.List;

@Path("/v1/grades")
@Produces(MediaType.APPLICATION_JSON)
public class StudentGradesController {

    private final StudentGradesService gradeService;

    @Inject
    public StudentGradesController(StudentGradesService gradeService) {
        this.gradeService = gradeService;
    }

    @GET
    @Path("/studentgrades")
    public Response getAllGrades() {
        List<StudentGrade> grades = gradeService.getAllGrades();
        return Response.ok(grades).build();
    }
}
