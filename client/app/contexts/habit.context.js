import React, { createContext, useState } from 'react';

export const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [habit, setHabit] = useState();

  return (
    <HabitContext.Provider value={{ habit, setHabit }}>
      {children}
    </HabitContext.Provider>
  );
};