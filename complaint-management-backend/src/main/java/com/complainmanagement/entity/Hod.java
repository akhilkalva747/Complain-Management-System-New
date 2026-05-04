package com.complainmanagement.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "hod")
public class Hod {

    @Id
    @Column(name = "username", length = 12)
    private String username;

    @Column(name = "password")
    private Integer password;

    public Hod() {}

    public Hod(String username, Integer password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public Integer getPassword() { return password; }
    public void setPassword(Integer password) { this.password = password; }

    @Override
    public String toString() {
        return "Hod{username='" + username + "', password=" + password + "}";
    }
}
