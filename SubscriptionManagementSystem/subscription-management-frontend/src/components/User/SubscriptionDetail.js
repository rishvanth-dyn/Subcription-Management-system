import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";

const examplePlans = [
  { id: 1, name: "Basic Streaming", price: 9.99, features: ["SD Streaming", "1 Device"] },
  { id: 2, name: "Premium Streaming", price: 14.99, features: ["HD Streaming", "4K Available", "Multiple Devices", "No Ads"] },
  { id: 3, name: "Ultimate Streaming", price: 19.99, features: ["4K UHD", "All Devices", "Offline Downloads", "No Ads"] },
];

const SubscriptionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSubscription({
        id: parseInt(id, 10),
        name: "Premium Streaming",
        price: 14.99,
        status: "active",
        nextBilling: "2023-06-15",
        plan: "Annual",
        started: "2022-06-15",
        features: ["HD Streaming", "4K Available", "Multiple Devices", "No Ads"],
        planId: 2,
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!subscription) return <div>Subscription not found.</div>;

  const currentPlan = examplePlans.find((plan) => plan.id === subscription.planId);
  const upgradePlans = examplePlans.filter((plan) => plan.price > currentPlan.price);
  const downgradePlans = examplePlans.filter((plan) => plan.price < currentPlan.price);

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this subscription?")) {
      alert("Subscription cancelled successfully");
      navigate("/subscriptions");
    }
  };

  const handleUpgrade = (plan) => {
    if (window.confirm(`Confirm upgrade to ${plan.name} for ₹${plan.price} per month?`)) {
      alert(`Upgraded to ${plan.name} successfully!`);
      // Add logic to update subscription here
    }
  };

  const handleDowngrade = (plan) => {
    if (window.confirm(`Confirm downgrade to ${plan.name} for ₹${plan.price} per month?`)) {
      alert(`Downgraded to ${plan.name} successfully!`);
      // Add logic to update subscription here
    }
  };

  return (
    <div className="container">
      <button
        onClick={() => navigate("/subscriptions")}
        className="btn btn-outline"
        style={{ marginBottom: "1rem" }}
      >
        Back to Subscriptions
      </button>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">{subscription.name}</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-2">
            <div>
              <h3>Subscription Details</h3>
              <p><strong>Price:</strong> ₹{subscription.price}/month</p>
              <p>
                <strong>Status:</strong>
                <span style={{ color: subscription.status === "active" ? "green" : "red", marginLeft: "0.5rem" }}>
                  {subscription.status}
                </span>
              </p>
              <p><strong>Plan Type:</strong> {subscription.plan}</p>
              <p><strong>Started On:</strong> {subscription.started}</p>
              <p><strong>Next Billing:</strong> {subscription.nextBilling}</p>
            </div>
            <div>
              <h3>Features</h3>
              <ul>
                {subscription.features.map((feature, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    <i className="fas fa-check" style={{ color: "green", marginRight: "0.5rem" }}></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr />

          <h3>Upgrade Plan</h3>
          {upgradePlans.length > 0 ? (
            <ul>
              {upgradePlans.map((plan) => (
                <li key={plan.id} style={{ marginBottom: "0.5rem" }}>
                  {plan.name} - ₹{plan.price}/month{" "}
                  <button
                    className="btn btn-primary"
                    style={{ marginLeft: "1rem" }}
                    onClick={() => handleUpgrade(plan)}
                  >
                    Upgrade
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upgrade plans available.</p>
          )}

          <h3>Downgrade Plan</h3>
          {downgradePlans.length > 0 ? (
            <ul>
              {downgradePlans.map((plan) => (
                <li key={plan.id} style={{ marginBottom: "0.5rem" }}>
                  {plan.name} - ₹{plan.price}/month{" "}
                  <button
                    className="btn btn-secondary"
                    style={{ marginLeft: "1rem" }}
                    onClick={() => handleDowngrade(plan)}
                  >
                    Downgrade
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No downgrade plans available.</p>
          )}
        </div>

        <div className="card-footer">
          <button className="btn btn-outline">Change Billing</button>
          {subscription.status === "active" && (
            <button
              className="btn"
              style={{ marginLeft: "1rem", backgroundColor: "#f72585", color: "white" }}
              onClick={handleCancel}
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetail;


