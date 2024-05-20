import React, { createContext, useState, useEffect } from 'react';
import { listTrackingHabits } from '../services/habit.service';

export const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);


  const fetchHabits = async (TreeId) => {
    try {
        const data = await listTrackingHabits(TreeId);
        setHabits(data)
    } catch (error) {
        console.error("Error fetching habits:", error);
    }
    
  }


  return (
    <HabitContext.Provider value={{ habits, setHabits, fetchHabits }}>
      {children}
    </HabitContext.Provider>
  );
};