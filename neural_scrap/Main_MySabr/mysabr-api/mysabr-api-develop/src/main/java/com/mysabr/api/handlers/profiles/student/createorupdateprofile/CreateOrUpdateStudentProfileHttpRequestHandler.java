package com.mysabr.api.handlers.profiles.student.createorupdateprofile;

import io.netty.handler.codec.http.HttpResponseStatus;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/v1/students/profile")
@Consumes(MediaType.APPLICATION_JSON)
@AllArgsConstructor
@Tag(name = "Student Profiles", description = "Operations for managing student profiles")
public class CreateOrUpdateStudentProfileHttpRequestHandler {

    private final CreateOrUpdateStudentProfileService studentProfileService;

    @POST()
    @Operation(summary = "Create or Update Student Profile", description = "Create or update a student profile. Returns 204 No Content on successful creation or update.")
    @RequestBody(
            required = true,
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = CreateOrUpdateStudentProfileHttpRequest.class)
            )
    )
    @APIResponse(responseCode = "204", description = "Student profile created or updated successfully")
    @APIResponse(responseCode = "400", description = "Invalid request / validation failed")
    @APIResponse(responseCode = "500", description = "Internal server error")
    public Response createOrUpdateProfile(@Valid CreateOrUpdateStudentProfileHttpRequest request) {
        return handleCreateOrUpdateProfile(request);
    }

    private Response handleCreateOrUpdateProfile(CreateOrUpdateStudentProfileHttpRequest request) {
        studentProfileService.createOrUpdateProfile(request);
        return Response.status(HttpResponseStatus.NO_CONTENT.code())
                .build();
    }
}
