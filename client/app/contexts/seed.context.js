import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { listSeeds } from "../services/seed.service";

export const SeedContext = createContext();

export const SeedProvider = ({ children }) => {
  const [seeds, setSeeds] = useState([]);

  const fetchSeeds = async () => {
    try {
      const seedData = await listSeeds();
      const splitAssets = seedData.map((item) => item.asset.split("|"));

      // Create the new data array
      const newData = splitAssets.map((assetPaths, index) => {
        const item = seedData[index]; // Get the original item data

        return {
          id: item.id,
          name: item.name,
          assets: assetPaths, // Use the split asset paths as an array
        };
      });

      setSeeds(newData);
    } catch (error) {
      console.error("Error fetching seeds:", error);
    }
  };

  return (
    <SeedContext.Provider value={{ seeds, setSeeds, fetchSeeds }}>
      {children}
    </SeedContext.Provider>
  );
};
