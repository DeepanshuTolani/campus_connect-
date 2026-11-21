package com.campusconnect.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter
public class JobDto {
    private Long id;
    private Long companyId;
    private String companyName;
    private String title;
    private String description;
    private String location;
    private Double packageLpa;
    private Double minCgpa;
    private Double minTenthPercentage;
    private Double minTwelfthPercentage;
    private String eligibleBranches;
    private LocalDate deadline;
    private Boolean active;
    private Boolean eligibleForCurrentStudent; // populated only on student-facing endpoints
    private Long applicantCount; // populated only on admin-facing endpoints
}
