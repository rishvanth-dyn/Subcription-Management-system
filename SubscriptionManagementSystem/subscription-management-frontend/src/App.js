import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Subscriptions from './components/User/Subscriptions';
import SubscriptionDetail from './components/User/SubscriptionDetail';
import Recommendations from './components/User/Recommendations';
import PlansManagement from './components/Admin/PlansManagement';
import DiscountsManagement from './components/Admin/DiscountsManagement';
import AnalyticsDashboard from './components/Admin/AnalyticsDashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Subscriptions />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/subscription/:id" element={<SubscriptionDetail />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/admin/plans" element={<PlansManagement />} />
              <Route path="/admin/discounts" element={<DiscountsManagement />} />
              <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

