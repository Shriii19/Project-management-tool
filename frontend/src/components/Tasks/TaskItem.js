import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  ClockIcon,
  CalendarIcon,
  TrashIcon,
  PencilIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';
import { useTasks } from '../../hooks/useTasks';

const TaskItem = ({ 
  task, 
  variants, 
  isSelected, 
  onSelect, 
  onEdit, 
  viewMode = 'grid' 
}) => {
  const { toggleTaskCompletion, removeTask, loading } = useTasks();

  const handleToggleComplete = async (e) => {
    e.stopPropagation();
    await toggleTaskCompletion(task);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    await removeTask(task._id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(task);
  };

  const handleSelect = (e) => {
    e.stopPropagation();
    onSelect();
  };

  // Calculate if task is overdue
  const isOverdue = task.dueDate && !task.isDone && new Date(task.dueDate) < new Date();
  
  // Format due date
  const formatDueDate = (date) => {
    if (!date) return null;
    const dueDate = new Date(date);
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays === -1) return 'Due yesterday';
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays <= 7) return `Due in ${diffDays} days`;
    
    return dueDate.toLocaleDateString();
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <motion.div
      className={`task-item ${viewMode} ${task.isDone ? 'completed' : ''} ${isSelected ? 'selected' : ''} ${isOverdue ? 'overdue' : ''}`}
      variants={variants}
      whileHover={{ scale: viewMode === 'grid' ? 1.02 : 1.005, y: -2 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* Selection Checkbox */}
      <div className="task-select">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleSelect}
          className="select-checkbox"
        />
      </div>

      {/* Task Content */}
      <div className="task-content" onClick={handleEdit}>
        {/* Priority Indicator */}
        <div className={`priority-indicator priority-${getPriorityColor(task.priority)}`} />
        
        {/* Task Header */}
        <div className="task-header">
          <h3 className={`task-title ${task.isDone ? 'completed' : ''}`}>
            {task.taskName}
          </h3>
          <div className="task-status">
            <motion.button
              className={`status-btn ${task.isDone ? 'completed' : 'pending'}`}
              onClick={handleToggleComplete}
              disabled={loading}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {task.isDone ? (
                <CheckCircleIconSolid className="w-5 h-5" />
              ) : (
                <ClockIcon className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Task Meta */}
        <div className="task-meta">
          <div className="meta-row">
            <span className={`priority-badge priority-${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            
            {task.dueDate && (
              <div className={`due-date ${isOverdue ? 'overdue' : ''}`}>
                <CalendarIcon className="w-4 h-4" />
                <span>{formatDueDate(task.dueDate)}</span>
              </div>
            )}
          </div>

          {/* Progress/Description */}
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
        </div>

        {/* Overdue Warning */}
        {isOverdue && (
          <div className="overdue-warning">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <span>Overdue</span>
          </div>
        )}
      </div>

      {/* Task Actions */}
      <div className="task-actions">
        <motion.button
          className="action-btn edit-btn"
          onClick={handleEdit}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Edit task"
        >
          <PencilIcon className="w-4 h-4" />
        </motion.button>
        
        <motion.button
          className="action-btn delete-btn"
          onClick={handleDelete}
          disabled={loading}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Delete task"
        >
          <TrashIcon className="w-4 h-4" />
        </motion.button>
      </div>

      <style jsx>{`
        .task-item {
          display: flex;
          background: var(--background-light);
          border: 2px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          transition: all 0.2s ease-in-out;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .task-item:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--primary-color);
        }

        .task-item.selected {
          border-color: var(--primary-color);
          background: rgba(59, 130, 246, 0.05);
        }

        .task-item.completed {
          opacity: 0.7;
        }

        .task-item.overdue {
          border-color: var(--error-color);
          background: rgba(239, 68, 68, 0.05);
        }

        .task-item.list {
          flex-direction: row;
          align-items: center;
          padding: 1rem 1.5rem;
        }

        .task-item.grid {
          flex-direction: column;
          min-height: 200px;
        }

        .priority-indicator {
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
        }

        .priority-indicator.priority-red {
          background: linear-gradient(180deg, #ef4444, #dc2626);
        }

        .priority-indicator.priority-yellow {
          background: linear-gradient(180deg, #f59e0b, #d97706);
        }

        .priority-indicator.priority-blue {
          background: linear-gradient(180deg, #3b82f6, #2563eb);
        }

        .priority-indicator.priority-gray {
          background: linear-gradient(180deg, #6b7280, #4b5563);
        }

        .task-select {
          margin-right: 1rem;
          flex-shrink: 0;
        }

        .task-item.grid .task-select {
          position: absolute;
          top: 1rem;
          right: 1rem;
          margin: 0;
        }

        .select-checkbox {
          width: 1.25rem;
          height: 1.25rem;
          border-radius: var(--radius-sm);
          border: 2px solid var(--border-color);
          cursor: pointer;
        }

        .select-checkbox:checked {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
        }

        .task-content {
          flex: 1;
          min-width: 0;
        }

        .task-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .task-item.list .task-header {
          margin-bottom: 0;
          align-items: center;
        }

        .task-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.4;
          word-break: break-word;
        }

        .task-item.list .task-title {
          font-size: 1rem;
        }

        .task-title.completed {
          text-decoration: line-through;
          color: var(--text-secondary);
        }

        .status-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .status-btn.pending {
          background: var(--secondary-color);
          color: var(--text-secondary);
          border: 2px solid var(--border-color);
        }

        .status-btn.pending:hover {
          background: var(--accent-color);
          color: white;
          border-color: var(--accent-color);
        }

        .status-btn.completed {
          background: var(--accent-color);
          color: white;
          border: 2px solid var(--accent-color);
        }

        .task-meta {
          flex: 1;
        }

        .task-item.list .task-meta {
          margin-left: 1rem;
          margin-right: 1rem;
        }

        .meta-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .task-item.list .meta-row {
          margin-bottom: 0;
        }

        .priority-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .priority-badge.priority-red {
          background: #fee2e2;
          color: #dc2626;
        }

        .priority-badge.priority-yellow {
          background: #fef3c7;
          color: #b45309;
        }

        .priority-badge.priority-blue {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .priority-badge.priority-gray {
          background: #f3f4f6;
          color: #4b5563;
        }

        .due-date {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .due-date.overdue {
          color: var(--error-color);
          font-weight: 600;
        }

        .task-description {
          color: var(--text-secondary);
          font-size: 0.875rem;
          line-height: 1.5;
          margin: 0.5rem 0 0 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .task-item.list .task-description {
          display: none;
        }

        .overdue-warning {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          background: #fee2e2;
          color: #dc2626;
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          font-weight: 500;
          margin-top: 1rem;
        }

        .task-item.list .overdue-warning {
          margin: 0;
          padding: 0.25rem 0.5rem;
        }

        .task-actions {
          display: flex;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .task-item.grid .task-actions {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          background: var(--background-light);
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .action-btn:hover {
          transform: translateY(-1px);
          box-shadow: var(--shadow-sm);
        }

        .edit-btn {
          color: var(--primary-color);
        }

        .edit-btn:hover {
          background: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }

        .delete-btn {
          color: var(--error-color);
        }

        .delete-btn:hover {
          background: var(--error-color);
          color: white;
          border-color: var(--error-color);
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .task-item.list {
            flex-direction: column;
            align-items: stretch;
          }

          .task-item.list .task-header {
            margin-bottom: 1rem;
          }

          .task-item.list .task-meta {
            margin: 0 0 1rem 0;
          }

          .task-item.list .task-actions {
            padding-top: 1rem;
            border-top: 1px solid var(--border-color);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default TaskItem;
