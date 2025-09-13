package com.example.subscription.service;

import com.example.subscription.entity.Plan;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlanService {

    private final List<Plan> planList = new ArrayList<>();
    private Long idCounter = 1L;  // To assign unique IDs

    // Create a new plan
    public Plan createPlan(String name, double price, String description) {
        Plan plan = new Plan(idCounter++, name, price, description);
        planList.add(plan);
        return plan;
    }

    // Get all plans
    public List<Plan> getAllPlans() {
        return planList;
    }

    // Get plan by ID
    public Optional<Plan> getPlanById(Long id) {
        return planList.stream().filter(p -> p.getId().equals(id)).findFirst();
    }

    // Update plan
    public Plan updatePlan(Long id, String name, double price, String description) {
        Optional<Plan> optionalPlan = getPlanById(id);
        if(optionalPlan.isPresent()) {
            Plan plan = optionalPlan.get();
            plan.setName(name);
            plan.setPrice(price);
            plan.setDescription(description);
            return plan;
        }
        throw new RuntimeException("Plan not found with id " + id);
    }

    // Delete plan
    public boolean deletePlan(Long id) {
        return planList.removeIf(p -> p.getId().equals(id));
    }
}
