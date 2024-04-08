import { NavigationContainer } from "@react-navigation/native";
import User from "./app/navigation/UserTabs";
import Login from "./app/navigation/LoginStack";
import { useState } from "react";
import { StatusBar } from "react-native";

function getLoginStatus() {
  return false;
}

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(getLoginStatus());

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="transparent" />
      {isSignedIn ? (
        <>
          <User signOut={() => setIsSignedIn(false)} />
        </>
      ) : (
        <>
          <Login signIn={() => setIsSignedIn(true)} />
        </>
      )}
    </NavigationContainer>
  );
}
