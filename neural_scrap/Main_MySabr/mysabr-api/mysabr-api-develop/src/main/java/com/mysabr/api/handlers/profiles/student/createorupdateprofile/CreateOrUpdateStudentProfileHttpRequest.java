package com.mysabr.api.handlers.profiles.student.createorupdateprofile;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class CreateOrUpdateStudentProfileHttpRequest {

    private String summary;
}
