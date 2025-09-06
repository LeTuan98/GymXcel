import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Community from './pages/Community';
import Goals from './pages/Goals';
import UserProfile from './pages/UserProfile';
import FAQ from './pages/FAQ';
import Recipes from './pages/Recipes';
import Challenges from './pages/Challenges';
import Analytics from './pages/Analytics';
import Notifications from './pages/Notifications';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { NotificationProvider } from './contexts/NotificationContext';
import './App.css';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <NotificationProvider>
            <div className="App">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/" element={<Layout><Dashboard /></Layout>} />
                <Route path="/profile" element={<Layout><Profile /></Layout>} />
                <Route path="/profile/edit" element={<Layout><EditProfile /></Layout>} />
                <Route path="/community" element={<Layout><Community /></Layout>} />
                <Route path="/goals" element={<Layout><Goals /></Layout>} />
                <Route path="/user/:id" element={<Layout><UserProfile /></Layout>} />
                <Route path="/faq" element={<Layout><FAQ /></Layout>} />
                <Route path="/recipes" element={<Layout><Recipes /></Layout>} />
                <Route path="/challenges" element={<Layout><Challenges /></Layout>} />
                <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
                <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
              </Routes>
            </div>
          </NotificationProvider>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;