package com.complainmanagement.dto;

public class RegisterEngineerRequest {
    private String email;
    private Integer password;
    private String type;

    public RegisterEngineerRequest() {}

    public RegisterEngineerRequest(String email, Integer password, String type) {
        this.email = email;
        this.password = password;
        this.type = type;
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public Integer getPassword() { return password; }
    public void setPassword(Integer password) { this.password = password; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
