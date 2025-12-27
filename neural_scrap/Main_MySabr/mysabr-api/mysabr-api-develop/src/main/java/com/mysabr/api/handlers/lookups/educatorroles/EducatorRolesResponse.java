package com.mysabr.api.handlers.lookups.educatorroles;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EducatorRolesResponse {
    @JsonProperty("educator_roles")
    private List<EducatorRoleDto> educatorRoles;
}
