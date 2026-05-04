package com.complainmanagement.controller;

import com.complainmanagement.config.JwtUtil;
import com.complainmanagement.dto.*;
import com.complainmanagement.entity.Complain;
import com.complainmanagement.service.EngineerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/engineer")
public class EngineerController {

    private final EngineerService engineerService;
    private final JwtUtil jwtUtil;

    public EngineerController(EngineerService engineerService, JwtUtil jwtUtil) {
        this.engineerService = engineerService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest request) {
        ApiResponse response = engineerService.login(request);
        if (response.isSuccess()) {
            String token = jwtUtil.generateToken(request.getUsername(), "ENGINEER");
            response.setData(new java.util.HashMap<String, Object>() {{
                put("email", response.getData());
                put("token", token);
            }});
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body(response);
    }

    @GetMapping("/assigned-complaints/{email}")
    public ResponseEntity<List<Complain>> getAssignedComplaints(@PathVariable String email) {
        return ResponseEntity.ok(engineerService.getAssignedComplaints(email));
    }

    @GetMapping("/attempted-complaints/{email}")
    public ResponseEntity<List<Complain>> getAttemptedComplaints(@PathVariable String email) {
        return ResponseEntity.ok(engineerService.getAttemptedComplaints(email));
    }

    @PutMapping("/update-status")
    public ResponseEntity<ApiResponse> updateStatus(@RequestBody UpdateStatusRequest request) {
        return ResponseEntity.ok(engineerService.updateStatus(request));
    }

    @PutMapping("/change-password")
    public ResponseEntity<ApiResponse> changePassword(@RequestBody ChangePasswordRequest request) {
        return ResponseEntity.ok(engineerService.changePassword(request));
    }
}
