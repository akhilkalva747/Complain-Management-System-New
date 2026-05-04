package com.complainmanagement.repository;

import com.complainmanagement.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {

    Optional<Employee> findByUsernameAndPassword(String username, Integer password);
}
