package com.campusconnect.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "students")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password; // BCrypt hashed

    private String branch;

    private Double cgpa;

    @Column(name = "tenth_percentage")
    private Double tenthPercentage;

    @Column(name = "twelfth_percentage")
    private Double twelfthPercentage;

    @Column(length = 1000)
    private String skills; // comma separated

    @Column(length = 2000)
    private String projects;

    private String phone;

    @Builder.Default
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Application> applications = new ArrayList<>();
}
