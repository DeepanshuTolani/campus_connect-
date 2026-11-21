package com.campusconnect.service;

import com.campusconnect.dto.AuthRequest;
import com.campusconnect.dto.AuthResponse;
import com.campusconnect.dto.StudentRegisterRequest;
import com.campusconnect.entity.Admin;
import com.campusconnect.entity.Student;
import com.campusconnect.exception.BadRequestException;
import com.campusconnect.repository.AdminRepository;
import com.campusconnect.repository.StudentRepository;
import com.campusconnect.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final StudentRepository studentRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(StudentRepository studentRepository, AdminRepository adminRepository,
                        PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.studentRepository = studentRepository;
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse registerStudent(StudentRegisterRequest req) {
        if (studentRepository.existsByEmail(req.getEmail())) {
            throw new BadRequestException("An account with this email already exists");
        }
        Student student = Student.builder()
                .name(req.getName())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .branch(req.getBranch())
                .cgpa(req.getCgpa())
                .tenthPercentage(req.getTenthPercentage())
                .twelfthPercentage(req.getTwelfthPercentage())
                .skills(req.getSkills())
                .projects(req.getProjects())
                .phone(req.getPhone())
                .build();
        studentRepository.save(student);

        String token = jwtUtil.generateToken(student.getEmail(), "STUDENT", student.getId());
        return new AuthResponse(token, "STUDENT", student.getId(), student.getName());
    }

    public AuthResponse loginStudent(AuthRequest req) {
        Student student = studentRepository.findByEmail(req.getUsername())
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));

        if (!passwordEncoder.matches(req.getPassword(), student.getPassword())) {
            throw new BadRequestException("Invalid email or password");
        }
        String token = jwtUtil.generateToken(student.getEmail(), "STUDENT", student.getId());
        return new AuthResponse(token, "STUDENT", student.getId(), student.getName());
    }

    public AuthResponse loginAdmin(AuthRequest req) {
        Admin admin = adminRepository.findByUsername(req.getUsername())
                .orElseThrow(() -> new BadRequestException("Invalid username or password"));

        if (!passwordEncoder.matches(req.getPassword(), admin.getPassword())) {
            throw new BadRequestException("Invalid username or password");
        }
        String token = jwtUtil.generateToken(admin.getUsername(), "ADMIN", admin.getId());
        return new AuthResponse(token, "ADMIN", admin.getId(), admin.getName());
    }
}
