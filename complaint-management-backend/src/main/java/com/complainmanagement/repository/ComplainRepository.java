package com.complainmanagement.repository;

import com.complainmanagement.entity.Complain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ComplainRepository extends JpaRepository<Complain, Integer> {

    List<Complain> findBySolveByAndStatusIsNull(String solveBy);

    List<Complain> findBySolveByAndStatusIsNotNull(String solveBy);

    // Assigned tasks: status is null (new) OR "In Progress"
    @Query("SELECT c FROM Complain c WHERE c.solveBy = :email AND (c.status IS NULL OR LOWER(c.status) = 'in progress')")
    List<Complain> findActiveAssignedComplaints(@Param("email") String email);

    // Completed tasks: status is "Fixed"
    @Query("SELECT c FROM Complain c WHERE c.solveBy = :email AND LOWER(c.status) = 'fixed'")
    List<Complain> findFixedComplaintsByEngineer(@Param("email") String email);

    // Analytics: count by engineer and status
    @Query("SELECT c.solveBy, COUNT(c) FROM Complain c WHERE c.solveBy IS NOT NULL GROUP BY c.solveBy")
    List<Object[]> countComplaintsByEngineer();

    @Query("SELECT c.solveBy, c.status, COUNT(c) FROM Complain c WHERE c.solveBy IS NOT NULL GROUP BY c.solveBy, c.status")
    List<Object[]> countComplaintsByEngineerAndStatus();

    Optional<Complain> findByComplainIdAndRaisedBy(Integer complainId, String raisedBy);

    List<Complain> findByRaisedBy(String raisedBy);
}
