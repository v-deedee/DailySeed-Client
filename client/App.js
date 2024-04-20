import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import User from "./app/navigation/UserTabs";
import Login from "./app/navigation/LoginStack";
import UserClass from "./app/services/models/user";
import UserSingleton from "./app/services/user-singleton";
import LoadingScreen from "./app/screens/LoadingScreen"; // Import màn hình loading
import { StatusBar } from "react-native";

function getLoginStatus() {
  return false;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(getLoginStatus());

  useEffect(() => {
    async function checkLoginStatus() {
      const ok = await UserClass.getUserByToken();
      if (ok) {
        setIsSignedIn(true);
        const userName = UserSingleton.getInstance().getUserName();
        console.log(userName);
      }
      setIsLoading(false);
    }

    checkLoginStatus();
  }, []);


  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={"#fbf5e5"} />
      {isSignedIn ? (
        <User signOut={() => setIsSignedIn(false)} />
      ) : (
        <Login signIn={() => setIsSignedIn(true)} />
      )}
    </NavigationContainer>
  );
}
