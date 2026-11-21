package com.campusconnect.service;

import com.campusconnect.dto.DashboardStatsDto;
import com.campusconnect.entity.ApplicationStatus;
import com.campusconnect.repository.ApplicationRepository;
import com.campusconnect.repository.CompanyRepository;
import com.campusconnect.repository.JobRepository;
import com.campusconnect.repository.StudentRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final StudentRepository studentRepository;
    private final CompanyRepository companyRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    public DashboardService(StudentRepository studentRepository, CompanyRepository companyRepository,
                             JobRepository jobRepository, ApplicationRepository applicationRepository) {
        this.studentRepository = studentRepository;
        this.companyRepository = companyRepository;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    public DashboardStatsDto getStats() {
        long totalStudents = studentRepository.count();
        long totalCompanies = companyRepository.count();
        long totalJobs = jobRepository.count();
        var allApplications = applicationRepository.findAll();
        long totalApplications = allApplications.size();

        long selected = allApplications.stream().filter(a -> a.getStatus() == ApplicationStatus.SELECTED).count();
        long shortlisted = allApplications.stream().filter(a -> a.getStatus() == ApplicationStatus.SHORTLISTED).count();
        long interview = allApplications.stream().filter(a -> a.getStatus() == ApplicationStatus.INTERVIEW).count();
        long rejected = allApplications.stream().filter(a -> a.getStatus() == ApplicationStatus.REJECTED).count();

        return new DashboardStatsDto(totalStudents, totalCompanies, totalJobs, totalApplications,
                selected, shortlisted, interview, rejected);
    }
}
