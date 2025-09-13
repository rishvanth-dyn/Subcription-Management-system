package com.example.subscription.controller;

import com.example.subscription.dto.SubscriptionRequestDto;
import com.example.subscription.service.SubscriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @PostMapping
    public ResponseEntity<String> createSubscription(@Valid @RequestBody SubscriptionRequestDto request) {
        subscriptionService.subscribe(request);
        return ResponseEntity.ok("Subscription created");
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getSubscription(@PathVariable Long id) {
        String info = subscriptionService.getSummaryById(id);
        return ResponseEntity.ok(info);
    }

    @PutMapping("/{id}/change-plan")
    public ResponseEntity<String> changePlan(@PathVariable Long id, @Valid @RequestBody SubscriptionRequestDto request) {
        subscriptionService.changePlan(id, request);
        return ResponseEntity.ok("Plan changed");
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<String> cancelSubscription(@PathVariable Long id) {
        subscriptionService.cancel(id);
        return ResponseEntity.ok("Subscription cancelled");
    }
}
