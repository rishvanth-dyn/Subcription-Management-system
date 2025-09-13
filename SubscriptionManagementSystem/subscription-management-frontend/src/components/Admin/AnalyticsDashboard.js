import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AnalyticsDashboard = () => {
  const [topPlansData, setTopPlansData] = useState(null);
  const [subscriptionTrends, setSubscriptionTrends] = useState(null);
  const [discountUsage, setDiscountUsage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [topPlansRes, trendsRes, discountsRes] = await Promise.all([
        api.get("/admin/analytics/top-plans"),
        api.get("/admin/analytics/subscription-trends"),
        api.get("/admin/analytics/discount-usage"),
      ]);
      setTopPlansData(formatBarData(topPlansRes.data));
      setSubscriptionTrends(formatBarData(trendsRes.data));
      setDiscountUsage(formatPieData(discountsRes.data));
      setLoading(false);
    } catch (err) {
      setError("Error fetching analytics data");
      setLoading(false);
      console.error(err);
    }
  };

  const formatBarData = (data) => {
    return {
      labels: data.map((d) => d.label),
      datasets: [
        {
          label: "Count",
          data: data.map((d) => d.value),
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
  };

  const formatPieData = (data) => {
    return {
      labels: data.map((d) => d.label),
      datasets: [
        {
          label: "Percentage",
          data: data.map((d) => d.value),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
          hoverOffset: 4,
        },
      ],
    };
  };

  if (loading)
    return React.createElement("p", null, "Loading analytics...");

  if (error)
    return React.createElement("p", null, error);

  return React.createElement(
    "div",
    null,
    React.createElement("h2", null, "Analytics Dashboard"),

    React.createElement(
      "section",
      null,
      React.createElement("h3", null, "Top Subscription Plans"),
      topPlansData
        ? React.createElement(Bar, { data: topPlansData, options: { responsive: true } })
        : React.createElement("p", null, "No data available")
    ),

    React.createElement(
      "section",
      null,
      React.createElement("h3", null, "Subscription Trends (Active vs Cancelled)"),
      subscriptionTrends
        ? React.createElement(Bar, { data: subscriptionTrends, options: { responsive: true } })
        : React.createElement("p", null, "No data available")
    ),

    React.createElement(
      "section",
      null,
      React.createElement("h3", null, "Discount Usage Distribution"),
      discountUsage
        ? React.createElement(Pie, { data: discountUsage, options: { responsive: true } })
        : React.createElement("p", null, "No data available")
    )
  );
};

export default AnalyticsDashboard;


