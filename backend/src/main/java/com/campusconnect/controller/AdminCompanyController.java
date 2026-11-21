package com.campusconnect.controller;

import com.campusconnect.dto.CompanyDto;
import com.campusconnect.service.CompanyService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/companies")
public class AdminCompanyController {

    private final CompanyService companyService;

    public AdminCompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping
    public List<CompanyDto> getAll() {
        return companyService.getAll();
    }

    @PostMapping
    public CompanyDto create(@Valid @RequestBody CompanyDto dto) {
        return companyService.create(dto);
    }

    @PutMapping("/{id}")
    public CompanyDto update(@PathVariable Long id, @Valid @RequestBody CompanyDto dto) {
        return companyService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        companyService.delete(id);
    }
}
