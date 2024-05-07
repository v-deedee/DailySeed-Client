import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { listSeeds } from "../services/seed.service";
import { UserContext } from "./user.context";

export const SeedContext = createContext();

export const SeedProvider = ({ children }) => {
  const [seeds, setSeeds] = useState([]);
  const { user } = useContext(UserContext);

  const fetchSeeds = useCallback(async () => {
    try {
      const seedData = await listSeeds();
      if (seedData.ok) {
        const splitAssets = seedData.data.map((item) => item.asset.split("|"));

        // Create the new data array
        const newData = splitAssets.map((assetPaths, index) => {
          const item = seedData.data[index]; // Get the original item data
        
          return {
            id: item.id,
            name: item.name,
            assets: assetPaths, // Use the split asset paths as an array
          };
        });
        console.log(newData)
        
        setSeeds(newData);
      }
    } catch (error) {
      console.error("Error fetching seeds:", error);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchSeeds();
    } else {
      setSeeds([]);
    }
  }, [user, fetchSeeds]);

  return (
    <SeedContext.Provider value={{ seeds, setSeeds }}>
      {children}
    </SeedContext.Provider>
  );
};
