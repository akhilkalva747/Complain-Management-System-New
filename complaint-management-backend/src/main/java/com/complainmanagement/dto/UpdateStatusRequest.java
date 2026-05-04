package com.complainmanagement.dto;

public class UpdateStatusRequest {
    private Integer complainId;
    private String status;

    public UpdateStatusRequest() {}

    public UpdateStatusRequest(Integer complainId, String status) {
        this.complainId = complainId;
        this.status = status;
    }

    public Integer getComplainId() { return complainId; }
    public void setComplainId(Integer complainId) { this.complainId = complainId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
