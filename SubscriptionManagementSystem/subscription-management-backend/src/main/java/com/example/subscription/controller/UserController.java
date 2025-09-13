package com.example.subscription.controller;

import com.example.subscription.entity.Subscription;
import com.example.subscription.entity.User;
import com.example.subscription.service.SubscriptionService;
import com.example.subscription.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final SubscriptionService subscriptionService;

    public UserController(UserService userService, SubscriptionService subscriptionService) {
        this.userService = userService;
        this.subscriptionService = subscriptionService;
    }

    // Endpoint to get the current user's subscriptions
    @GetMapping("/subscriptions")
    public ResponseEntity<List<Subscription>> getUserSubscriptions(Authentication authentication) {
        String username = authentication.getName();
        Optional<User> userOpt = userService.findByUsername(username);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<Subscription> subscriptions = subscriptionService.getUserSubscriptions(userOpt.get().getId());
        return ResponseEntity.ok(subscriptions);
    }

  
}
