package com.complainmanagement.dto;

public class AssignComplainRequest {
    private String engineerEmail;
    private Integer complainId;

    public AssignComplainRequest() {}

    public AssignComplainRequest(String engineerEmail, Integer complainId) {
        this.engineerEmail = engineerEmail;
        this.complainId = complainId;
    }

    public String getEngineerEmail() { return engineerEmail; }
    public void setEngineerEmail(String engineerEmail) { this.engineerEmail = engineerEmail; }
    public Integer getComplainId() { return complainId; }
    public void setComplainId(Integer complainId) { this.complainId = complainId; }
}
