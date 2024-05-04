import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import User from "./app/navigation/UserTabs";
import Login from "./app/navigation/LoginStack";
<<<<<<< HEAD
import UserClass from "./app/services/models/user";
import UserSingleton from "./app/services/user-singleton";
import LoadingScreen from "./app/screens/LoadingScreen"; // Import màn hình loading
import { StatusBar } from "react-native";

=======
import LoadingScreen from "./app/screens/LoadingScreen"; 
import { UserProvider } from "./app/contexts/user.context";
import { getUserByToken } from "./app/services/user.service"
import { UserContext } from "./app/contexts/user.context";
>>>>>>> khang2
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
<<<<<<< HEAD

    checkLoginStatus();
  }, []);
=======
    
    fetchUserData();
  }, [])
>>>>>>> khang2



  return (
<<<<<<< HEAD
    <NavigationContainer>
      <StatusBar backgroundColor={"#fbf5e5"} />
      {isSignedIn ? (
        <User signOut={() => setIsSignedIn(false)} />
      ) : (
        <Login signIn={() => setIsSignedIn(true)} />
      )}
    </NavigationContainer>
=======
    isLoading ? (
      <LoadingScreen />
    ) : (
      <UserProvider initialUser={user} setUserCallback={handleSetUser}>
        <NavigationContainer>
          {isSignedIn ? (
            <User signOut={() => setIsSignedIn(false)} />
          ) : (
            <Login signIn={() => setIsSignedIn(true)} />
          )}
        </NavigationContainer>
      </UserProvider>
    )
>>>>>>> khang2
  );
}
