package com.campusconnect.service;

import com.campusconnect.dto.StudentProfileDto;
import com.campusconnect.entity.Student;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.repository.StudentRepository;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student getById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
    }

    public StudentProfileDto getProfile(Long id) {
        return toDto(getById(id));
    }

    public StudentProfileDto updateProfile(Long id, StudentProfileDto dto) {
        Student student = getById(id);
        student.setName(dto.getName());
        student.setBranch(dto.getBranch());
        student.setCgpa(dto.getCgpa());
        student.setTenthPercentage(dto.getTenthPercentage());
        student.setTwelfthPercentage(dto.getTwelfthPercentage());
        student.setSkills(dto.getSkills());
        student.setProjects(dto.getProjects());
        student.setPhone(dto.getPhone());
        studentRepository.save(student);
        return toDto(student);
    }

    private StudentProfileDto toDto(Student s) {
        return new StudentProfileDto(s.getId(), s.getName(), s.getEmail(), s.getBranch(), s.getCgpa(),
                s.getTenthPercentage(), s.getTwelfthPercentage(), s.getSkills(), s.getProjects(), s.getPhone());
    }
}
