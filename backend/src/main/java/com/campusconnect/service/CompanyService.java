package com.campusconnect.service;

import com.campusconnect.dto.CompanyDto;
import com.campusconnect.entity.Company;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public List<CompanyDto> getAll() {
        return companyRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public CompanyDto create(CompanyDto dto) {
        Company company = Company.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .website(dto.getWebsite())
                .industry(dto.getIndustry())
                .build();
        companyRepository.save(company);
        return toDto(company);
    }

    public CompanyDto update(Long id, CompanyDto dto) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));
        company.setName(dto.getName());
        company.setDescription(dto.getDescription());
        company.setWebsite(dto.getWebsite());
        company.setIndustry(dto.getIndustry());
        companyRepository.save(company);
        return toDto(company);
    }

    public void delete(Long id) {
        if (!companyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Company not found");
        }
        companyRepository.deleteById(id);
    }

    private CompanyDto toDto(Company c) {
        CompanyDto dto = new CompanyDto();
        dto.setId(c.getId());
        dto.setName(c.getName());
        dto.setDescription(c.getDescription());
        dto.setWebsite(c.getWebsite());
        dto.setIndustry(c.getIndustry());
        return dto;
    }
}
