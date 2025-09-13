#Users Table

INSERT INTO users (user_id, name, phone, email, status) VALUES
(1, 'Alice', '1234567890', 'alice@example.com', 'active'),
(2, 'Bob', '0987654321', 'bob@example.com', 'inactive');


#Subscription Plans Table

INSERT INTO subscription_plans (product_id, name, price, auto_renewal_allowed, status) VALUES
(1, 'Basic Plan', 9.99, 'Yes', 'active'),
(2, 'Premium Plan', 19.99, 'No', 'active');


#Subscriptions Table

INSERT INTO subscriptions (subscription_id, subscription_type, product_id, user_id, status, start_date, last_billed_date, last_renewed_date, terminated_date, grace_time) VALUES
(100, 'monthly', 1, 1, 'active', '2024-01-01', '2024-02-01', '2024-02-01', NULL, '5 days'),
(101, 'yearly', 2, 2, 'paused', '2023-06-15', '2023-06-15', '2023-06-15', NULL, '10 days');

#Subscription Logs Table

INSERT INTO subscription_logs (subscription_id, current_status, next_status, action, action_date) VALUES
(100, 'active', 'paused', 'renew_failed', '2024-01-30'),
(101, 'paused', 'active', 'renew', '2024-01-20');

#Billing Information Table

INSERT INTO billing_information (billing_id, subscription_id, amount, billing_date, payment_status) VALUES
(1, 100, 9.99, '2024-01-01', 'paid'),
(2, 101, 199.99, '2023-06-15', 'pending');

