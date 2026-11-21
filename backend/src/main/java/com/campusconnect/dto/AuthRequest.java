package com.campusconnect.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class AuthRequest {
    @NotBlank
    private String username; // email for student, username for admin

    @NotBlank
    private String password;
}
