package com.complainmanagement.dto;

public class ChangePasswordRequest {
    private String username;
    private Integer currentPassword;
    private Integer newPassword;

    public ChangePasswordRequest() {}

    public ChangePasswordRequest(String username, Integer currentPassword, Integer newPassword) {
        this.username = username;
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public Integer getCurrentPassword() { return currentPassword; }
    public void setCurrentPassword(Integer currentPassword) { this.currentPassword = currentPassword; }
    public Integer getNewPassword() { return newPassword; }
    public void setNewPassword(Integer newPassword) { this.newPassword = newPassword; }
}
