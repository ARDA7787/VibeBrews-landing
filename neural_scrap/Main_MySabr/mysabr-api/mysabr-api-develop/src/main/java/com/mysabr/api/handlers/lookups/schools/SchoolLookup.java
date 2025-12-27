package com.mysabr.api.handlers.lookups.schools;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.beans.ConstructorProperties;
import java.util.UUID;

@Data
@NoArgsConstructor
public class SchoolLookup {
    
    @JsonProperty("school_id")
    private UUID schoolId;

    @JsonProperty("school_name")
    private String schoolName;

    @JsonProperty("city")
    private String city;

    @JsonProperty("state")
    private String state;

    @ConstructorProperties({"schoolId", "schoolName", "city", "state"})
    public SchoolLookup(UUID schoolId, String schoolName, String city, String state) {
        this.schoolId = schoolId;
        this.schoolName = schoolName;
        this.city = city;
        this.state = state;
    }
}
