package com.complainmanagement.service;

import com.complainmanagement.dto.*;
import com.complainmanagement.entity.Complain;
import com.complainmanagement.entity.Engineer;
import com.complainmanagement.exception.BadRequestException;
import com.complainmanagement.exception.ResourceNotFoundException;
import com.complainmanagement.repository.ComplainRepository;
import com.complainmanagement.repository.EngineerRepository;
import com.complainmanagement.repository.HodRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class HodService {

    private final HodRepository hodRepository;
    private final EngineerRepository engineerRepository;
    private final ComplainRepository complainRepository;

    public HodService(HodRepository hodRepository, EngineerRepository engineerRepository, ComplainRepository complainRepository) {
        this.hodRepository = hodRepository;
        this.engineerRepository = engineerRepository;
        this.complainRepository = complainRepository;
    }

    public ApiResponse login(LoginRequest request) {
        return hodRepository.findByUsernameAndPassword(request.getUsername(), request.getPassword())
                .map(hod -> new ApiResponse(true, "Login Successful", hod.getUsername()))
                .orElse(new ApiResponse(false, "Invalid HOD credentials"));
    }

    public ApiResponse registerEngineer(RegisterEngineerRequest request) {
        if (!request.getEmail().contains("@gmail.com")) {
            throw new BadRequestException("Email must contain @gmail.com");
        }

        if (engineerRepository.existsById(request.getEmail())) {
            throw new BadRequestException("Engineer already exists with this email");
        }

        Engineer engineer = new Engineer();
        engineer.setEmail(request.getEmail());
        engineer.setPassword(request.getPassword());
        engineer.setType(request.getType());
        engineerRepository.save(engineer);

        return new ApiResponse(true, "Engineer registered successfully");
    }

    public List<Engineer> getAllEngineers() {
        return engineerRepository.findAll();
    }

    public ApiResponse deleteEngineer(String email) {
        if (!engineerRepository.existsById(email)) {
            throw new ResourceNotFoundException("Engineer not found: " + email);
        }
        engineerRepository.deleteById(email);
        return new ApiResponse(true, "Engineer deleted successfully");
    }

    public List<Complain> getAllComplaints() {
        return complainRepository.findAll();
    }

    public ApiResponse assignComplainToEngineer(AssignComplainRequest request) {
        if (!request.getEngineerEmail().contains("@gmail.com")) {
            throw new BadRequestException("Email must contain @gmail.com");
        }

        Complain complain = complainRepository.findById(request.getComplainId())
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found with ID: " + request.getComplainId()));

        complain.setSolveBy(request.getEngineerEmail());
        complainRepository.save(complain);
        return new ApiResponse(true, "Complaint assigned successfully");
    }

    public Map<String, Object> getAnalytics() {
        List<Complain> all = complainRepository.findAll();

        long totalComplaints = all.size();
        long unassigned = all.stream().filter(c -> c.getSolveBy() == null || c.getSolveBy().isEmpty()).count();
        long inProgress = all.stream().filter(c -> c.getStatus() != null && c.getStatus().equalsIgnoreCase("in progress")).count();
        long fixed = all.stream().filter(c -> c.getStatus() != null && c.getStatus().equalsIgnoreCase("fixed")).count();
        long pending = all.stream().filter(c -> c.getStatus() == null && c.getSolveBy() != null).count();

        // Per-engineer stats
        Map<String, Map<String, Object>> engineerStats = new LinkedHashMap<>();
        for (Complain c : all) {
            if (c.getSolveBy() == null || c.getSolveBy().isEmpty()) continue;
            String eng = c.getSolveBy();
            engineerStats.putIfAbsent(eng, new LinkedHashMap<>());
            Map<String, Object> stats = engineerStats.get(eng);
            stats.merge("total", 1, (a, b) -> (int) a + (int) b);
            String status = c.getStatus() == null ? "pending" : c.getStatus().toLowerCase();
            stats.merge(status, 1, (a, b) -> (int) a + (int) b);
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("totalComplaints", totalComplaints);
        result.put("unassigned", unassigned);
        result.put("inProgress", inProgress);
        result.put("fixed", fixed);
        result.put("pending", pending);
        result.put("engineerStats", engineerStats);
        return result;
    }
}
