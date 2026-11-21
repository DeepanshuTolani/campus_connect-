package com.campusconnect.service;

import com.campusconnect.entity.Job;
import com.campusconnect.entity.Student;
import org.springframework.stereotype.Service;

import java.util.Arrays;

/**
 * Central place for eligibility rules. The backend is the single source of truth
 * for eligibility -- the frontend may show hints, but every apply/eligible-jobs
 * request re-validates here so a student can never bypass criteria via the UI.
 */
@Service
public class EligibilityService {

    public boolean isEligible(Student student, Job job) {
        if (student == null || job == null) return false;

        if (job.getMinCgpa() != null) {
            if (student.getCgpa() == null || student.getCgpa() < job.getMinCgpa()) return false;
        }
        if (job.getMinTenthPercentage() != null) {
            if (student.getTenthPercentage() == null || student.getTenthPercentage() < job.getMinTenthPercentage())
                return false;
        }
        if (job.getMinTwelfthPercentage() != null) {
            if (student.getTwelfthPercentage() == null || student.getTwelfthPercentage() < job.getMinTwelfthPercentage())
                return false;
        }
        if (job.getEligibleBranches() != null && !job.getEligibleBranches().isBlank()) {
            if (student.getBranch() == null) return false;
            boolean branchMatches = Arrays.stream(job.getEligibleBranches().split(","))
                    .map(String::trim)
                    .anyMatch(b -> b.equalsIgnoreCase(student.getBranch().trim()));
            if (!branchMatches) return false;
        }
        return true;
    }
}
