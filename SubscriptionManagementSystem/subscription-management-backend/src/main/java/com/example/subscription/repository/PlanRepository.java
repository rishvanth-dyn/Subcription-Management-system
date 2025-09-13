package com.example.subscription.repository;

import com.example.subscription.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {
    // Additional custom query methods can be defined here if needed
}
