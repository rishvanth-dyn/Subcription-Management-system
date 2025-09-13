package com.example.subscription.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "discounts")
public class Discount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    
    private double percentage;
    
    private LocalDateTime validFrom;
    
    private LocalDateTime validUntil;
    
    private boolean active;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    private int maxUses;
    
    private int currentUses;

    public boolean isValid() {
        LocalDateTime now = LocalDateTime.now();
        return active && 
               now.isAfter(validFrom) && 
               now.isBefore(validUntil) && 
               (maxUses == 0 || currentUses < maxUses);
    }

    public double applyDiscount(double amount) {
        if (!isValid()) {
            throw new IllegalStateException("Discount is not valid");
        }
        double discountAmount = amount * (percentage / 100.0);
        return amount - discountAmount;
    }

    public void incrementUses() {
        this.currentUses++;
        if (maxUses > 0 && currentUses >= maxUses) {
            this.active = false;
        }
    }
}