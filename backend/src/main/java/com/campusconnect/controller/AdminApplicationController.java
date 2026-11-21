package com.campusconnect.controller;

import com.campusconnect.dto.ApplicationDto;
import com.campusconnect.dto.StatusUpdateRequest;
import com.campusconnect.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/applications")
public class AdminApplicationController {

    private final ApplicationService applicationService;

    public AdminApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping("/job/{jobId}")
    public List<ApplicationDto> getApplicantsForJob(@PathVariable Long jobId) {
        return applicationService.getApplicantsForJob(jobId);
    }

    @PutMapping("/{id}/status")
    public ApplicationDto updateStatus(@PathVariable Long id, @Valid @RequestBody StatusUpdateRequest request) {
        return applicationService.updateStatus(id, request.getStatus());
    }
}
