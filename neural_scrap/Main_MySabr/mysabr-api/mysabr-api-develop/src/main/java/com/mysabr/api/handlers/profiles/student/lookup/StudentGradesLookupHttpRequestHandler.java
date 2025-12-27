package com.mysabr.api.handlers.profiles.student.lookup;

import io.netty.handler.codec.http.HttpResponseStatus;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/v1/lookup/student-grades")
@Produces(MediaType.APPLICATION_JSON)
@AllArgsConstructor
@Slf4j
@Tag(name = "Lookup", description = "Lookup operations for retrieving reference data")
public class StudentGradesLookupHttpRequestHandler {

    private final StudentGradesLookupService studentGradesLookupService;

    @GET
    @Operation(
            summary = "Fetch Student Grades",
            description = "Retrieve the complete list of active student grades. Returns all grades with is_active = true."
    )
    @APIResponse(
            responseCode = "200",
            description = "Student grades retrieved successfully",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = StudentGradesResponse.class)
            )
    )
    @APIResponse(responseCode = "500", description = "Internal server error")
    public Response fetchStudentGrades() {
        log.debug("fetchStudentGrades() -> Endpoint invoked.");
        return handleFetchStudentGrades();
    }

    private Response handleFetchStudentGrades() {
        try {
            StudentGradesResponse response = studentGradesLookupService.fetchAllActiveStudentGrades();
            log.debug("fetchStudentGrades() -> Retrieved {} grades successfully.", response.getStudentGrades().size());
            return Response.status(HttpResponseStatus.OK.code())
                    .entity(response)
                    .build();
        } catch (Exception e) {
            log.error("fetchStudentGrades() -> Error occurred while fetching student grades.", e);
            return Response.status(HttpResponseStatus.INTERNAL_SERVER_ERROR.code())
                    .build();
        }
    }
}

