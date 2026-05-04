package com.complainmanagement.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "engineer")
public class Engineer {

    @Id
    @Column(name = "email", length = 30)
    private String email;

    @Column(name = "password")
    private Integer password;

    @Column(name = "Type", length = 10)
    private String type;

    public Engineer() {}

    public Engineer(String email, Integer password, String type) {
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

    @Override
    public String toString() {
        return "Engineer{email='" + email + "', password=" + password + ", type='" + type + "'}";
    }
}
