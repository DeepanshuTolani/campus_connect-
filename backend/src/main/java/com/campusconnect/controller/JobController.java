package com.campusconnect.controller;

import com.campusconnect.dto.JobDto;
import com.campusconnect.security.AuthenticatedUser;
import com.campusconnect.service.JobService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Job browsing endpoints available to logged-in students (and admins, read-only).
 * Search/filter + eligibility flag are computed server-side.
 */
@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public List<JobDto> browseJobs(@AuthenticationPrincipal AuthenticatedUser user,
                                    @RequestParam(required = false) String keyword,
                                    @RequestParam(required = false) String location,
                                    @RequestParam(required = false) Double minPackage,
                                    @RequestParam(defaultValue = "false") boolean onlyEligible) {
        return jobService.searchJobsForStudent(user.id(), keyword, location, minPackage, onlyEligible);
    }

    @GetMapping("/{id}")
    public JobDto getJob(@AuthenticationPrincipal AuthenticatedUser user, @PathVariable Long id) {
        return jobService.getJobForStudent(id, user.id());
    }
}
