package com.complainmanagement.service;

import com.complainmanagement.dto.*;
import com.complainmanagement.entity.Complain;
import com.complainmanagement.entity.Employee;
import com.complainmanagement.exception.BadRequestException;
import com.complainmanagement.exception.ResourceNotFoundException;
import com.complainmanagement.repository.ComplainRepository;
import com.complainmanagement.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final ComplainRepository complainRepository;

    public EmployeeService(EmployeeRepository employeeRepository, ComplainRepository complainRepository) {
        this.employeeRepository = employeeRepository;
        this.complainRepository = complainRepository;
    }

    public ApiResponse login(LoginRequest request) {
        return employeeRepository.findByUsernameAndPassword(request.getUsername(), request.getPassword())
                .map(emp -> new ApiResponse(true, "Login Successful", emp.getUsername()))
                .orElse(new ApiResponse(false, "No employee exists with these details"));
    }

    public ApiResponse signup(SignupRequest request) {
        if (!request.getUsername().contains("@gmail.com")) {
            throw new BadRequestException("Email must contain @gmail.com");
        }

        if (employeeRepository.existsById(request.getUsername())) {
            throw new BadRequestException("Employee already exists with this username");
        }

        Employee employee = new Employee();
        employee.setUsername(request.getUsername());
        employee.setPassword(request.getPassword());
        employeeRepository.save(employee);

        return new ApiResponse(true, "Sign up Successful");
    }

    public ApiResponse raiseComplain(RaiseComplainRequest request) {
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            throw new BadRequestException("Username is required");
        }

        // Generate a random complaint ID (like the original logic)
        Random random = new Random();
        int complainId;
        do {
            complainId = random.nextInt(99999) + 1;
        } while (complainRepository.existsById(complainId));

        Complain complain = new Complain();
        complain.setComplainId(complainId);
        complain.setComplainType(request.getComplainType());
        complain.setComplainDetails(request.getComplainDetails());
        complain.setRaisedBy(request.getUsername());
        complainRepository.save(complain);

        return new ApiResponse(true, "Complain registered successfully", complainId);
    }

    public Complain checkComplainStatus(Integer complainId, String username) {
        return complainRepository.findByComplainIdAndRaisedBy(complainId, username)
                .orElseThrow(() -> new ResourceNotFoundException("No complaint found with ID: " + complainId + " for user: " + username));
    }

    public List<Complain> getComplainHistory(String username) {
        return complainRepository.findByRaisedBy(username);
    }

    public ApiResponse changePassword(ChangePasswordRequest request) {
        Employee employee = employeeRepository.findByUsernameAndPassword(
                request.getUsername(), request.getCurrentPassword())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid credentials"));

        employee.setPassword(request.getNewPassword());
        employeeRepository.save(employee);
        return new ApiResponse(true, "Password Updated Successfully!");
    }
}
