package com.campusconnect.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter @AllArgsConstructor
public class DashboardStatsDto {
    private long totalStudents;
    private long totalCompanies;
    private long totalJobs;
    private long totalApplications;
    private long selectedCount;
    private long shortlistedCount;
    private long interviewCount;
    private long rejectedCount;
}
