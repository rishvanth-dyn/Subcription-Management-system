import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

const PlansManagement = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPlans([
        {
          id: 1,
          name: 'Basic Plan',
          price: 9.99,
          duration: 'monthly',
          features: ['Feature 1', 'Feature 2'],
          status: 'active'
        },
        {
          id: 2,
          name: 'Pro Plan',
          price: 19.99,
          duration: 'monthly',
          features: ['Feature 1', 'Feature 2', 'Feature 3'],
          status: 'active'
        },
        {
          id: 3,
          name: 'Enterprise Plan',
          price: 49.99,
          duration: 'monthly',
          features: ['All Features', 'Priority Support'],
          status: 'inactive'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      setPlans(plans.filter(plan => plan.id !== id));
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Manage Subscription Plans</h1>
        <button 
          className="btn btn-primary" 
          onClick={() => {
            setEditingPlan(null);
            setShowForm(true);
          }}
        >
          Add New Plan
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">All Plans</h2>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.name}</td>
                  <td>${plan.price}</td>
                  <td>{plan.duration}</td>
                  <td>
                    <span className={`status ${plan.status}`} style={{ 
                      color: plan.status === 'active' ? 'green' : 'red'
                    }}>
                      {plan.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-outline" 
                      style={{ marginRight: '0.5rem' }}
                      onClick={() => handleEdit(plan)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn" 
                      style={{ backgroundColor: '#f72585', color: 'white' }}
                      onClick={() => handleDelete(plan.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ width: '500px', maxWidth: '90%' }}>
            <div className="card-header">
              <h2 className="card-title">
                {editingPlan ? 'Edit Plan' : 'Add New Plan'}
              </h2>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label className="form-label">Plan Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    defaultValue={editingPlan?.name || ''}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Price</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    defaultValue={editingPlan?.price || ''}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <select className="form-input" defaultValue={editingPlan?.duration || 'monthly'}>
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-input" defaultValue={editingPlan?.status || 'active'}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="card-footer">
              <button 
                className="btn btn-primary"
                onClick={() => setShowForm(false)}
              >
                {editingPlan ? 'Update Plan' : 'Create Plan'}
              </button>
              <button 
                className="btn btn-outline" 
                style={{ marginLeft: '1rem' }}
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlansManagement;

