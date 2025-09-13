import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <i className="fas fa-money-check-alt"></i>
          <span>SubSmart</span>
        </Link>

        <nav className="nav">
          <ul>
            <li><Link to="/subscriptions">My Subscriptions</Link></li>
            <li><Link to="/recommendations">Recommendations</Link></li>
            {currentUser?.role === 'admin' && (
              <>
                <li><Link to="/admin/plans">Plans</Link></li>
                <li><Link to="/admin/discounts">Discounts</Link></li>
                <li><Link to="/admin/analytics">Analytics</Link></li>
              </>
            )}
          </ul>
        </nav>

        <div className="auth-buttons">
          {currentUser ? (
            <>
              <span>Welcome, {currentUser.name}</span>
              <button onClick={handleLogout} className="btn btn-outline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
