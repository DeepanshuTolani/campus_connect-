package com.campusconnect.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CompanyDto {
    private Long id;

    @NotBlank
    private String name;

    private String description;
    private String website;
    private String industry;
}
