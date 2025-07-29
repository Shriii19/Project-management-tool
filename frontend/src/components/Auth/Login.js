import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserIcon, 
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useApp } from '../../context/AppContext';

const Login = () => {
  const { setActivePage } = useApp();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, accept any valid email/password
      if (formData.email && formData.password) {
        // Mock successful login
        setActivePage('dashboard');
        // In real app, you would set user data here
      }
      setLoading(false);
    }, 1000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="auth-container">
      <motion.div 
        className="auth-card"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="auth-header">
          <motion.div 
            className="auth-icon"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <UserIcon className="w-8 h-8" />
          </motion.div>
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="input-wrapper">
              <UserIcon className="input-icon" />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <span className="error-message">
                <ExclamationTriangleIcon className="w-4 h-4" />
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-wrapper">
              <LockClosedIcon className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="error-message">
                <ExclamationTriangleIcon className="w-4 h-4" />
                {errors.password}
              </span>
            )}
          </div>

          {/* Options */}
          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" className="form-checkbox" />
              <span>Remember me</span>
            </label>
            <button type="button" className="link-button">
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <div className="loading-spinner" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          <p>Don't have an account?</p>
          <button 
            className="link-button"
            onClick={() => setActivePage('signup')}
          >
            Sign up here
          </button>
        </div>

        {/* Demo Notice */}
        <div className="demo-notice">
          <p>📝 Demo Mode: Use any valid email and password (6+ characters)</p>
        </div>
      </motion.div>

      <style jsx>{`
        .auth-container {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
        }

        .auth-card {
          width: 100%;
          max-width: 400px;
          background: var(--background-light);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-color);
          overflow: hidden;
        }

        .auth-header {
          text-align: center;
          padding: 2rem 2rem 1rem;
          background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
          color: white;
        }

        .auth-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 4rem;
          height: 4rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          margin-bottom: 1rem;
          backdrop-filter: blur(10px);
        }

        .auth-header h1 {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
        }

        .auth-header p {
          opacity: 0.9;
          margin: 0;
        }

        .auth-form {
          padding: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          width: 1.25rem;
          height: 1.25rem;
          color: var(--text-secondary);
        }

        .form-input {
          width: 100%;
          padding: 0.75rem 0.75rem 0.75rem 2.5rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          transition: all 0.2s ease-in-out;
          background: var(--background-light);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-input.error {
          border-color: var(--error-color);
        }

        .password-toggle {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0.25rem;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease-in-out;
        }

        .password-toggle:hover {
          color: var(--primary-color);
          background: var(--secondary-color);
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: var(--error-color);
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .form-checkbox {
          width: 1rem;
          height: 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          cursor: pointer;
        }

        .form-checkbox:checked {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
        }

        .link-button {
          background: none;
          border: none;
          color: var(--primary-color);
          cursor: pointer;
          font-size: 0.875rem;
          text-decoration: underline;
          padding: 0;
        }

        .link-button:hover {
          color: var(--primary-dark);
        }

        .auth-footer {
          text-align: center;
          padding: 1rem 2rem 2rem;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .auth-footer p {
          margin: 0 0 0.5rem 0;
        }

        .demo-notice {
          background: var(--secondary-color);
          padding: 1rem 2rem;
          border-top: 1px solid var(--border-color);
          text-align: center;
        }

        .demo-notice p {
          margin: 0;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .auth-container {
            padding: 1rem;
          }

          .auth-card {
            max-width: none;
          }

          .form-options {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
