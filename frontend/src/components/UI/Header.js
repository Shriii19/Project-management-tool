import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HomeIcon, 
  ClipboardDocumentListIcon, 
  InformationCircleIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { useApp } from '../../context/AppContext';

const Header = () => {
  const { activePage, setActivePage, isAuthenticated, user, logout } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsGetStartedOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigationItems = [
    { id: 'dashboard', label: 'Home', icon: HomeIcon },
    { id: 'about', label: 'About', icon: InformationCircleIcon },
    { id: 'tasks', label: 'Projects', icon: ClipboardDocumentListIcon },
    { id: 'contact', label: 'Contact', icon: UserIcon }
  ];

  const authItems = isAuthenticated 
    ? [
        { id: 'profile', label: user?.name || 'Profile', icon: UserIcon },
        { id: 'logout', label: 'Logout', icon: 'ArrowRightOnRectangleIcon', action: logout }
      ]
    : [
        { id: 'get-started', label: 'Get Started', icon: UserPlusIcon, isGetStarted: true }
      ];

  const handleNavClick = (item) => {
    if (item.action) {
      item.action();
    } else if (item.isGetStarted) {
      setIsGetStartedOpen(!isGetStartedOpen);
    } else {
      setActivePage(item.id);
    }
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
  };

  return (
    <motion.header 
      className="header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            {/* Logo/Brand - Clean Professional Style */}
            <motion.div 
              className="navbar-brand"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActivePage('dashboard')}
            >
              <div className="brand-logo">
                <span className="logo-accent">project management </span>
              </div>
            </motion.div>

            {/* Navigation Links + Auth Section - All on Right */}
            <div className="navbar-right">
              {/* Navigation Links */}
              <div className="navbar-nav">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                      onClick={() => handleNavClick(item)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </motion.button>
                  );
                })}
              </div>

              {/* Auth Section */}
              <div className="navbar-auth desktop-only">
                {authItems.map((item, index) => {
                  const Icon = item.icon;
                  const isLogout = item.id === 'logout';
                  const isGetStarted = item.isGetStarted;
                  
                  if (isGetStarted) {
                    return (
                      <div key={item.id} className="get-started-container" ref={dropdownRef}>
                        <motion.button
                          className="auth-link get-started-btn"
                          onClick={() => handleNavClick(item)}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.96 }}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                          <ChevronDownIcon className={`w-4 h-4 transition-transform ${isGetStartedOpen ? 'rotate-180' : ''}`} />
                        </motion.button>
                        
                        <AnimatePresence>
                          {isGetStartedOpen && (
                            <motion.div
                              className="get-started-dropdown"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <motion.button
                                className="dropdown-item"
                                onClick={() => {
                                  setActivePage('login');
                                  setIsGetStartedOpen(false);
                                }}
                                whileHover={{ x: 4 }}
                              >
                                <UserIcon className="w-4 h-4" />
                                <span>Login</span>
                              </motion.button>
                              <motion.button
                                className="dropdown-item"
                                onClick={() => {
                                  setActivePage('signup');
                                  setIsGetStartedOpen(false);
                                }}
                                whileHover={{ x: 4 }}
                              >
                                <UserPlusIcon className="w-4 h-4" />
                                <span>Sign Up</span>
                              </motion.button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }
                  
                  return (
                    <motion.button
                      key={item.id}
                      className={`auth-link ${activePage === item.id ? 'active' : ''} ${isLogout ? 'logout-btn' : ''}`}
                      onClick={() => handleNavClick(item)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="mobile-menu-toggle mobile-only"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="mobile-menu mobile-only"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mobile-menu-content">
                  {/* Mobile Auth Section */}
                  <div className="mobile-auth-section">
                    {isAuthenticated ? (
                      authItems.map((item) => {
                        const Icon = item.icon;
                        const isLogout = item.id === 'logout';
                        return (
                          <motion.button
                            key={item.id}
                            className={`mobile-auth-link ${activePage === item.id ? 'active' : ''} ${isLogout ? 'logout-btn' : ''}`}
                            onClick={() => handleNavClick(item)}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                          </motion.button>
                        );
                      })
                    ) : (
                      <>
                        <motion.button
                          className="mobile-auth-link"
                          onClick={() => {
                            setActivePage('login');
                            setIsMobileMenuOpen(false);
                          }}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <UserIcon className="w-5 h-5" />
                          <span>Login</span>
                        </motion.button>
                        <motion.button
                          className="mobile-auth-link signup-btn"
                          onClick={() => {
                            setActivePage('signup');
                            setIsMobileMenuOpen(false);
                          }}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <UserPlusIcon className="w-5 h-5" />
                          <span>Sign Up</span>
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <style jsx>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .navbar {
          padding: 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .navbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 60px;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-left: auto;
        }

        .navbar-brand {
          cursor: pointer;
          display: flex;
          align-items: center;
          margin-right: auto;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .logo-text {
          color: #374151;
          font-weight: 600;
        }

        .logo-accent {
          color: #dc2626;
          font-weight: 600;
        }

        .navbar-nav {
          display: flex;
          align-items: center;
          gap: 0;
          flex-direction: row;
        }

        .nav-link {
          display: flex;
          margin -left: auto;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: none;
          border: none;
          color: #6b7280;
          font-weight: 400;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          white-space: nowrap;
          height: 60px;
          border-bottom: 3px solid transparent;
        }

        .nav-link:hover {
          color: #374151;
          background-color: #f9fafb;
        }

        .nav-link.active {
          color: #dc2626;
          border-bottom-color: #dc2626;
          background-color: #fef2f2;
        }

        .navbar-auth {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .auth-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.25rem;
          border-radius: 6px;
          background: none;
          border: 1px solid #d1d5db;
          color: #374151;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          white-space: nowrap;
        }

        .auth-link:hover {
          background-color: #f9fafb;
          border-color: #9ca3af;
        }

        .auth-link.signup-btn {
          background: #dc2626;
          color: white;
          border-color: #dc2626;
          font-weight: 600;
        }

        .auth-link.signup-btn:hover {
          background: #b91c1c;
          border-color: #b91c1c;
        }

        .auth-link.get-started-btn {
          background: #dc2626;
          color: white;
          border-color: #dc2626;
          font-weight: 600;
        }

        .auth-link.get-started-btn:hover {
          background: #b91c1c;
          border-color: #b91c1c;
        }

        .auth-link.logout-btn:hover {
          color: #dc2626;
          border-color: #dc2626;
          background-color: #fef2f2;
        }

        /* Get Started Dropdown Styles */
        .get-started-container {
          position: relative;
        }

        .get-started-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          border: 1px solid #e5e7eb;
          overflow: hidden;
          min-width: 160px;
          z-index: 1000;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem 1rem;
          border: none;
          background: none;
          color: #374151;
          font-weight: 400;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .dropdown-item:hover {
          background-color: #f9fafb;
          color: #dc2626;
        }

        .dropdown-item:not(:last-child) {
          border-bottom: 1px solid #f3f4f6;
        }

        /* Mobile Menu Styles */
        .mobile-menu-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border: 1px solid #d1d5db;
          background: white;
          color: #6b7280;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .mobile-menu-toggle:hover {
          background-color: #f9fafb;
          border-color: #9ca3af;
        }

        .mobile-menu {
          overflow: hidden;
          border-top: 1px solid #e5e7eb;
          background: white;
        }

        .mobile-menu-content {
          padding: 1rem 0;
        }

        .mobile-auth-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0 1rem;
        }

        .mobile-auth-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border: none;
          background: none;
          color: #374151;
          font-weight: 400;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          width: 100%;
          border-radius: 6px;
        }

        .mobile-auth-link:hover {
          background-color: #f9fafb;
        }

        .mobile-auth-link.signup-btn {
          background: #dc2626;
          color: white;
          font-weight: 600;
          margin-top: 0.5rem;
        }

        .mobile-auth-link.signup-btn:hover {
          background: #b91c1c;
        }

        .mobile-auth-link.logout-btn:hover {
          color: #dc2626;
          background-color: #fef2f2;
        }

        /* Responsive Utilities */
        .desktop-only {
          display: flex;
        }

        .mobile-only {
          display: none;
        }

        /* Ensure horizontal layout on desktop */
        @media (min-width: 769px) {
          .navbar-nav {
            display: flex !important;
            flex-direction: row !important;
            align-items: center;
            gap: 0;
          }
          
          .navbar-right {
            display: flex !important;
            align-items: center;
            gap: 2rem;
            margin-left: auto;
            flex-direction: row !important;
          }
          
          .navbar-brand {
            margin-right: auto;
          }
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .container {
            padding: 0 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none;
          }

          .mobile-only {
            display: flex;
          }

          .container {
            padding: 0 1rem;
          }

          .navbar-content {
            position: relative;
          }

          .navbar-right {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border-top: 1px solid #e5e7eb;
            flex-direction: column;
            gap: 0;
            padding: 1rem 0;
          }

          .navbar-nav {
            width: 100%;
            flex-direction: column;
            gap: 0;
          }

          .nav-link {
            width: 100%;
            justify-content: flex-start;
            padding: 1rem 1.5rem;
            border-bottom: none;
            height: auto;
          }

          .nav-link.active {
            background-color: #fef2f2;
            border-left: 3px solid #dc2626;
            border-bottom: none;
          }

          .nav-link:hover {
            background-color: #f9fafb;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 0.75rem;
          }

          .brand-logo {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </motion.header>
  );
};

export default Header;
