package com.complainmanagement.repository;

import com.complainmanagement.entity.Hod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HodRepository extends JpaRepository<Hod, String> {

    Optional<Hod> findByUsernameAndPassword(String username, Integer password);
}
