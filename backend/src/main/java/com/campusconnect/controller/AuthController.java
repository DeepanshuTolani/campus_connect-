package com.campusconnect.controller;

import com.campusconnect.dto.AuthRequest;
import com.campusconnect.dto.AuthResponse;
import com.campusconnect.dto.StudentRegisterRequest;
import com.campusconnect.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/student/register")
    public AuthResponse registerStudent(@Valid @RequestBody StudentRegisterRequest request) {
        return authService.registerStudent(request);
    }

    @PostMapping("/student/login")
    public AuthResponse loginStudent(@Valid @RequestBody AuthRequest request) {
        return authService.loginStudent(request);
    }

    @PostMapping("/admin/login")
    public AuthResponse loginAdmin(@Valid @RequestBody AuthRequest request) {
        return authService.loginAdmin(request);
    }
}
