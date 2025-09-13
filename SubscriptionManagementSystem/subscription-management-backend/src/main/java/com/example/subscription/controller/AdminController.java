package com.example.subscription.controller;

import com.example.subscription.dto.*;
import com.example.subscription.entity.*;
import com.example.subscription.service.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final UserService userService;
    private final PlanService planService;
    private final SubscriptionService subscriptionService;
    private final DiscountService discountService;

    public AdminController(UserService userService, PlanService planService,
                           SubscriptionService subscriptionService, DiscountService discountService) {
        this.userService = userService;
        this.planService = planService;
        this.subscriptionService = subscriptionService;
        this.discountService = discountService;
    }

    // --- User Management ---

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // --- Plan Management ---

    @PostMapping("/plans")
    public ResponseEntity<Plan> createPlan(@Valid @RequestBody Plan plan) {
        return ResponseEntity.ok(planService.createPlan(plan)); 
    }

    @GetMapping("/plans")
    public ResponseEntity<List<Plan>> getAllPlans() {
        return ResponseEntity.ok(planService.getAllPlans());
    }

    @PutMapping("/plans/{id}")
    public ResponseEntity<Plan> updatePlan(@PathVariable Long id, @Valid @RequestBody Plan plan) {
        return ResponseEntity.ok(planService.updatePlan(id, plan));
    }

    @DeleteMapping("/plans/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable Long id) {
        planService.deletePlan(id);
        return ResponseEntity.noContent().build();
    }

    // --- Subscription Management ---

    @GetMapping("/subscriptions")
    public ResponseEntity<List<Subscription>> getAllSubscriptions() {
        return ResponseEntity.ok(subscriptionService.getAllSubscriptions());
    }

    @DeleteMapping("/subscriptions/{id}")
    public ResponseEntity<Void> deleteSubscription(@PathVariable Long id) {
        subscriptionService.deleteSubscription(id);
        return ResponseEntity.noContent().build();
    }

    // --- Discount Management ---

    @PostMapping("/discounts")
    public ResponseEntity<Discount> createDiscount(@Valid @RequestBody Discount discount) {
        return ResponseEntity.ok(discountService.createDiscount(discount));
    }

    @GetMapping("/discounts")
    public ResponseEntity<List<Discount>> getAllDiscounts() {
        return ResponseEntity.ok(discountService.getAllDiscounts());
    }

    @PutMapping("/discounts/{id}")
    public ResponseEntity<Discount> updateDiscount(@PathVariable Long id, @Valid @RequestBody Discount discount) {
        return ResponseEntity.ok(discountService.updateDiscount(id, discount));
    }

    @DeleteMapping("/discounts/{id}")
    public ResponseEntity<Void> deleteDiscount(@PathVariable Long id) {
        discountService.deleteDiscount(id);
        return ResponseEntity.noContent().build();
    }

}


