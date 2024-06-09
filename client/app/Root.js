import React, { useState, useEffect, useRef, useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import User from "./navigation/UserTabs";
import Login from "./navigation/LoginStack";
import LoadingScreen from "./screens/LoadingScreen";
import { getUserByToken } from "./services/user.service";
import { UserContext } from "./contexts/user.context";
import { SeedContext } from "./contexts/seed.context";
import { listTrees } from "./services/tree.service";
import { TreeContext } from "./contexts/tree.context";
import { SafeAreaView } from "react-native";

function getLoginStatus() {
  return false;
}

export default function Root() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(getLoginStatus());
  const { user, setUser } = useContext(UserContext); // Khởi tạo state user
  const { setTree } = useContext(TreeContext);
  const { fetchSeeds } = useContext(SeedContext);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUserByToken();
        if (userData) {
          setUser(userData);
          setIsSignedIn(true);
          fetchSeeds();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setIsLoading(false);
    }

    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <NavigationContainer>
          {isSignedIn ? (
            <User signOut={() => setIsSignedIn(false)} />
          ) : (
            <Login signIn={() => setIsSignedIn(true)} />
          )}
        </NavigationContainer>
      )}
    </SafeAreaView>
  );
}
