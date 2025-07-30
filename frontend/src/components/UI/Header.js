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
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Outside click for dropdown
  useEffect(() => {
    if (!authDropdownOpen) return;
    const handle = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setAuthDropdownOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [authDropdownOpen]);

  const navigationItems = [
    { id: 'dashboard', label: 'Home', icon: HomeIcon },
    { id: 'about', label: 'About', icon: InformationCircleIcon },
    { id: 'tasks', label: 'Projects', icon: ClipboardDocumentListIcon },
    { id: 'contact', label: 'Contact', icon: UserIcon }
  ];

  // User/auth section: avatar dropdown if authenticated
  const authSection = isAuthenticated ? (
    <div className="auth-menu" ref={dropdownRef}>
      <motion.button
        className="avatar-btn"
        onClick={() => setAuthDropdownOpen(v => !v)}
        whileTap={{ scale: 0.95 }}
      >
        <span className="avatar">{user?.name?.[0]?.toUpperCase() || "U"}</span>
        <ChevronDownIcon className={`chev ${authDropdownOpen ? 'flip' : ''}`} />
      </motion.button>
      <AnimatePresence>
        {authDropdownOpen && (
          <motion.div
            className="dropdown"
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <button className="drop-link" onClick={() => { setActivePage('profile'); setAuthDropdownOpen(false); }}>
              <UserIcon className="w-4 h-4" />
              <span>Profile</span>
            </button>
            <button className="drop-link" onClick={() => { logout(); setAuthDropdownOpen(false); }}>
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ) : (
    <div className="auth-menu" ref={dropdownRef}>
      <motion.button
        className="cta-btn"
        onClick={() => setAuthDropdownOpen(v => !v)}
        whileTap={{ scale: 0.95 }}
      >
        <UserPlusIcon className="w-4 h-4" />
        <span>Get Started</span>
        <ChevronDownIcon className={`chev ${authDropdownOpen ? 'flip' : ''}`} />
      </motion.button>
      <AnimatePresence>
        {authDropdownOpen && (
          <motion.div
            className="dropdown"
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <button className="drop-link" onClick={() => { setActivePage('login'); setAuthDropdownOpen(false); }}>
              <UserIcon className="w-4 h-4" />
              <span>Log in</span>
            </button>
            <button className="drop-link" onClick={() => { setActivePage('signup'); setAuthDropdownOpen(false); }}>
              <UserPlusIcon className="w-4 h-4" />
              <span>Sign Up</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <motion.header
      className="header-modern"
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <nav className="nav-modern">
        <div className="nav-inner">
          <div tabIndex={0} role="button" className="brand" onClick={() => setActivePage('dashboard')}>
            <span className="brand-accent">project</span>
            <span className="brand-main">manager</span>
          </div>
          <div className="nav-section desktop-nav" style={{ marginLeft: 'auto', marginRight: '2rem' }}>
            {navigationItems.map(item => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  className={`nav-link-modern ${activePage === item.id ? 'active' : ''}`}
                  onClick={() => setActivePage(item.id)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  <span className="bar" aria-hidden />
                </motion.button>
              );
            })}
          </div>
          <div className="nav-section">
            {authSection}
          </div>
          {/* Mobile burger */}
          <motion.button
            className="burger mobile-only"
            onClick={() => setIsMobileMenuOpen(v => !v)}
            whileTap={{ scale: 0.95 }}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
          </motion.button>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mob-sheet"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <div className="mob-links">
                {navigationItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      className={`mob-link ${activePage === item.id ? 'active' : ''}`}
                      onClick={() => { setActivePage(item.id); setIsMobileMenuOpen(false); }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>
              <hr className="mob-divider" />
              <div className="mob-auth">
                {isAuthenticated ? (
                  <>
                    <motion.button className="mob-link" onClick={() => { setActivePage('profile'); setIsMobileMenuOpen(false); }}>
                      <UserIcon className="w-5 h-5" />
                      <span>Profile</span>
                    </motion.button>
                    <motion.button className="mob-link" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      <span>Logout</span>
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.button className="mob-link" onClick={() => { setActivePage('login'); setIsMobileMenuOpen(false); }}>
                      <UserIcon className="w-5 h-5" />
                      <span>Log in</span>
                    </motion.button>
                    <motion.button className="mob-link mob-cta" onClick={() => { setActivePage('signup'); setIsMobileMenuOpen(false); }}>
                      <UserPlusIcon className="w-5 h-5" />
                      <span>Get Started</span>
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <style jsx>{`
        .header-modern {
          position: sticky;
          top: 0;
          z-index: 50;
          background: #fff;
          border-bottom: 1px solid #ececec;
          box-shadow: 0 1px 8px 0 rgba(0,0,0,0.04);
          min-height: 64px;
        }
        .nav-modern {
          width: 100%;
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 0.5rem;
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
          gap: 0.5rem;
        }
        .brand {
          display: flex;
          font-size: 1.6rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }
        .brand-accent {
          color: #dc2626;
        }
        .brand-main {
          color: #222;
          margin-left: 4px;
        }
        .nav-section {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-link-modern {
          background: none;
          border: none;
          outline: none;
          font: inherit;
          color: #475569;
          padding: 0 0.5rem;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
          cursor: pointer;
          height: 44px;
          transition: color 0.15s cubic-bezier(.4,0,.2,1);
        }
        .nav-link-modern .bar {
          display: block;
          height: 2.5px;
          width: 0;
          position: absolute;
          left: 50%;
          bottom: -2px;
          background: #dc2626;
          border-radius: 2px;
          transition: width 0.2s, left 0.2s;
        }
        .nav-link-modern.active .bar {
          width: 70%;
          left: 15%;
        }
        .nav-link-modern.active, .nav-link-modern:focus-visible {
          color: #dc2626;
        }
        .nav-link-modern:hover:not(.active) {
          color: #222;
          background: #f5f5f5;
        }

        /* Auth section */
        .auth-row {
          display: flex;
          gap: 0.5rem;
        }
        .text-btn {
          border: none;
          background: none;
          color: #475569;
          font-weight: 500;
          font-size: 1rem;
          padding: 0 0.7rem;
          border-radius: 5px;
          transition: background 0.13s;
          cursor: pointer;
        }
        .text-btn:hover {
          background: #f3f4f6;
          color: #222;
        }
        .cta-btn {
          background: #dc2626;
          color: #fff;
          border: none;
          font-weight: bold;
          font-size: 1rem;
          padding: 0.5rem 1.12rem;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 1px 2px 0 rgba(220,38,38,0.1);
          transition: background 0.18s;
          cursor: pointer;
        }
        .cta-btn:hover { background: #b91c1c; }
        /* Avatar w/ dropdown */
        .auth-menu { position: relative; }
        .avatar-btn {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 1rem;
          padding: 0.15rem 0.65rem;
          border-radius: 5px;
          transition: background .13s;
        }
        .avatar-btn:hover { background: #f9fafb; }
        .avatar {
          display: flex;
          width: 2rem; height: 2rem;
          background: #fee2e2;
          color: #dc2626;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-weight: bold;
          font-size: 1.1rem;
          letter-spacing: 0.01em;
        }
        .chev {
          width: 1.2rem; height: 1.2rem;
          transition: transform .17s;
        }
        .chev.flip { transform: rotate(180deg);}
        .dropdown {
          position: absolute;
          z-index: 99;
          right: 0;
          top: 120%;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          min-width: 172px;
          padding: 0.4rem 0;
          border: 1px solid #eee;
          display: flex;
          flex-direction: column;
        }
        .drop-link {
          display: flex;
          gap: 0.6rem;
          align-items: center;
          padding: 0.7rem 1.2rem;
          background: none;
          border: none;
          color: #222;
          font-size: 1rem;
          transition: background .14s, color .14s;
          cursor: pointer;
        }
        .drop-link:hover {
          background: #f3f4f6;
          color: #dc2626;
        }

        /* Burger/mobile menu */
        .burger {
          display: none;
          background: none;
          border: none;
          padding: 0.3rem 0.3rem;
          align-items: center;
          color: #222;
        }
        @media (max-width: 850px) {
          .desktop-nav { display: none; }
          .burger { display: flex; }
          .nav-section:not(:first-child):not(:last-child){ display: none; }
        }
        /* Mobile sheet */
        .mob-sheet {
          position: absolute;
          left: 0; right: 0;
          top: 68px;
          background: #fff;
          border-bottom: 1.5px solid #f3f4f6;
          box-shadow: 0 4px 32px 0 rgba(0,0,0,0.06);
        }
        .mob-links, .mob-auth {
          display: flex;
          flex-direction: column;
        }
        .mob-links { padding: 0.6rem 1.25rem 0.2rem;}
        .mob-auth { padding: 0.4rem 1.25rem 1rem;gap:0.3rem;}
        .mob-link {
          display: flex;
          gap: 0.6rem;
          align-items: center;
          padding: 0.9rem 0;
          font-size: 1.07rem;
          background: none;
          border: none;
          color: #444;
          transition: background .14s, color .14s;
          border-radius: 6px;
        }
        .mob-link:active, .mob-link.active { background: #fef2f2; color: #dc2626;}
        .mob-link.mob-cta {
          background: #dc2626;
          color: #fff;
          font-weight: bold;
          justify-content: center;
        }
        .mob-link.mob-cta:active, .mob-link.mob-cta:focus { background: #b91c1c; }
        .mob-divider { border: none; border-top: 1.2px solid #f3f4f6; width:90%;margin: 0.55rem auto 0.2rem; }
        /* Mobile overrides */
        @media (max-width: 520px) {
          .nav-modern { padding: 0 0.7rem;}
        }
      `}</style>
    </motion.header>
  );
};

export default Header;
