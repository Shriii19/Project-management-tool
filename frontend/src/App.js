import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/UI/Header';
import Dashboard from './components/Dashboard';
import TaskList from './components/Tasks/TaskList';
import About from './components/About';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/globals.css';

const AppContent = () => {
  const { activePage } = useApp();

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'tasks':
        return <TaskList />;
      case 'about':
        return <About />;
      case 'login':
        return <Login />;
      case 'signup':
        return <Signup />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="container">
          <AnimatePresence mode="wait">
            {renderPage()}
          </AnimatePresence>
        </div>
      </main>
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
