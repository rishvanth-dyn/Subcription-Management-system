package com.example.subscription.service;

import com.example.subscription.dto.ChangePlanRequestDto;
import com.example.subscription.dto.SubscriptionRequestDto;
import com.example.subscription.dto.SubscriptionResponseDto;
import com.example.subscription.entity.*;
import com.example.subscription.entity.Subscription.SubscriptionStatus;
import com.example.subscription.exception.InvalidOperationException;
import com.example.subscription.exception.ResourceNotFoundException;
import com.example.subscription.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final PlanRepository planRepository;
    private final DiscountRepository discountRepository;

    public SubscriptionServiceImpl(SubscriptionRepository subscriptionRepository,
                                   UserRepository userRepository,
                                   PlanRepository planRepository,
                                   DiscountRepository discountRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
        this.planRepository = planRepository;
        this.discountRepository = discountRepository;
    }

    @Override
    public SubscriptionResponseDto subscribe(SubscriptionRequestDto request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Plan plan = planRepository.findById(request.getPlanId())
                .orElseThrow(() -> new ResourceNotFoundException("Plan not found"));

        Discount discount = null;
        if (request.getDiscountId() != null) {
            discount = discountRepository.findById(request.getDiscountId())
                    .orElseThrow(() -> new ResourceNotFoundException("Discount not found"));
        }

        Subscription subscription = new Subscription();
        subscription.setUser(user);
        subscription.setPlan(plan);
        subscription.setDiscount(discount);
        subscription.setStartDate(LocalDate.now());
        subscription.setEndDate(LocalDate.now().plusMonths(1));
        subscription.setStatus(SubscriptionStatus.ACTIVE);
        subscription.setAutoRenew(request.isAutoRenew());

        BigDecimal price = plan.getPrice() != null ? plan.getPrice() : BigDecimal.ZERO;
        if (discount != null && discount.getPercent() != null) {
            BigDecimal percent = discount.getPercent().divide(BigDecimal.valueOf(100));
            price = price.subtract(price.multiply(percent));
        }
        subscription.setPrice(price);
        subscription.setUsedQuota(0);

        Subscription saved = subscriptionRepository.save(subscription);
        return toDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public SubscriptionResponseDto getById(Long id) {
        return subscriptionRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Subscription not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<SubscriptionResponseDto> getByUser(Long userId) {
        return subscriptionRepository.findByUser_Id(userId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public SubscriptionResponseDto changePlan(Long subscriptionId, ChangePlanRequestDto dto) {
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new ResourceNotFoundException("Subscription not found"));

        if (subscription.getStatus() != SubscriptionStatus.ACTIVE) {
            throw new InvalidOperationException("Only active subscriptions can be changed");
        }

        Plan newPlan = planRepository.findById(dto.getNewPlanId())
                .orElseThrow(() -> new ResourceNotFoundException("New plan not found"));

        Discount discount = null;
        if (dto.getDiscountId() != null) {
            discount = discountRepository.findById(dto.getDiscountId())
                    .orElseThrow(() -> new ResourceNotFoundException("Discount not found"));
        }

        subscription.setPlan(newPlan);
        subscription.setDiscount(discount);
        subscription.setStartDate(LocalDate.now());
        subscription.setEndDate(LocalDate.now().plusMonths(1));

        BigDecimal price = newPlan.getPrice() != null ? newPlan.getPrice() : BigDecimal.ZERO;
        if (discount != null && discount.getPercent() != null) {
            BigDecimal percent = discount.getPercent().divide(BigDecimal.valueOf(100));
            price = price.subtract(price.multiply(percent));
        }
        subscription.setPrice(price);

        return toDto(subscriptionRepository.save(subscription));
    }

    @Override
    public SubscriptionResponseDto cancel(Long subscriptionId) {
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new ResourceNotFoundException("Subscription not found"));

        if (subscription.getStatus() == SubscriptionStatus.CANCELLED) {
            throw new InvalidOperationException("Subscription already cancelled");
        }

        subscription.setStatus(SubscriptionStatus.CANCELLED);
        subscription.setAutoRenew(false);

        return toDto(subscriptionRepository.save(subscription));
    }

    @Override
    public List<Subscription> getUserSubscriptions(Long userId) {
        return subscriptionRepository.findByUser_Id(userId);
    }

    private SubscriptionResponseDto toDto(Subscription s) {
        SubscriptionResponseDto dto = new SubscriptionResponseDto();
        dto.setId(s.getId());
        dto.setUserId(s.getUser().getId());
        dto.setPlanId(s.getPlan().getId());
        dto.setPlanName(s.getPlan().getName());
        dto.setStatus(s.getStatus());
        dto.setStartDate(s.getStartDate());
        dto.setEndDate(s.getEndDate());
        dto.setAutoRenew(s.isAutoRenew());
        dto.setPrice(s.getPrice());
        return dto;
    }
}
