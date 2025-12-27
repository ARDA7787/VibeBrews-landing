package com.mysabr.api.handlers.profiles.student.createorupdateprofile;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Builder
public class CreateOrUpdateStudentProfileDbEntity {
    private UUID id;
    private String summary;
}
