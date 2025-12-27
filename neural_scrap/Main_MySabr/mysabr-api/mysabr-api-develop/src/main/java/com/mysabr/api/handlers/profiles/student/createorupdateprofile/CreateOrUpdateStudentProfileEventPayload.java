package com.mysabr.api.handlers.profiles.student.createorupdateprofile;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Builder
@Setter
@Getter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class CreateOrUpdateStudentProfileEventPayload {
    private UUID id;
    private String summary;
}
