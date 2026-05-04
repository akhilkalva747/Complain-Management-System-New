package com.complainmanagement.controller;

import com.complainmanagement.config.JwtUtil;
import com.complainmanagement.dto.*;
import com.complainmanagement.entity.Complain;
import com.complainmanagement.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final JwtUtil jwtUtil;

    public EmployeeController(EmployeeService employeeService, JwtUtil jwtUtil) {
        this.employeeService = employeeService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest request) {
        ApiResponse response = employeeService.login(request);
        if (response.isSuccess()) {
            String token = jwtUtil.generateToken(request.getUsername(), "EMPLOYEE");
            response.setData(new java.util.HashMap<String, Object>() {{
                put("username", response.getData());
                put("token", token);
            }});
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> signup(@RequestBody SignupRequest request) {
        return ResponseEntity.ok(employeeService.signup(request));
    }

    @PostMapping("/raise-complain")
    public ResponseEntity<ApiResponse> raiseComplain(@RequestBody RaiseComplainRequest request) {
        return ResponseEntity.ok(employeeService.raiseComplain(request));
    }

    @GetMapping("/check-status")
    public ResponseEntity<Complain> checkStatus(
            @RequestParam Integer complainId,
            @RequestParam String username) {
        return ResponseEntity.ok(employeeService.checkComplainStatus(complainId, username));
    }

    @GetMapping("/complain-history/{username}")
    public ResponseEntity<List<Complain>> getComplainHistory(@PathVariable String username) {
        return ResponseEntity.ok(employeeService.getComplainHistory(username));
    }

    @PutMapping("/change-password")
    public ResponseEntity<ApiResponse> changePassword(@RequestBody ChangePasswordRequest request) {
        return ResponseEntity.ok(employeeService.changePassword(request));
    }
}
