import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserIcon, 
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationTriangleIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';
import { useApp } from '../../context/AppContext';

const Signup = () => {
  const { setActivePage } = useApp();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      // For demo purposes, accept any valid form data
      if (formData.email && formData.password) {
        // Mock successful signup
        setActivePage('dashboard');
        // In real app, you would create user account here
      }
      setLoading(false);
    }, 1500);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['#ef4444', '#f59e0b', '#eab308', '#22c55e', '#16a34a'];

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
        className="auth-card signup-card"
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
            <UserPlusIcon className="w-8 h-8" />
          </motion.div>
          <h1>Create Account</h1>
          <p>Join us to start managing your projects efficiently</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Full Name *
            </label>
            <div className="input-wrapper">
              <UserIcon className="input-icon" />
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className={`form-input ${errors.fullName ? 'error' : ''}`}
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </div>
            {errors.fullName && (
              <span className="error-message">
                <ExclamationTriangleIcon className="w-4 h-4" />
                {errors.fullName}
              </span>
            )}
          </div>

          {/* Username */}
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username *
            </label>
            <div className="input-wrapper">
              <UserIcon className="input-icon" />
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value.toLowerCase())}
                className={`form-input ${errors.username ? 'error' : ''}`}
                placeholder="Choose a username"
                autoComplete="username"
              />
            </div>
            {errors.username && (
              <span className="error-message">
                <ExclamationTriangleIcon className="w-4 h-4" />
                {errors.username}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address *
            </label>
            <div className="input-wrapper">
              <EnvelopeIcon className="input-icon" />
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

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <div className="input-wrapper">
              <PhoneIcon className="input-icon" />
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`form-input ${errors.phone ? 'error' : ''}`}
                placeholder="Enter your phone number (optional)"
                autoComplete="tel"
              />
            </div>
            {errors.phone && (
              <span className="error-message">
                <ExclamationTriangleIcon className="w-4 h-4" />
                {errors.phone}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password *
            </label>
            <div className="input-wrapper">
              <LockClosedIcon className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Create a strong password"
                autoComplete="new-password"
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
            {formData.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className="strength-fill"
                    style={{ 
                      width: `${(passwordStrength / 5) * 100}%`,
                      backgroundColor: strengthColors[passwordStrength - 1] || '#ef4444'
                    }}
                  />
                </div>
                <span 
                  className="strength-label"
                  style={{ color: strengthColors[passwordStrength - 1] || '#ef4444' }}
                >
                  {strengthLabels[passwordStrength - 1] || 'Very Weak'}
                </span>
              </div>
            )}
            {errors.password && (
              <span className="error-message">
                <ExclamationTriangleIcon className="w-4 h-4" />
                {errors.password}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password *
            </label>
            <div className="input-wrapper">
              <LockClosedIcon className="input-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="Confirm your password"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="error-message">
                <ExclamationTriangleIcon className="w-4 h-4" />
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Terms */}
          <div className="form-group">
            <label className="checkbox-label">
              <input type="checkbox" className="form-checkbox" required />
              <span>
                I agree to the <button type="button" className="link-button">Terms of Service</button> and{' '}
                <button type="button" className="link-button">Privacy Policy</button>
              </span>
            </label>
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
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          <p>Already have an account?</p>
          <button 
            className="link-button"
            onClick={() => setActivePage('login')}
          >
            Sign in here
          </button>
        </div>

        {/* Demo Notice */}
        <div className="demo-notice">
          <p>📝 Demo Mode: Fill out the form with valid data to create an account</p>
        </div>
      </motion.div>

      <style jsx>{`
        .signup-card {
          max-width: 450px;
        }

        .password-strength {
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .strength-bar {
          flex: 1;
          height: 4px;
          background: var(--border-color);
          border-radius: 2px;
          overflow: hidden;
        }

        .strength-fill {
          height: 100%;
          transition: all 0.3s ease-in-out;
          border-radius: 2px;
        }

        .strength-label {
          font-size: 0.75rem;
          font-weight: 500;
          min-width: 70px;
        }

        .checkbox-label span {
          font-size: 0.875rem;
          line-height: 1.4;
        }

        /* Inherit all other styles from Login component */
        .auth-container {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
        }

        .auth-card {
          width: 100%;
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

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          cursor: pointer;
          color: var(--text-secondary);
        }

        .form-checkbox {
          width: 1rem;
          height: 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          cursor: pointer;
          margin-top: 0.125rem;
          flex-shrink: 0;
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
          text-decoration: underline;
          padding: 0;
          font-size: inherit;
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
        }
      `}</style>
    </div>
  );
};

export default Signup;
