package com.campusconnect.controller;

import com.campusconnect.dto.StudentProfileDto;
import com.campusconnect.security.AuthenticatedUser;
import com.campusconnect.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/profile")
    public StudentProfileDto getProfile(@AuthenticationPrincipal AuthenticatedUser user) {
        return studentService.getProfile(user.id());
    }

    @PutMapping("/profile")
    public StudentProfileDto updateProfile(@AuthenticationPrincipal AuthenticatedUser user,
                                            @Valid @RequestBody StudentProfileDto dto) {
        return studentService.updateProfile(user.id(), dto);
    }
}
