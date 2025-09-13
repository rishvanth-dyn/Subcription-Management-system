package com.example.subscription.service;

import com.example.subscription.dto.SubscriptionRequestDto;

import java.util.List;

public interface SubscriptionService {
    void subscribe(SubscriptionRequestDto request);

    String getSummaryById(Long id);

    List<String> getSummariesByUser(Long userId);

    void changePlan(Long id, SubscriptionRequestDto request);

    void cancel(Long id);
}
