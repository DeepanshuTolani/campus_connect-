package com.campusconnect.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class StudentRegisterRequest {
    @NotBlank
    private String name;

    @NotBlank @Email
    private String email;

    @NotBlank @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    private String branch;
    private Double cgpa;
    private Double tenthPercentage;
    private Double twelfthPercentage;
    private String skills;
    private String projects;
    private String phone;
}
