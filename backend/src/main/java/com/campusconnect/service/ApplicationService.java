package com.campusconnect.service;

import com.campusconnect.dto.ApplicationDto;
import com.campusconnect.entity.Application;
import com.campusconnect.entity.ApplicationStatus;
import com.campusconnect.entity.Job;
import com.campusconnect.entity.Student;
import com.campusconnect.exception.BadRequestException;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final StudentService studentService;
    private final JobService jobService;
    private final EligibilityService eligibilityService;

    public ApplicationService(ApplicationRepository applicationRepository, StudentService studentService,
                               JobService jobService, EligibilityService eligibilityService) {
        this.applicationRepository = applicationRepository;
        this.studentService = studentService;
        this.jobService = jobService;
        this.eligibilityService = eligibilityService;
    }

    public ApplicationDto apply(Long studentId, Long jobId) {
        Student student = studentService.getById(studentId);
        Job job = jobService.getJobEntity(jobId);

        if (!Boolean.TRUE.equals(job.getActive())) {
            throw new BadRequestException("This job is no longer accepting applications");
        }
        if (applicationRepository.existsByStudentIdAndJobId(studentId, jobId)) {
            throw new BadRequestException("You have already applied for this job");
        }
        // Backend re-validates eligibility -- never trust the frontend's eligibility flag.
        if (!eligibilityService.isEligible(student, job)) {
            throw new BadRequestException("You do not meet the eligibility criteria for this job");
        }

        Application application = Application.builder()
                .student(student)
                .job(job)
                .status(ApplicationStatus.APPLIED)
                .appliedAt(LocalDateTime.now())
                .build();
        applicationRepository.save(application);
        return toDto(application);
    }

    public List<ApplicationDto> getMyApplications(Long studentId) {
        return applicationRepository.findByStudentId(studentId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<ApplicationDto> getApplicantsForJob(Long jobId) {
        return applicationRepository.findByJobId(jobId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public ApplicationDto updateStatus(Long applicationId, ApplicationStatus status) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));
        application.setStatus(status);
        application.setUpdatedAt(LocalDateTime.now());
        applicationRepository.save(application);
        return toDto(application);
    }

    private ApplicationDto toDto(Application a) {
        ApplicationDto dto = new ApplicationDto();
        dto.setId(a.getId());
        dto.setStudentId(a.getStudent().getId());
        dto.setStudentName(a.getStudent().getName());
        dto.setStudentEmail(a.getStudent().getEmail());
        dto.setStudentCgpa(a.getStudent().getCgpa());
        dto.setJobId(a.getJob().getId());
        dto.setJobTitle(a.getJob().getTitle());
        dto.setCompanyName(a.getJob().getCompany().getName());
        dto.setStatus(a.getStatus());
        dto.setAppliedAt(a.getAppliedAt());
        dto.setUpdatedAt(a.getUpdatedAt());
        return dto;
    }
}
