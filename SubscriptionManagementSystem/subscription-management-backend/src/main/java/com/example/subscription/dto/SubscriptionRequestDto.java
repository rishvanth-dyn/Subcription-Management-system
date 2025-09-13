package com.example.subscription.dto;

import jakarta.validation.constraints.NotNull;

/**
 * DTO used when creating a new subscription request.
 * This is the data the client sends in the request body.
 */
public class SubscriptionRequestDto {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Plan ID is required")
    private Long planId;

    private Long discountId;   // optional field
    private boolean autoRenew = true; // defaults to true

    // -------- Getters and Setters --------
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPlanId() {
        return planId;
    }
    public void setPlanId(Long planId) {
        this.planId = planId;
    }

    public Long getDiscountId() {
        return discountId;
    }
    public void setDiscountId(Long discountId) {
        this.discountId = discountId;
    }

    public boolean isAutoRenew() {
        return autoRenew;
    }
    public void setAutoRenew(boolean autoRenew) {
        this.autoRenew = autoRenew;
    }
}


