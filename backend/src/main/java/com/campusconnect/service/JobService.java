package com.campusconnect.service;

import com.campusconnect.dto.JobDto;
import com.campusconnect.entity.Company;
import com.campusconnect.entity.Job;
import com.campusconnect.entity.Student;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.repository.ApplicationRepository;
import com.campusconnect.repository.CompanyRepository;
import com.campusconnect.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;
    private final ApplicationRepository applicationRepository;
    private final EligibilityService eligibilityService;
    private final StudentService studentService;

    public JobService(JobRepository jobRepository, CompanyRepository companyRepository,
                       ApplicationRepository applicationRepository, EligibilityService eligibilityService,
                       StudentService studentService) {
        this.jobRepository = jobRepository;
        this.companyRepository = companyRepository;
        this.applicationRepository = applicationRepository;
        this.eligibilityService = eligibilityService;
        this.studentService = studentService;
    }

    /** All active jobs, optionally filtered, annotated with eligibility for the given student. */
    public List<JobDto> searchJobsForStudent(Long studentId, String keyword, String location, Double minPackage,
                                              boolean onlyEligible) {
        Student student = studentService.getById(studentId);
        List<Job> jobs = jobRepository.searchJobs(blankToNull(keyword), blankToNull(location), minPackage);

        return jobs.stream()
                .map(job -> toDto(job, student))
                .filter(dto -> !onlyEligible || Boolean.TRUE.equals(dto.getEligibleForCurrentStudent()))
                .collect(Collectors.toList());
    }

    public JobDto getJobForStudent(Long jobId, Long studentId) {
        Job job = getJobEntity(jobId);
        Student student = studentService.getById(studentId);
        return toDto(job, student);
    }

    public List<JobDto> getAllJobsForAdmin() {
        return jobRepository.findAll().stream().map(this::toAdminDto).collect(Collectors.toList());
    }

    public JobDto createJob(JobDto dto) {
        Company company = companyRepository.findById(dto.getCompanyId())
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));

        Job job = Job.builder()
                .company(company)
                .title(dto.getTitle())
                .description(dto.getDescription())
                .location(dto.getLocation())
                .packageLpa(dto.getPackageLpa())
                .minCgpa(dto.getMinCgpa())
                .minTenthPercentage(dto.getMinTenthPercentage())
                .minTwelfthPercentage(dto.getMinTwelfthPercentage())
                .eligibleBranches(dto.getEligibleBranches())
                .deadline(dto.getDeadline())
                .active(dto.getActive() == null || dto.getActive())
                .build();
        jobRepository.save(job);
        return toAdminDto(job);
    }

    public JobDto updateJob(Long id, JobDto dto) {
        Job job = getJobEntity(id);
        if (dto.getCompanyId() != null && !dto.getCompanyId().equals(job.getCompany().getId())) {
            Company company = companyRepository.findById(dto.getCompanyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Company not found"));
            job.setCompany(company);
        }
        job.setTitle(dto.getTitle());
        job.setDescription(dto.getDescription());
        job.setLocation(dto.getLocation());
        job.setPackageLpa(dto.getPackageLpa());
        job.setMinCgpa(dto.getMinCgpa());
        job.setMinTenthPercentage(dto.getMinTenthPercentage());
        job.setMinTwelfthPercentage(dto.getMinTwelfthPercentage());
        job.setEligibleBranches(dto.getEligibleBranches());
        job.setDeadline(dto.getDeadline());
        if (dto.getActive() != null) job.setActive(dto.getActive());
        jobRepository.save(job);
        return toAdminDto(job);
    }

    public void deleteJob(Long id) {
        if (!jobRepository.existsById(id)) {
            throw new ResourceNotFoundException("Job not found");
        }
        jobRepository.deleteById(id);
    }

    public Job getJobEntity(Long id) {
        return jobRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Job not found"));
    }

    private JobDto toDto(Job job, Student student) {
        JobDto dto = baseDto(job);
        dto.setEligibleForCurrentStudent(eligibilityService.isEligible(student, job));
        return dto;
    }

    private JobDto toAdminDto(Job job) {
        JobDto dto = baseDto(job);
        dto.setApplicantCount(applicationRepository.countByJobId(job.getId()));
        return dto;
    }

    private JobDto baseDto(Job job) {
        JobDto dto = new JobDto();
        dto.setId(job.getId());
        dto.setCompanyId(job.getCompany().getId());
        dto.setCompanyName(job.getCompany().getName());
        dto.setTitle(job.getTitle());
        dto.setDescription(job.getDescription());
        dto.setLocation(job.getLocation());
        dto.setPackageLpa(job.getPackageLpa());
        dto.setMinCgpa(job.getMinCgpa());
        dto.setMinTenthPercentage(job.getMinTenthPercentage());
        dto.setMinTwelfthPercentage(job.getMinTwelfthPercentage());
        dto.setEligibleBranches(job.getEligibleBranches());
        dto.setDeadline(job.getDeadline());
        dto.setActive(job.getActive());
        return dto;
    }

    private String blankToNull(String s) {
        return (s == null || s.isBlank()) ? null : s;
    }
}
