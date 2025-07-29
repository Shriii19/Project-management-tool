import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { GetAllTasks } from '../api';
import { notify } from '../utils';

const AppContext = createContext();

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_TASKS: 'SET_TASKS',
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  SET_FILTER: 'SET_FILTER',
  SET_SEARCH: 'SET_SEARCH',
  SET_ACTIVE_PAGE: 'SET_ACTIVE_PAGE',
  SET_USER: 'SET_USER',
  SET_ERROR: 'SET_ERROR'
};

// Initial state
const initialState = {
  tasks: [],
  filteredTasks: [],
  loading: false,
  error: null,
  filter: 'all', // all, completed, pending, high, medium, low
  searchTerm: '',
  activePage: 'dashboard',
  user: null,
  isAuthenticated: false
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ACTIONS.SET_TASKS:
      return { 
        ...state, 
        tasks: action.payload,
        filteredTasks: filterTasks(action.payload, state.filter, state.searchTerm)
      };
    
    case ACTIONS.ADD_TASK:
      const newTasks = [...state.tasks, action.payload];
      return { 
        ...state, 
        tasks: newTasks,
        filteredTasks: filterTasks(newTasks, state.filter, state.searchTerm)
      };
    
    case ACTIONS.UPDATE_TASK:
      const updatedTasks = state.tasks.map(task =>
        task._id === action.payload._id ? action.payload : task
      );
      return { 
        ...state, 
        tasks: updatedTasks,
        filteredTasks: filterTasks(updatedTasks, state.filter, state.searchTerm)
      };
    
    case ACTIONS.DELETE_TASK:
      const remainingTasks = state.tasks.filter(task => task._id !== action.payload);
      return { 
        ...state, 
        tasks: remainingTasks,
        filteredTasks: filterTasks(remainingTasks, state.filter, state.searchTerm)
      };
    
    case ACTIONS.SET_FILTER:
      return { 
        ...state, 
        filter: action.payload,
        filteredTasks: filterTasks(state.tasks, action.payload, state.searchTerm)
      };
    
    case ACTIONS.SET_SEARCH:
      return { 
        ...state, 
        searchTerm: action.payload,
        filteredTasks: filterTasks(state.tasks, state.filter, action.payload)
      };
    
    case ACTIONS.SET_ACTIVE_PAGE:
      return { ...state, activePage: action.payload };
    
    case ACTIONS.SET_USER:
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: !!action.payload 
      };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    
    default:
      return state;
  }
};

// Helper function to filter tasks
const filterTasks = (tasks, filter, searchTerm) => {
  let filtered = tasks;

  // Apply search filter
  if (searchTerm) {
    filtered = filtered.filter(task =>
      task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply status/priority filter
  switch (filter) {
    case 'completed':
      filtered = filtered.filter(task => task.isDone);
      break;
    case 'pending':
      filtered = filtered.filter(task => !task.isDone);
      break;
    case 'high':
      filtered = filtered.filter(task => task.priority === 'High');
      break;
    case 'medium':
      filtered = filtered.filter(task => task.priority === 'Medium');
      break;
    case 'low':
      filtered = filtered.filter(task => task.priority === 'Low');
      break;
    default:
      // 'all' - no additional filtering
      break;
  }

  return filtered;
};

// Context Provider Component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load tasks on mount
  useEffect(() => {
    fetchAllTasks();
  }, []);

  // Actions
  const fetchAllTasks = async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const { data } = await GetAllTasks();
      dispatch({ type: ACTIONS.SET_TASKS, payload: data });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to fetch tasks' });
      notify('Failed to fetch tasks', 'error');
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const addTask = (task) => {
    dispatch({ type: ACTIONS.ADD_TASK, payload: task });
  };

  const updateTask = (task) => {
    dispatch({ type: ACTIONS.UPDATE_TASK, payload: task });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: ACTIONS.DELETE_TASK, payload: taskId });
  };

  const setFilter = (filter) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
  };

  const setSearch = (searchTerm) => {
    dispatch({ type: ACTIONS.SET_SEARCH, payload: searchTerm });
  };

  const setActivePage = (page) => {
    dispatch({ type: ACTIONS.SET_ACTIVE_PAGE, payload: page });
  };

  const setUser = (user) => {
    dispatch({ type: ACTIONS.SET_USER, payload: user });
  };

  const logout = () => {
    dispatch({ type: ACTIONS.SET_USER, payload: null });
    dispatch({ type: ACTIONS.SET_ACTIVE_PAGE, payload: 'dashboard' });
  };

  const value = {
    ...state,
    fetchAllTasks,
    addTask,
    updateTask,
    deleteTask,
    setFilter,
    setSearch,
    setActivePage,
    setUser,
    logout
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
