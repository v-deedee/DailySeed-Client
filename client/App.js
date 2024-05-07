import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import User from "./app/navigation/UserTabs";
import Login from "./app/navigation/LoginStack";
import LoadingScreen from "./app/screens/LoadingScreen"; 
import { UserProvider } from "./app/contexts/user.context";
import { getUserByToken } from "./app/services/user.service"
import { UserContext } from "./app/contexts/user.context";
import { SeedProvider } from "./app/contexts/seed.context";

// import * as dotenv from 'react-native-dotenv';

// dotenv.config(); // Load environment variables


function getLoginStatus() {
  return false;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(getLoginStatus());
  const [user, setUser] = useState(null); // Khởi tạo state user


  const handleSetUser = (userData) => {
    setUser(userData);
  };


  useEffect(() => {
    async function fetchUserData() {
      try {
        console.log(userData)
        const userData = await getUserByToken();
        setUser(userData);
        setIsSignedIn(true);
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
      <UserProvider initialUser={user} setUserCallback={handleSetUser}>
        <SeedProvider>
          <NavigationContainer>
            {isSignedIn ? (
              <User signOut={() => setIsSignedIn(false)} />
            ) : (
              <Login signIn={() => setIsSignedIn(true)} />
            )}
          </NavigationContainer>
        </SeedProvider>
      </UserProvider>
    )
  );
}
