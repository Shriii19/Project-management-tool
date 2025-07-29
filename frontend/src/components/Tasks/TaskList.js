import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  ClockIcon,
  TrashIcon,
  PencilIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { useApp } from '../../context/AppContext';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { 
    filteredTasks, 
    loading, 
    filter, 
    searchTerm, 
    setFilter, 
    setSearch 
  } = useApp();
  
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // grid, list

  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All Tasks', icon: ClockIcon },
    { value: 'pending', label: 'Pending', icon: ClockIcon },
    { value: 'completed', label: 'Completed', icon: CheckCircleIcon },
    { value: 'high', label: 'High Priority', icon: FunnelIcon },
    { value: 'medium', label: 'Medium Priority', icon: FunnelIcon },
    { value: 'low', label: 'Low Priority', icon: FunnelIcon }
  ];

  const handleTaskEdit = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleTaskFormClose = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleSelectTask = (taskId) => {
    setSelectedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === filteredTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(filteredTasks.map(task => task._id));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
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
      className="task-list-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="task-list-header">
        <div className="header-title">
          <h1>Task Management</h1>
          <p>Organize and track your projects efficiently</p>
        </div>
        
        <motion.button
          className="btn btn-primary"
          onClick={() => setShowTaskForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusIcon className="w-5 h-5" />
          Add Task
        </motion.button>
      </div>

      {/* Filters and Search */}
      <div className="task-controls">
        {/* Search */}
        <div className="search-container">
          <MagnifyingGlassIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Filters */}
        <div className="filter-container">
          {filterOptions.map((option) => {
            const Icon = option.icon;
            return (
              <motion.button
                key={option.value}
                className={`filter-btn ${filter === option.value ? 'active' : ''}`}
                onClick={() => setFilter(option.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-4 h-4" />
                {option.label}
              </motion.button>
            );
          })}
        </div>

        {/* View Mode Toggle */}
        <div className="view-controls">
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedTasks.length > 0 && (
        <motion.div 
          className="bulk-actions"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="selection-info">
            <span>{selectedTasks.length} task{selectedTasks.length > 1 ? 's' : ''} selected</span>
            <button onClick={() => setSelectedTasks([])}>Clear</button>
          </div>
          <div className="bulk-buttons">
            <button className="btn btn-sm btn-danger">
              <TrashIcon className="w-4 h-4" />
              Delete Selected
            </button>
          </div>
        </motion.div>
      )}

      {/* Task Stats */}
      <div className="task-stats">
        <div className="stat">
          <span className="stat-value">{filteredTasks.length}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat">
          <span className="stat-value">{filteredTasks.filter(t => t.isDone).length}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat">
          <span className="stat-value">{filteredTasks.filter(t => !t.isDone).length}</span>
          <span className="stat-label">Pending</span>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading tasks...</p>
        </div>
      )}

      {/* Task Grid/List */}
      {!loading && (
        <motion.div 
          className={`task-grid ${viewMode}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  variants={itemVariants}
                  isSelected={selectedTasks.includes(task._id)}
                  onSelect={() => handleSelectTask(task._id)}
                  onEdit={() => handleTaskEdit(task)}
                  viewMode={viewMode}
                />
              ))
            ) : (
              <motion.div 
                className="empty-state"
                variants={itemVariants}
              >
                <div className="empty-icon">
                  <ClockIcon className="w-16 h-16" />
                </div>
                <h3>No tasks found</h3>
                <p>
                  {searchTerm 
                    ? `No tasks match "${searchTerm}"`
                    : filter !== 'all' 
                      ? `No tasks in "${filterOptions.find(f => f.value === filter)?.label}" filter`
                      : "You haven't created any tasks yet"
                  }
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowTaskForm(true)}
                >
                  <PlusIcon className="w-5 h-5" />
                  Create Your First Task
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Task Form Modal */}
      <AnimatePresence>
        {showTaskForm && (
          <TaskForm
            task={editingTask}
            onClose={handleTaskFormClose}
          />
        )}
      </AnimatePresence>

      <style jsx>{`
        .task-list-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .task-list-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
        }

        .header-title h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .header-title p {
          color: var(--text-secondary);
          font-size: 1.1rem;
          margin: 0.5rem 0 0 0;
        }

        .task-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding: 1.5rem;
          background: var(--background-light);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-color);
        }

        .search-container {
          position: relative;
          flex: 1;
          min-width: 250px;
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          width: 1.25rem;
          height: 1.25rem;
          color: var(--text-secondary);
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 0.75rem 0.75rem 2.5rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          transition: all 0.2s ease-in-out;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .filter-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          background: var(--background-light);
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .filter-btn:hover {
          border-color: var(--primary-color);
          color: var(--primary-color);
        }

        .filter-btn.active {
          background: var(--primary-color);
          border-color: var(--primary-color);
          color: white;
        }

        .view-controls {
          display: flex;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .view-btn {
          padding: 0.5rem 1rem;
          border: none;
          background: var(--background-light);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .view-btn.active {
          background: var(--primary-color);
          color: white;
        }

        .bulk-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: var(--secondary-color);
          border-radius: var(--radius-md);
          margin-bottom: 1rem;
        }

        .selection-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .selection-info button {
          background: none;
          border: none;
          color: var(--primary-color);
          cursor: pointer;
          text-decoration: underline;
        }

        .bulk-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .task-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 1.5rem;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-color);
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem;
          gap: 1rem;
        }

        .task-grid {
          display: grid;
          gap: 1.5rem;
        }

        .task-grid.grid {
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }

        .task-grid.list {
          grid-template-columns: 1fr;
        }

        .empty-state {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem;
          text-align: center;
        }

        .empty-icon {
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          max-width: 400px;
        }

        @media (max-width: 768px) {
          .task-list-header {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }

          .task-controls {
            flex-direction: column;
            gap: 1rem;
          }

          .filter-container {
            justify-content: center;
          }

          .task-stats {
            justify-content: space-around;
          }

          .task-grid.grid {
            grid-template-columns: 1fr;
          }

          .bulk-actions {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default TaskList;
