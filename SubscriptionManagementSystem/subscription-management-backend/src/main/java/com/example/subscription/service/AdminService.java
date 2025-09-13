package com.example.subscription.service;

import com.example.subscription.entity.*;
import com.example.subscription.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final PlanRepository planRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final DiscountRepository discountRepository;

    public AdminService(UserRepository userRepository, PlanRepository planRepository,
                        SubscriptionRepository subscriptionRepository, DiscountRepository discountRepository) {
        this.userRepository = userRepository;
        this.planRepository = planRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.discountRepository = discountRepository;
    }

    // --- User Management ---

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // --- Plan Management ---

    public Plan createPlan(Plan plan) {
        return planRepository.save(plan);
    }

    public List<Plan> getAllPlans() {
        return planRepository.findAll();
    }

    public Optional<Plan> getPlanById(Long id) {
        return planRepository.findById(id);
    }

    public Plan updatePlan(Long id, Plan updatedPlan) {
        return planRepository.findById(id).map(plan -> {
            plan.setName(updatedPlan.getName());
            plan.setPrice(updatedPlan.getPrice());
            plan.setDescription(updatedPlan.getDescription());
            return planRepository.save(plan);
        }).orElseThrow(() -> new RuntimeException("Plan not found for id " + id));
    }

    public void deletePlan(Long id) {
        planRepository.deleteById(id);
    }

    // --- Subscription Management ---

    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }

    public Optional<Subscription> getSubscriptionById(Long id) {
        return subscriptionRepository.findById(id);
    }

    public Subscription createSubscription(Subscription subscription) {
        return subscriptionRepository.save(subscription);
    }

    public Subscription updateSubscription(Long id, Subscription updatedSubscription) {
        return subscriptionRepository.findById(id).map(sub -> {
            sub.setPlan(updatedSubscription.getPlan());
            sub.setUser(updatedSubscription.getUser());
            sub.setStatus(updatedSubscription.getStatus());
            sub.setDataUsed(updatedSubscription.getDataUsed());
            sub.setAutoRenew(updatedSubscription.getAutoRenew());
            sub.setStartDate(updatedSubscription.getStartDate());
            sub.setEndDate(updatedSubscription.getEndDate());
            return subscriptionRepository.save(sub);
        }).orElseThrow(() -> new RuntimeException("Subscription not found for id " + id));
    }

    public void deleteSubscription(Long id) {
        subscriptionRepository.deleteById(id);
    }

    // --- Discount Management ---

    public Discount createDiscount(Discount discount) {
        return discountRepository.save(discount);
    }

    public List<Discount> getAllDiscounts() {
        return discountRepository.findAll();
    }

    public Optional<Discount> getDiscountById(Long id) {
        return discountRepository.findById(id);
    }

    public Discount updateDiscount(Long id, Discount updatedDiscount) {
        return discountRepository.findById(id).map(discount -> {
            discount.setCode(updatedDiscount.getCode());
            discount.setName(updatedDiscount.getName());
            discount.setDescription(updatedDiscount.getDescription());
            discount.setType(updatedDiscount.getType());
            discount.setValue(updatedDiscount.getValue());
            discount.setMinOrderAmount(updatedDiscount.getMinOrderAmount());
            discount.setUsageLimit(updatedDiscount.getUsageLimit());
            discount.setStartDate(updatedDiscount.getStartDate());
            discount.setEndDate(updatedDiscount.getEndDate());
            discount.setIsActive(updatedDiscount.getIsActive());
            return discountRepository.save(discount);
        }).orElseThrow(() -> new RuntimeException("Discount not found for id " + id));
    }

    public void deleteDiscount(Long id) {
        discountRepository.deleteById(id);
    }
}
