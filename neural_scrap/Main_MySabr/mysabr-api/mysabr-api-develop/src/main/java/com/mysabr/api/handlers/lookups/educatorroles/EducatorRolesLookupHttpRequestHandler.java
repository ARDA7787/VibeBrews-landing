package com.mysabr.api.handlers.lookups.educatorroles;

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

@Path("/v1/lookup/educator-roles")
@Produces(MediaType.APPLICATION_JSON)
@AllArgsConstructor
@Slf4j
@Tag(name = "Lookup", description = "Lookup operations for retrieving reference data")
public class EducatorRolesLookupHttpRequestHandler {

    private final EducatorRolesLookupService educatorRolesLookupService;

    @GET
    @Operation(
            summary = "Fetch Educator Roles",
            description = "Retrieve the complete list of active educator roles. Returns all roles with is_active = true."
    )
    @APIResponse(
            responseCode = "200",
            description = "Educator roles retrieved successfully",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = EducatorRolesResponse.class)
            )
    )
    @APIResponse(responseCode = "500", description = "Internal server error")
    public Response fetchEducatorRoles() {
        log.debug("fetchEducatorRoles() -> Endpoint invoked.");
        return handleFetchEducatorRoles();
    }

    private Response handleFetchEducatorRoles() {
        try {
            EducatorRolesResponse response = educatorRolesLookupService.fetchAllActiveEducatorRoles();
            log.debug("fetchEducatorRoles() -> Retrieved {} roles successfully.", response.getEducatorRoles().size());
            return Response.status(HttpResponseStatus.OK.code())
                    .entity(response)
                    .build();
        } catch (Exception e) {
            log.error("fetchEducatorRoles() -> Error occurred while fetching educator roles.", e);
            return Response.status(HttpResponseStatus.INTERNAL_SERVER_ERROR.code())
                    .build();
        }
    }
}


