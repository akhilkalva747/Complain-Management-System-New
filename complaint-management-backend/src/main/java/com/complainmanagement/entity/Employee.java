package com.complainmanagement.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @Column(name = "username", length = 20)
    private String username;

    @Column(name = "password")
    private Integer password;

    public Employee() {}

    public Employee(String username, Integer password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public Integer getPassword() { return password; }
    public void setPassword(Integer password) { this.password = password; }

    @Override
    public String toString() {
        return "Employee{username='" + username + "', password=" + password + "}";
    }
}
