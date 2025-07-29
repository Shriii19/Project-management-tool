import React from 'react';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  ClipboardDocumentListIcon, 
  InformationCircleIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useApp } from '../../context/AppContext';

const Header = () => {
  const { activePage, setActivePage, isAuthenticated, user, logout } = useApp();

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
        { id: 'login', label: 'Login', icon: UserIcon },
        { id: 'signup', label: 'Sign Up', icon: UserPlusIcon }
      ];

  const handleNavClick = (item) => {
    if (item.action) {
      item.action();
    } else {
      setActivePage(item.id);
    }
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActivePage('dashboard')}
            >
              <div className="brand-icon">
                <ClipboardDocumentListIcon className="w-8 h-8" />
              </div>
              <div className="brand-text">
                <h1>ProjectFlow</h1>
                <span>Task Management</span>
              </div>
            </motion.div>

            {/* Navigation Links */}
            <div className="navbar-nav">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(item)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Auth Section */}
            <div className="navbar-auth">
              {authItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    className={`auth-link ${activePage === item.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(item)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border-color);
        }

        .navbar {
          padding: 1rem 0;
        }

        .navbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          color: var(--primary-color);
        }

        .brand-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
          border-radius: var(--radius-lg);
          color: white;
        }

        .brand-text h1 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .brand-text span {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .navbar-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
          justify-content: center;
        }

        .nav-link, .auth-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          background: none;
          border: none;
          color: var(--text-secondary);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          position: relative;
        }

        .nav-link:hover, .auth-link:hover {
          color: var(--primary-color);
          background-color: var(--secondary-color);
        }

        .nav-link.active, .auth-link.active {
          color: var(--primary-color);
          background-color: var(--secondary-color);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -1rem;
          left: 50%;
          transform: translateX(-50%);
          width: 2rem;
          height: 2px;
          background: var(--primary-color);
          border-radius: 1px;
        }

        .navbar-auth {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .auth-link {
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .navbar-content {
            flex-direction: column;
            gap: 1rem;
          }

          .navbar-nav {
            order: 3;
            width: 100%;
            justify-content: space-around;
          }

          .navbar-auth {
            order: 2;
          }

          .nav-link span, .auth-link span {
            display: none;
          }

          .brand-text span {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .navbar-nav {
            flex-wrap: wrap;
          }
          
          .nav-link, .auth-link {
            flex: 1;
            justify-content: center;
            min-width: auto;
          }
        }
      `}</style>
    </motion.header>
  );
};

export default Header;
