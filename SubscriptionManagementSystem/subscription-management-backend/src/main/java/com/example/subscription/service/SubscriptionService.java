package com.example.subscription.service;

import com.example.subscription.dto.*;
import com.example.subscription.entity.Subscription;

import java.util.List;

public interface SubscriptionService {
    SubscriptionResponseDto subscribe(SubscriptionRequestDto request);
    SubscriptionResponseDto getById(Long id);
    List<SubscriptionResponseDto> getByUser(Long userId);
    SubscriptionResponseDto changePlan(Long subscriptionId, ChangePlanRequestDto dto);
    SubscriptionResponseDto cancel(Long subscriptionId);

    // Used in UserController
    List<Subscription> getUserSubscriptions(Long userId);
}


