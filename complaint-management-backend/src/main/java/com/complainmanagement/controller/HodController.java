package com.complainmanagement.controller;

import com.complainmanagement.config.JwtUtil;
import com.complainmanagement.dto.*;
import com.complainmanagement.entity.Complain;
import com.complainmanagement.entity.Engineer;
import com.complainmanagement.service.HodService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hod")
public class HodController {

    private final HodService hodService;
    private final JwtUtil jwtUtil;

    public HodController(HodService hodService, JwtUtil jwtUtil) {
        this.hodService = hodService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest request) {
        ApiResponse response = hodService.login(request);
        if (response.isSuccess()) {
            String token = jwtUtil.generateToken(request.getUsername(), "HOD");
            response.setData(new java.util.HashMap<String, Object>() {{
                put("username", response.getData());
                put("token", token);
            }});
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body(response);
    }

    @PostMapping("/register-engineer")
    public ResponseEntity<ApiResponse> registerEngineer(@RequestBody RegisterEngineerRequest request) {
        return ResponseEntity.ok(hodService.registerEngineer(request));
    }

    @GetMapping("/engineers")
    public ResponseEntity<List<Engineer>> getAllEngineers() {
        return ResponseEntity.ok(hodService.getAllEngineers());
    }

    @DeleteMapping("/engineer/{email}")
    public ResponseEntity<ApiResponse> deleteEngineer(@PathVariable String email) {
        return ResponseEntity.ok(hodService.deleteEngineer(email));
    }

    @GetMapping("/complaints")
    public ResponseEntity<List<Complain>> getAllComplaints() {
        return ResponseEntity.ok(hodService.getAllComplaints());
    }

    @PostMapping("/assign-complaint")
    public ResponseEntity<ApiResponse> assignComplaint(@RequestBody AssignComplainRequest request) {
        return ResponseEntity.ok(hodService.assignComplainToEngineer(request));
    }

    @GetMapping("/analytics")
    public ResponseEntity<?> getAnalytics() {
        return ResponseEntity.ok(hodService.getAnalytics());
    }
}
