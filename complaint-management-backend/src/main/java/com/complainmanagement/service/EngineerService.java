package com.complainmanagement.service;

import com.complainmanagement.dto.*;
import com.complainmanagement.entity.Complain;
import com.complainmanagement.entity.Engineer;
import com.complainmanagement.exception.BadRequestException;
import com.complainmanagement.exception.ResourceNotFoundException;
import com.complainmanagement.repository.ComplainRepository;
import com.complainmanagement.repository.EngineerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EngineerService {

    private final EngineerRepository engineerRepository;
    private final ComplainRepository complainRepository;

    public EngineerService(EngineerRepository engineerRepository, ComplainRepository complainRepository) {
        this.engineerRepository = engineerRepository;
        this.complainRepository = complainRepository;
    }

    public ApiResponse login(LoginRequest request) {
        return engineerRepository.findByEmailAndPassword(request.getUsername(), request.getPassword())
                .map(eng -> new ApiResponse(true, "Login Successful", eng.getEmail()))
                .orElse(new ApiResponse(false, "No engineer exists with these details"));
    }

    public List<Complain> getAssignedComplaints(String email) {
        return complainRepository.findActiveAssignedComplaints(email);
    }

    public List<Complain> getAttemptedComplaints(String email) {
        return complainRepository.findFixedComplaintsByEngineer(email);
    }

    public ApiResponse updateStatus(UpdateStatusRequest request) {
        Complain complain = complainRepository.findById(request.getComplainId())
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found with ID: " + request.getComplainId()));

        complain.setStatus(request.getStatus());
        complainRepository.save(complain);
        return new ApiResponse(true, "Status updated successfully");
    }

    public ApiResponse changePassword(ChangePasswordRequest request) {
        Engineer engineer = engineerRepository.findByEmailAndPassword(
                request.getUsername(), request.getCurrentPassword())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid credentials"));

        engineer.setPassword(request.getNewPassword());
        engineerRepository.save(engineer);
        return new ApiResponse(true, "Password Updated Successfully!");
    }
}
