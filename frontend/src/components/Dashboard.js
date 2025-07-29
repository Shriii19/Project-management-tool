import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  ExclamationTriangleIcon,
  PlusIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { tasks, setActivePage } = useApp();

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isDone).length;
  const pendingTasks = totalTasks - completedTasks;
  const highPriorityTasks = tasks.filter(task => task.priority === 'High' && !task.isDone).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Get overdue tasks (simplified - checking if due date is past)
  const today = new Date();
  const overdueTasks = tasks.filter(task => {
    if (!task.dueDate || task.isDone) return false;
    return new Date(task.dueDate) < today;
  }).length;

  // Get recent tasks (last 5)
  const recentTasks = tasks
    .sort((a, b) => new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now()))
    .slice(0, 5);

  const stats = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: ChartBarIcon,
      color: 'blue',
      trend: '+12%'
    },
    {
      title: 'Completed',
      value: completedTasks,
      icon: CheckCircleIcon,
      color: 'green',
      trend: `${completionRate}%`
    },
    {
      title: 'Pending',
      value: pendingTasks,
      icon: ClockIcon,
      color: 'yellow',
      trend: '-5%'
    },
    {
      title: 'High Priority',
      value: highPriorityTasks,
      icon: ExclamationTriangleIcon,
      color: 'red',
      trend: `${highPriorityTasks} urgent`
    }
  ];

  const quickActions = [
    {
      title: 'Add New Task',
      description: 'Create a new task quickly',
      icon: PlusIcon,
      action: () => setActivePage('tasks'),
      color: 'blue'
    },
    {
      title: 'View All Tasks',
      description: 'Manage your task list',
      icon: ChartBarIcon,
      action: () => setActivePage('tasks'),
      color: 'green'
    },
    {
      title: 'Analytics',
      description: 'View performance metrics',
      icon: ArrowTrendingUpIcon,
      action: () => setActivePage('analytics'),
      color: 'purple'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      className="dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Section */}
      <motion.div className="welcome-section" variants={itemVariants}>
        <div className="welcome-content">
          <h1>Welcome back! 👋</h1>
          <p>Here's what's happening with your projects today.</p>
        </div>
        <motion.button 
          className="btn btn-primary"
          onClick={() => setActivePage('tasks')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusIcon className="w-5 h-5" />
          Add Task
        </motion.button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div className="stats-grid" variants={itemVariants}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              className={`stat-card stat-${stat.color}`}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="stat-icon">
                <Icon className="w-6 h-6" />
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
                <span className="stat-trend">{stat.trend}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Content Grid */}
      <div className="main-grid">
        {/* Quick Actions */}
        <motion.div className="quick-actions" variants={itemVariants}>
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.title}
                  className={`action-card action-${action.color}`}
                  onClick={action.action}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="action-icon">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="action-content">
                    <h3>{action.title}</h3>
                    <p>{action.description}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Tasks */}
        <motion.div className="recent-tasks" variants={itemVariants}>
          <div className="section-header">
            <h2>Recent Tasks</h2>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setActivePage('tasks')}
            >
              View All
            </button>
          </div>
          <div className="tasks-list">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <motion.div
                  key={task._id}
                  className="task-item"
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                >
                  <div className="task-status">
                    <div className={`status-indicator ${task.isDone ? 'completed' : 'pending'}`} />
                  </div>
                  <div className="task-content">
                    <h4 className={task.isDone ? 'completed' : ''}>{task.taskName}</h4>
                    <div className="task-meta">
                      <span className={`priority priority-${task.priority.toLowerCase()}`}>
                        {task.priority}
                      </span>
                      {task.dueDate && (
                        <span className="due-date">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="empty-state">
                <p>No tasks yet. Start by creating your first task!</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setActivePage('tasks')}
                >
                  Create Task
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Alerts */}
      {overdueTasks > 0 && (
        <motion.div 
          className="alert alert-warning"
          variants={itemVariants}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <ExclamationTriangleIcon className="w-5 h-5" />
          <span>You have {overdueTasks} overdue task{overdueTasks > 1 ? 's' : ''}!</span>
          <button 
            className="btn btn-sm"
            onClick={() => setActivePage('tasks')}
          >
            View Tasks
          </button>
        </motion.div>
      )}

      <style jsx>{`
        .dashboard {
          padding: 2rem 0;
          max-width: 1200px;
          margin: 0 auto;
        }

        .welcome-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding: 0 1rem;
        }

        .welcome-content h1 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .welcome-content p {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
          padding: 0 1rem;
        }

        .stat-card {
          background: var(--background-light);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.2s ease-in-out;
        }

        .stat-icon {
          width: 3rem;
          height: 3rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .stat-blue .stat-icon { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
        .stat-green .stat-icon { background: linear-gradient(135deg, #10b981, #047857); }
        .stat-yellow .stat-icon { background: linear-gradient(135deg, #f59e0b, #d97706); }
        .stat-red .stat-icon { background: linear-gradient(135deg, #ef4444, #dc2626); }

        .stat-content h3 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .stat-content p {
          color: var(--text-secondary);
          margin: 0;
          font-weight: 500;
        }

        .stat-trend {
          font-size: 0.875rem;
          color: var(--accent-color);
          font-weight: 600;
        }

        .main-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 2rem;
          padding: 0 1rem;
        }

        .quick-actions h2,
        .recent-tasks h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .actions-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .action-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--background-light);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          text-align: left;
        }

        .action-card:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--primary-color);
        }

        .action-icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .action-blue .action-icon { background: var(--primary-color); }
        .action-green .action-icon { background: var(--accent-color); }
        .action-purple .action-icon { background: #8b5cf6; }

        .action-content h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .action-content p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .recent-tasks {
          background: var(--background-light);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-color);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .tasks-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .task-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          transition: all 0.2s ease-in-out;
        }

        .task-item:hover {
          background-color: var(--secondary-color);
        }

        .status-indicator {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
        }

        .status-indicator.completed {
          background-color: var(--accent-color);
        }

        .status-indicator.pending {
          background-color: var(--warning-color);
        }

        .task-content {
          flex: 1;
        }

        .task-content h4 {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-primary);
          margin: 0 0 0.25rem 0;
        }

        .task-content h4.completed {
          text-decoration: line-through;
          color: var(--text-secondary);
        }

        .task-meta {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .priority {
          font-size: 0.75rem;
          padding: 0.125rem 0.5rem;
          border-radius: 9999px;
          font-weight: 500;
        }

        .priority-high {
          background-color: #fee2e2;
          color: #dc2626;
        }

        .priority-medium {
          background-color: #fef3c7;
          color: #b45309;
        }

        .priority-low {
          background-color: #dbeafe;
          color: #1d4ed8;
        }

        .due-date {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .empty-state {
          text-align: center;
          padding: 2rem;
          color: var(--text-secondary);
        }

        .alert {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: var(--radius-md);
          margin: 2rem 1rem 0;
        }

        .alert-warning {
          background-color: #fef3c7;
          border: 1px solid #f59e0b;
          color: #b45309;
        }

        @media (max-width: 768px) {
          .welcome-section {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .main-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Dashboard;
