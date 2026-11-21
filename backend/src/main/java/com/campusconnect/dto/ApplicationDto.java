package com.campusconnect.dto;

import com.campusconnect.entity.ApplicationStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class ApplicationDto {
    private Long id;
    private Long studentId;
    private String studentName;
    private String studentEmail;
    private Double studentCgpa;
    private Long jobId;
    private String jobTitle;
    private String companyName;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;
    private LocalDateTime updatedAt;
}
