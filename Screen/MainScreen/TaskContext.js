// TaskContext.js
import React, { createContext, useReducer } from 'react';

const initialState = {
  tasks: [],
};

export const TaskContext = createContext(initialState);

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const addTask = (task) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  };

  const completeTask = (taskId) => {
    dispatch({ type: 'COMPLETE_TASK', payload: taskId });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  return (
    <TaskContext.Provider value={{ tasks: state.tasks, addTask, completeTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return { tasks: [...state.tasks, action.payload] };
    case 'COMPLETE_TASK':
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload && !task.completed
            ? { ...task, completed: true, completionTime: new Date() }
            : task
        ),
      };
    case 'DELETE_TASK':
      return { tasks: state.tasks.filter((task) => task.id !== action.payload) };
    default:
      return state;
  }
};
