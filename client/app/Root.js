import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import User from "./navigation/UserTabs";
import Login from "./navigation/LoginStack";
import LoadingScreen from "./screens/LoadingScreen"; 
import { getUserByToken } from "./services/user.service"
import { UserContext } from "./contexts/user.context";
import { SeedContext } from "./contexts/seed.context";
import { listTrees } from "./services/tree.service";
import { TreeContext } from "./contexts/tree.context";

// import * as dotenv from 'react-native-dotenv';

// dotenv.config(); // Load environment variables


function getLoginStatus() {
  return false;
}

export default function Root() {

  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(getLoginStatus());
  const { user, setUser } = useContext(UserContext); // Khởi tạo state user
  const { setTree } = useContext(TreeContext);


  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUserByToken();
        console.log(userData);
        if(userData) {
          setUser(userData);
          setIsSignedIn(true);  
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      setIsLoading(false);
    }
    
    fetchUserData();
  }, [])




  return (
    isLoading ? (
      <LoadingScreen />
    ) : (
          <NavigationContainer>
            {isSignedIn ? (
              <User signOut={() => setIsSignedIn(false)} />
            ) : (
              <Login signIn={() => setIsSignedIn(true)} />
            )}
          </NavigationContainer>
    )
  );
}
