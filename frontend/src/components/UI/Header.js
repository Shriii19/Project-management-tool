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
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'tasks', label: 'Tasks', icon: ClipboardDocumentListIcon },
    { id: 'about', label: 'About', icon: InformationCircleIcon }
  ];

  const authItems = isAuthenticated 
    ? [
        { id: 'profile', label: user?.name || 'Profile', icon: UserIcon },
        { id: 'logout', label: 'Logout', icon: ArrowRightOnRectangleIcon, action: logout }
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
            {/* Logo/Brand */}
            <motion.div 
              className="navbar-brand"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActivePage('dashboard')}
            >
              <div className="brand-icon">
                <ClipboardDocumentListIcon className="w-7 h-7" />
              </div>
              <div className="brand-text">
                <h1>ProjectFlow</h1>
                <span>Task Management</span>
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
                      <span>{item.label}</span>
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
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 1px 20px rgba(0, 0, 0, 0.08);
        }

        .navbar {
          padding: 0.75rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .navbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          min-height: 4rem;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex: 1;
          justify-content: flex-end;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          cursor: pointer;
          color: var(--primary-color);
          flex-shrink: 0;
        }

        .brand-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.75rem;
          height: 2.75rem;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border-radius: 12px;
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .brand-text h1 {
          font-size: 1.375rem;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
        }

        .brand-text span {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          line-height: 1;
        }

        .navbar-center {
          flex: 1;
          display: flex;
          justify-content: center;
          max-width: 600px;
        }

        .navbar-nav {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          background: none;
          border: 1px solid transparent;
          color: #64748b;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          white-space: nowrap;
          min-height: 44px;
        }

        .nav-link:hover {
          color: #3b82f6;
          background-color: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.2);
          transform: translateY(-1px);
        }

        .nav-link.active {
          color: #3b82f6;
          background-color: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.3);
          font-weight: 600;
        }

        .navbar-auth {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
        }

        .auth-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          border-radius: 10px;
          background: none;
          border: 1px solid transparent;
          color: #64748b;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
        }

        .auth-link:hover {
          color: #3b82f6;
          border-color: rgba(59, 130, 246, 0.2);
          background-color: rgba(59, 130, 246, 0.05);
          transform: translateY(-1px);
        }

        .auth-link.active {
          color: #3b82f6;
          border-color: rgba(59, 130, 246, 0.3);
          background-color: rgba(59, 130, 246, 0.1);
        }

        .auth-link.signup-btn {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border: none;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }

        .auth-link.signup-btn:hover {
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
          color: white;
        }

        .auth-link.logout-btn:hover {
          color: #ef4444;
          border-color: rgba(239, 68, 68, 0.3);
          background-color: rgba(239, 68, 68, 0.1);
        }

        /* Get Started Dropdown Styles */
        .get-started-container {
          position: relative;
        }

        .auth-link.get-started-btn {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border: none;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          gap: 0.5rem;
        }

        .auth-link.get-started-btn:hover {
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
          color: white;
        }

        .get-started-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(0, 0, 0, 0.08);
          overflow: hidden;
          min-width: 160px;
          z-index: 1000;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.875rem 1.25rem;
          border: none;
          background: none;
          color: #64748b;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .dropdown-item:hover {
          color: #3b82f6;
          background-color: rgba(59, 130, 246, 0.05);
        }

        .dropdown-item:not(:last-child) {
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        /* Mobile Menu Styles */
        .mobile-menu-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border: none;
          background: none;
          color: #64748b;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .mobile-menu-toggle:hover {
          color: #3b82f6;
          background-color: rgba(59, 130, 246, 0.1);
        }

        .mobile-menu {
          overflow: hidden;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          background: white;
        }

        .mobile-menu-content {
          padding: 1rem 0;
        }

        .mobile-auth-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mobile-auth-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.5rem;
          border: none;
          background: none;
          color: #64748b;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          width: 100%;
        }

        .mobile-auth-link:hover {
          color: #3b82f6;
          background-color: rgba(59, 130, 246, 0.05);
          transform: translateX(4px);
        }

        .mobile-auth-link.signup-btn {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          margin: 0.5rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
        }

        .mobile-auth-link.signup-btn:hover {
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
          transform: translateX(0) scale(1.02);
        }

        .mobile-auth-link.logout-btn:hover {
          color: #ef4444;
          background-color: rgba(239, 68, 68, 0.1);
        }

        /* Responsive Utilities */
        .desktop-only {
          display: flex;
        }

        .mobile-only {
          display: none;
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .container {
            padding: 0 1rem;
          }
          
          .navbar-content {
            gap: 1.5rem;
          }
          
          .navbar-center {
            max-width: 400px;
          }
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none;
          }

          .mobile-only {
            display: flex;
          }

          .navbar {
            padding: 0.75rem 0 0;
          }
          
          .navbar-content {
            flex-direction: column;
            gap: 1rem;
            min-height: auto;
          }

          .navbar-right {
            order: 2;
            width: 100%;
            justify-content: center;
            flex-direction: column;
            gap: 1rem;
          }

          .navbar-nav {
            width: 100%;
            justify-content: space-between;
            gap: 0.25rem;
            background: rgba(248, 250, 252, 0.8);
            padding: 0.375rem;
            border-radius: 16px;
            border: 1px solid rgba(0, 0, 0, 0.06);
          }

          .nav-link {
            padding: 0.75rem 0.75rem;
            flex-direction: column;
            gap: 0.375rem;
            text-align: center;
            min-width: 0;
            flex: 1;
            min-height: 60px;
            border: none;
          }

          .nav-link:hover {
            background-color: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .nav-link.active {
            background-color: white;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
          }

          .nav-link span {
            font-size: 0.75rem;
            line-height: 1;
            font-weight: 500;
          }

          .brand-text span {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 0.75rem;
          }
          
          .navbar-content {
            gap: 0.75rem;
          }
          
          .brand-text h1 {
            font-size: 1.125rem;
          }
          
          .brand-icon {
            width: 2.5rem;
            height: 2.5rem;
          }
          
          .nav-link {
            padding: 0.625rem 0.75rem;
            min-width: 60px;
          }
          
          .nav-link span {
            font-size: 0.6875rem;
          }
        }
      `}</style>
    </motion.header>
  );
};

export default Header;
