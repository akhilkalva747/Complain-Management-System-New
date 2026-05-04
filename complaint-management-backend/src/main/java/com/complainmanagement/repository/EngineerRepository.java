package com.complainmanagement.repository;

import com.complainmanagement.entity.Engineer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EngineerRepository extends JpaRepository<Engineer, String> {

    Optional<Engineer> findByEmailAndPassword(String email, Integer password);
}
