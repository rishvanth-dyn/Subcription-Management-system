import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

const DiscountsManagement = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDiscounts([
        {
          id: 1,
          code: 'SUMMER25',
          type: 'percentage',
          value: 25,
          validUntil: '2023-08-31',
          status: 'active',
          usage: 142
        },
        {
          id: 2,
          code: 'WELCOME10',
          type: 'fixed',
          value: 10,
          validUntil: '2023-12-31',
          status: 'active',
          usage: 89
        },
        {
          id: 3,
          code: 'EXPIRED50',
          type: 'percentage',
          value: 50,
          validUntil: '2023-01-31',
          status: 'expired',
          usage: 210
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Manage Discounts & Offers</h1>
        <button className="btn btn-primary">Create New Discount</button>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">All Discounts</h2>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Type</th>
                <th>Value</th>
                <th>Valid Until</th>
                <th>Usage</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map(discount => (
                <tr key={discount.id}>
                  <td>
                    <strong>{discount.code}</strong>
                  </td>
                  <td>{discount.type === 'percentage' ? 'Percentage' : 'Fixed Amount'}</td>
                  <td>
                    {discount.type === 'percentage' ? `${discount.value}%` : `$${discount.value}`}
                  </td>
                  <td>{discount.validUntil}</td>
                  <td>{discount.usage} times</td>
                  <td>
                    <span className={`status ${discount.status}`} style={{ 
                      color: discount.status === 'active' ? 'green' : 'red'
                    }}>
                      {discount.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-outline" style={{ marginRight: '0.5rem' }}>
                      Edit
                    </button>
                    <button className="btn" style={{ backgroundColor: '#f72585', color: 'white' }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DiscountsManagement;

