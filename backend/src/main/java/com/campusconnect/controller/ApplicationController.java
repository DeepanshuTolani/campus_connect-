package com.campusconnect.controller;

import com.campusconnect.dto.ApplicationDto;
import com.campusconnect.security.AuthenticatedUser;
import com.campusconnect.service.ApplicationService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/apply/{jobId}")
    public ApplicationDto apply(@AuthenticationPrincipal AuthenticatedUser user, @PathVariable Long jobId) {
        return applicationService.apply(user.id(), jobId);
    }

    @GetMapping("/my")
    public List<ApplicationDto> myApplications(@AuthenticationPrincipal AuthenticatedUser user) {
        return applicationService.getMyApplications(user.id());
    }
}
