package com.campusconnect.controller;

import com.campusconnect.dto.JobDto;
import com.campusconnect.service.JobService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/jobs")
public class AdminJobController {

    private final JobService jobService;

    public AdminJobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public List<JobDto> getAll() {
        return jobService.getAllJobsForAdmin();
    }

    @PostMapping
    public JobDto create(@RequestBody JobDto dto) {
        return jobService.createJob(dto);
    }

    @PutMapping("/{id}")
    public JobDto update(@PathVariable Long id, @RequestBody JobDto dto) {
        return jobService.updateJob(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        jobService.deleteJob(id);
    }
}
