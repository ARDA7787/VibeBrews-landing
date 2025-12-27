package com.mysabr.api.security.context;

import com.mysabr.api.constants.UserType;
import jakarta.enterprise.context.RequestScoped;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@RequestScoped
@Setter
@Getter
public class UserContext {

    private UUID userId;
    private UserType userType;
}
