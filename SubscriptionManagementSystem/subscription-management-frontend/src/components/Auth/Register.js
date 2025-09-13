import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      const result = await register(formData);
      
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to create an account');
    }
    
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Create Your Account</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button 
            disabled={loading} 
            className="btn btn-primary" 
            type="submit"
            style={{ width: '100%' }}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

