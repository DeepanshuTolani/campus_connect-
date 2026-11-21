package com.campusconnect.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class StudentProfileDto {
    private Long id;
    private String name;
    private String email;
    private String branch;
    private Double cgpa;
    private Double tenthPercentage;
    private Double twelfthPercentage;
    private String skills;
    private String projects;
    private String phone;
}
