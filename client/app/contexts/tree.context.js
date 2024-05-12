import React, { createContext, useState } from 'react';

export const TreeContext = createContext();

export const TreeProvider = ({ children }) => {
  const [tree, setTree] = useState();

  return (
    <TreeContext.Provider value={{ tree, setTree }}>
      {children}
    </TreeContext.Provider>
  );
};