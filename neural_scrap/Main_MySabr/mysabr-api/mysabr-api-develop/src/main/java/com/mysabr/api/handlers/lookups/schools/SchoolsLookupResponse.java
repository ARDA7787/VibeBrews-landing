package com.mysabr.api.handlers.lookups.schools;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchoolsLookupResponse {
    @JsonProperty("schools")
    private List<SchoolLookup> schools;
    
    public List<SchoolLookup> getSchools() {
        return schools;
    }
    
    public void setSchools(List<SchoolLookup> schools) {
        this.schools = schools;
    }
}   