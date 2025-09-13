import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setSubscriptions([
        {
          id: 1,
          name: 'Premium Streaming',
          price: 14.99,
          status: 'active',
          nextBilling: '2023-06-15',
          plan: 'Annual'
        },
        {
          id: 2,
          name: 'Cloud Storage Pro',
          price: 9.99,
          status: 'active',
          nextBilling: '2023-06-20',
          plan: 'Monthly'
        },
        {
          id: 3,
          name: 'Fitness App',
          price: 19.99,
          status: 'cancelled',
          nextBilling: '2023-05-30',
          plan: 'Monthly'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>My Subscriptions</h1>
        <button className="btn btn-primary" onClick={() => navigate('/plans')}>
          Subscribe to New Plan
        </button>
      </div>

      {subscriptions.length === 0 ? (
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center', padding: '3rem' }}>
            <i className="fas fa-box-open" style={{ fontSize: '3rem', color: '#6c757d', marginBottom: '1rem' }}></i>
            <h3>No subscriptions yet</h3>
            <p>Browse our plans and find the perfect subscription for your needs.</p>
            <button className="btn btn-primary" onClick={() => navigate('/plans')}>Browse Plans</button>
          </div>
        </div>
      ) : (
        <div className="grid">
          {subscriptions.map(sub => (
            <div key={sub.id} className="card">
              <div className="card-header">
                <h3 className="card-title">{sub.name}</h3>
              </div>
              <div className="card-body">
                <p><strong>Price:</strong> ₹{sub.price}/month</p>
                <p>
                  <strong>Status:</strong>
                  <span style={{
                    color: sub.status === 'active' ? 'green' : 'red',
                    marginLeft: '0.5rem'
                  }}>
                    {sub.status}
                  </span>
                </p>
                <p><strong>Next Billing:</strong> {sub.nextBilling}</p>
                <p><strong>Plan:</strong> {sub.plan}</p>
              </div>
              <div className="card-footer">
                <Link to={`/subscription/${sub.id}`} className="btn btn-primary">
                  Manage Subscription
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subscriptions;


