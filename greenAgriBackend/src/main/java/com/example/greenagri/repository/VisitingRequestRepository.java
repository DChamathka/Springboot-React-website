package com.example.greenagri.repository;

import com.example.greenagri.model.VistingRequests;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VisitingRequestRepository extends JpaRepository<VistingRequests, Long> {
    Optional<VistingRequests> findById(Long id);
}
