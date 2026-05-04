package com.complainmanagement.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "complain")
public class Complain {

    @Id
    @Column(name = "complainId")
    private Integer complainId;

    @Column(name = "complainType", length = 15)
    private String complainType;

    @Column(name = "complainDetails", length = 80)
    private String complainDetails;

    @Column(name = "status", length = 20)
    private String status;

    @Column(name = "raisedBy", length = 30)
    private String raisedBy;

    @Column(name = "solveby", length = 30)
    private String solveBy;

    public Complain() {}

    public Complain(Integer complainId, String complainType, String complainDetails, String status, String raisedBy, String solveBy) {
        this.complainId = complainId;
        this.complainType = complainType;
        this.complainDetails = complainDetails;
        this.status = status;
        this.raisedBy = raisedBy;
        this.solveBy = solveBy;
    }

    public Integer getComplainId() { return complainId; }
    public void setComplainId(Integer complainId) { this.complainId = complainId; }
    public String getComplainType() { return complainType; }
    public void setComplainType(String complainType) { this.complainType = complainType; }
    public String getComplainDetails() { return complainDetails; }
    public void setComplainDetails(String complainDetails) { this.complainDetails = complainDetails; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getRaisedBy() { return raisedBy; }
    public void setRaisedBy(String raisedBy) { this.raisedBy = raisedBy; }
    public String getSolveBy() { return solveBy; }
    public void setSolveBy(String solveBy) { this.solveBy = solveBy; }

    @Override
    public String toString() {
        return "Complain{complainId=" + complainId + ", complainType='" + complainType + "', status='" + status + "', raisedBy='" + raisedBy + "', solveBy='" + solveBy + "'}";
    }
}
