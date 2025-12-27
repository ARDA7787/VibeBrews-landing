package com.mysabr.api.handlers.lookups.schools;

import io.netty.handler.codec.http.HttpResponseStatus;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.jboss.logging.Logger;

@Path("/v1/lookups/schools")
@Produces(MediaType.APPLICATION_JSON)
@Tag(name = "Lookup", description = "Lookup operations for retrieving reference data")
public class SchoolsLookupHttpRequestHandler {

    private static final Logger LOG = Logger.getLogger(SchoolsLookupHttpRequestHandler.class);

    @Inject
    private SchoolsLookupService schoolsLookupService;

    @GET
    @Operation(
            summary = "Lookup Schools",
            description = "Retrieve up to 10 school names that start with the provided query string (minimum 2 characters). Matching is case-insensitive."
    )
    @APIResponse(
            responseCode = "200",
            description = "Schools retrieved successfully",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = SchoolsLookupResponse.class)
            )
    )
    @APIResponse(responseCode = "400", description = "Query parameter is missing or too short (minimum 2 characters)")
    @APIResponse(responseCode = "500", description = "Internal server error")
    public Response lookupSchools(@QueryParam("query") String query) {
        LOG.debug("lookupSchools() -> Endpoint invoked with query: " + query);
        return handleLookupSchools(query);
    }

    private Response handleLookupSchools(String query) {
        try {
            SchoolsLookupResponse response = schoolsLookupService.lookupSchools(query);
            LOG.debug("lookupSchools() -> Successfully retrieved " + response.getSchools().size() + " schools.");
            return Response.status(HttpResponseStatus.OK.code())
                    .entity(response)
                    .build();
        } catch (Exception e) {
            LOG.error("lookupSchools() -> Error occurred while looking up schools with query: " + query, e);
            return Response.status(HttpResponseStatus.INTERNAL_SERVER_ERROR.code())
                    .build();
        }
    }
}
