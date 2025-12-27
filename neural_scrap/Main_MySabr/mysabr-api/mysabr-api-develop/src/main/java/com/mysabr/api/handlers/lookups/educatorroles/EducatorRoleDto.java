package com.mysabr.api.handlers.lookups.educatorroles;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.beans.ConstructorProperties;
import java.util.UUID;

@Data
@NoArgsConstructor
public class EducatorRoleDto {
    @JsonProperty("role_id")
    private UUID roleId;

    @JsonProperty("role_name")
    private String roleName;

    @ConstructorProperties({"roleId", "roleName"})
    public EducatorRoleDto(UUID roleId, String roleName) {
        this.roleId = roleId;
        this.roleName = roleName;
    }
}
