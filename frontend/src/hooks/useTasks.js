import { useState } from 'react';
import { CreateTask, UpdateTaskById, DeleteTaskById } from '../api';
import { useApp } from '../context/AppContext';
import { notify } from '../utils';

export const useTasks = () => {
  const { addTask, updateTask, deleteTask, fetchAllTasks } = useApp();
  const [loading, setLoading] = useState(false);

  const createTask = async (taskData) => {
    setLoading(true);
    try {
      const { success, message, data } = await CreateTask(taskData);
      if (success) {
        addTask(data);
        notify(message, 'success');
        return { success: true, data };
      } else {
        notify(message, 'error');
        return { success: false, message };
      }
    } catch (error) {
      const errorMessage = 'Failed to create task';
      notify(errorMessage, 'error');
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (taskId, taskData) => {
    setLoading(true);
    try {
      const { success, message, data } = await UpdateTaskById(taskId, taskData);
      if (success) {
        updateTask(data);
        notify(message, 'success');
        return { success: true, data };
      } else {
        notify(message, 'error');
        return { success: false, message };
      }
    } catch (error) {
      const errorMessage = 'Failed to update task';
      notify(errorMessage, 'error');
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const removeTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return { success: false, message: 'Action cancelled' };
    }

    setLoading(true);
    try {
      const { success, message } = await DeleteTaskById(taskId);
      if (success) {
        deleteTask(taskId);
        notify(message, 'success');
        return { success: true };
      } else {
        notify(message, 'error');
        return { success: false, message };
      }
    } catch (error) {
      const errorMessage = 'Failed to delete task';
      notify(errorMessage, 'error');
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskCompletion = async (task) => {
    return await editTask(task._id, { ...task, isDone: !task.isDone });
  };

  const bulkDeleteTasks = async (taskIds) => {
    if (!window.confirm(`Are you sure you want to delete ${taskIds.length} tasks?`)) {
      return { success: false, message: 'Action cancelled' };
    }

    setLoading(true);
    try {
      const results = await Promise.all(
        taskIds.map(id => DeleteTaskById(id))
      );
      
      const successCount = results.filter(result => result.success).length;
      const failureCount = results.length - successCount;

      if (successCount > 0) {
        // Remove successful deletions from state
        taskIds.forEach(id => deleteTask(id));
        notify(`Successfully deleted ${successCount} tasks`, 'success');
      }

      if (failureCount > 0) {
        notify(`Failed to delete ${failureCount} tasks`, 'error');
      }

      return { success: successCount > 0, successCount, failureCount };
    } catch (error) {
      const errorMessage = 'Failed to delete tasks';
      notify(errorMessage, 'error');
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const refreshTasks = async () => {
    setLoading(true);
    try {
      await fetchAllTasks();
      notify('Tasks refreshed successfully', 'success');
    } catch (error) {
      notify('Failed to refresh tasks', 'error');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createTask,
    editTask,
    removeTask,
    toggleTaskCompletion,
    bulkDeleteTasks,
    refreshTasks
  };
};
