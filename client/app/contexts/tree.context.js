import React, { createContext, useState } from 'react';
import { getTree } from '../services/tree.service';

export const TreeContext = createContext();

export const TreeProvider = ({ children }) => {
  const [tree, setTree] = useState();

  return (
    <TreeContext.Provider value={{ tree, setTree }}>
      {children}
    </TreeContext.Provider>
  );
};