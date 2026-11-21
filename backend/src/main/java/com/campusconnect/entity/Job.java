package com.campusconnect.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "jobs")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private String title;

    @Column(length = 3000)
    private String description;

    private String location;

    @Column(name = "package_lpa")
    private Double packageLpa;

    // ---- Eligibility criteria ----
    @Column(name = "min_cgpa")
    private Double minCgpa;

    @Column(name = "min_tenth_percentage")
    private Double minTenthPercentage;

    @Column(name = "min_twelfth_percentage")
    private Double minTwelfthPercentage;

    @Column(name = "eligible_branches", length = 500)
    private String eligibleBranches; // comma separated, e.g. "CSE,IT,ECE"; empty/null = all branches

    private LocalDate deadline;

    @Builder.Default
    private Boolean active = true;

    @Builder.Default
    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Application> applications = new ArrayList<>();
}
