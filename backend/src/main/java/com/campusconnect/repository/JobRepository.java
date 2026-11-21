package com.campusconnect.repository;

import com.campusconnect.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    @Query("SELECT j FROM Job j WHERE j.active = true AND " +
           "(:keyword IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "  OR LOWER(j.company.name) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
           "(:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:minPackage IS NULL OR j.packageLpa >= :minPackage)")
    List<Job> searchJobs(@Param("keyword") String keyword,
                          @Param("location") String location,
                          @Param("minPackage") Double minPackage);

    List<Job> findByCompanyId(Long companyId);
}
