package com.complainmanagement.dto;

public class RaiseComplainRequest {
    private String complainType;
    private String complainDetails;
    private String username;

    public RaiseComplainRequest() {}

    public RaiseComplainRequest(String complainType, String complainDetails, String username) {
        this.complainType = complainType;
        this.complainDetails = complainDetails;
        this.username = username;
    }

    public String getComplainType() { return complainType; }
    public void setComplainType(String complainType) { this.complainType = complainType; }
    public String getComplainDetails() { return complainDetails; }
    public void setComplainDetails(String complainDetails) { this.complainDetails = complainDetails; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}
