import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  XMarkIcon, 
  CalendarIcon,
  ExclamationTriangleIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { useTasks } from '../../hooks/useTasks';

const TaskForm = ({ task = null, onClose }) => {
  const { createTask, editTask, loading } = useTasks();
  
  const [formData, setFormData] = useState({
    taskName: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    isDone: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        taskName: task.taskName || '',
        description: task.description || '',
        priority: task.priority || 'Medium',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        isDone: task.isDone || false
      });
    }
  }, [task]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.taskName.trim()) {
      newErrors.taskName = 'Task name is required';
    } else if (formData.taskName.trim().length < 3) {
      newErrors.taskName = 'Task name must be at least 3 characters';
    }

    if (formData.dueDate) {
      const dueDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (dueDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const taskData = {
      ...formData,
      taskName: formData.taskName.trim(),
      description: formData.description.trim()
    };

    try {
      let result;
      if (task) {
        result = await editTask(task._id, taskData);
      } else {
        result = await createTask(taskData);
      }

      if (result.success) {
        onClose();
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const priorityOptions = [
    { value: 'Low', label: 'Low Priority', color: 'blue' },
    { value: 'Medium', label: 'Medium Priority', color: 'yellow' },
    { value: 'High', label: 'High Priority', color: 'red' }
  ];

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const formVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 50 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 300 }
    },
    exit: { scale: 0.8, opacity: 0, y: 50 }
  };

  return (
    <motion.div 
      className="modal-overlay"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div 
        className="modal-content"
        variants={formVariants}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
          <motion.button
            className="close-btn"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <XMarkIcon className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="task-form">
          {/* Task Name */}
          <div className="form-group">
            <label htmlFor="taskName" className="form-label">
              Task Name *
            </label>
            <input
              type="text"
              id="taskName"
              value={formData.taskName}
              onChange={(e) => handleChange('taskName', e.target.value)}
              className={`form-input ${errors.taskName ? 'error' : ''}`}
              placeholder="Enter task name..."
              maxLength={100}
            />
            {errors.taskName && (
              <span className="error-message">
                <ExclamationTriangleIcon className="w-4 h-4" />
                {errors.taskName}
              </span>
            )}
            <div className="character-count">
              {formData.taskName.length}/100
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="form-textarea"
              placeholder="Add a description for your task..."
              rows={3}
              maxLength={500}
            />
            <div className="character-count">
              {formData.description.length}/500
            </div>
          </div>

          {/* Priority and Due Date Row */}
          <div className="form-row">
            {/* Priority */}
            <div className="form-group">
              <label htmlFor="priority" className="form-label">
                Priority
              </label>
              <div className="priority-selector">
                {priorityOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    className={`priority-option priority-${option.color} ${
                      formData.priority === option.value ? 'selected' : ''
                    }`}
                    onClick={() => handleChange('priority', option.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="priority-indicator" />
                    {option.label}
                    {formData.priority === option.value && (
                      <CheckIcon className="w-4 h-4" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Due Date */}
            <div className="form-group">
              <label htmlFor="dueDate" className="form-label">
                Due Date
              </label>
              <div className="date-input-wrapper">
                <CalendarIcon className="date-icon" />
                <input
                  type="date"
                  id="dueDate"
                  value={formData.dueDate}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                  className={`form-input ${errors.dueDate ? 'error' : ''}`}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              {errors.dueDate && (
                <span className="error-message">
                  <ExclamationTriangleIcon className="w-4 h-4" />
                  {errors.dueDate}
                </span>
              )}
            </div>
          </div>

          {/* Status (for editing) */}
          {task && (
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.isDone}
                  onChange={(e) => handleChange('isDone', e.target.checked)}
                  className="form-checkbox"
                />
                <span className="checkbox-text">Mark as completed</span>
              </label>
            </div>
          )}

          {/* Form Actions */}
          <div className="form-actions">
            <motion.button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <div className="loading-spinner" />
                  {task ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                task ? 'Update Task' : 'Create Task'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: var(--background-light);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .modal-header h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .close-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border: none;
          border-radius: var(--radius-md);
          background: var(--secondary-color);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .close-btn:hover {
          background: var(--error-color);
          color: white;
        }

        .task-form {
          padding: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-label {
          display: block;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          transition: all 0.2s ease-in-out;
          background: var(--background-light);
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-input.error,
        .form-textarea.error {
          border-color: var(--error-color);
        }

        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .character-count {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-align: right;
          margin-top: 0.25rem;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: var(--error-color);
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }

        .priority-selector {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .priority-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          background: var(--background-light);
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .priority-option:hover {
          border-color: var(--primary-color);
        }

        .priority-option.selected {
          border-color: var(--primary-color);
          background: rgba(59, 130, 246, 0.05);
        }

        .priority-indicator {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
        }

        .priority-red .priority-indicator {
          background: #ef4444;
        }

        .priority-yellow .priority-indicator {
          background: #f59e0b;
        }

        .priority-blue .priority-indicator {
          background: #3b82f6;
        }

        .date-input-wrapper {
          position: relative;
        }

        .date-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          width: 1rem;
          height: 1rem;
          color: var(--text-secondary);
          pointer-events: none;
        }

        .date-input-wrapper .form-input {
          padding-left: 2.5rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          padding: 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          transition: all 0.2s ease-in-out;
        }

        .checkbox-label:hover {
          background: var(--secondary-color);
        }

        .form-checkbox {
          width: 1.25rem;
          height: 1.25rem;
          border-radius: var(--radius-sm);
          border: 2px solid var(--border-color);
          cursor: pointer;
        }

        .form-checkbox:checked {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
        }

        .checkbox-text {
          font-weight: 500;
          color: var(--text-primary);
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
          margin-top: 1rem;
        }

        .form-actions .btn {
          flex: 1;
        }

        @media (max-width: 768px) {
          .modal-content {
            margin: 1rem;
            max-height: calc(100vh - 2rem);
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
          }

          .priority-selector {
            max-height: 200px;
            overflow-y: auto;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default TaskForm;
