import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setRecommendations([
        {
          id: 1,
          name: 'Streaming Bundle',
          price: 22.99,
          savings: 5.99,
          description: 'Combine your streaming services for a discounted rate',
          reason: 'Based on your viewing habits and current subscriptions'
        },
        {
          id: 2,
          name: 'Cloud Storage Premium',
          price: 14.99,
          savings: 3.00,
          description: 'Upgrade to get more storage and advanced features',
          reason: "You're using 85% of your current storage limit"
        },
        {
          id: 3,
          name: 'Music Pro',
          price: 7.99,
          savings: 2.00,
          description: 'Ad-free music with higher quality audio',
          reason: 'You frequently listen to music during work hours'
        }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container">
      <h1>Personalized Recommendations</h1>
      <p style={{ marginBottom: '2rem' }}>AI-powered suggestions based on your usage patterns and preferences</p>

      <div className="grid">
        {recommendations.map(rec => (
          <div key={rec.id} className="card">
            <div className="card-header">
              <h3 className="card-title">{rec.name}</h3>
            </div>
            <div className="card-body">
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                ₹{rec.price}/month
              </p>
              <p style={{ color: 'green' }}>
                <i className="fas fa-piggy-bank"></i> Save ₹{rec.savings} compared to separate plans
              </p>
              <p>{rec.description}</p>
              <div style={{
                backgroundColor: 'rgba(67, 97, 238, 0.1)',
                padding: '1rem',
                borderRadius: 'var(--border-radius)',
                marginTop: '1rem'
              }}>
                <strong>Why we recommend this:</strong> {rec.reason}
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary" onClick={() => navigate(`/plans`)}>
                View Details
              </button>
              <button className="btn" style={{ marginLeft: '1rem' }} onClick={() => navigate(`/plans`)}>
                Subscribe Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;


