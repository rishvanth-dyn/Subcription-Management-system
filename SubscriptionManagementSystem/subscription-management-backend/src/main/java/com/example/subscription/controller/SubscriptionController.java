package com.example.subscription.controller;

import com.example.subscription.dto.ChangePlanRequestDto;
import com.example.subscription.dto.SubscriptionRequestDto;
import com.example.subscription.dto.SubscriptionResponseDto;
import com.example.subscription.service.SubscriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

/**
 * Handles subscription-related operations:
 * - create subscription
 * - get subscription by id
 * - get all subscriptions for a user
 * - change plan
 * - cancel subscription
 */
@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    // Create a new subscription
    @PostMapping
    public ResponseEntity<SubscriptionResponseDto> createSubscription(
            @Valid @RequestBody SubscriptionRequestDto request) {
        return ResponseEntity.ok(subscriptionService.subscribe(request));
    }

    // Get subscription by ID
    @GetMapping("/{id}")
    public ResponseEntity<SubscriptionResponseDto> getSubscription(@PathVariable Long id) {
        return ResponseEntity.ok(subscriptionService.getById(id));
    }

    // Get all subscriptions for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SubscriptionResponseDto>> getSubscriptionsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(subscriptionService.getByUser(userId));
    }

    // Change plan of an active subscription
    @PutMapping("/{id}/change-plan")
    public ResponseEntity<SubscriptionResponseDto> changePlan(
            @PathVariable Long id,
            @Valid @RequestBody ChangePlanRequestDto request) {
        return ResponseEntity.ok(subscriptionService.changePlan(id, request));
    }

    // Cancel a subscription
    @PostMapping("/{id}/cancel")
    public ResponseEntity<SubscriptionResponseDto> cancelSubscription(@PathVariable Long id) {
        return ResponseEntity.ok(subscriptionService.cancel(id));
    }
}


