import { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { getUserByToken } from "./services/user.service";
import { UserContext } from "./contexts/user.context";
import { SeedContext } from "./contexts/seed.context";

import LoadingScreen from "./screens/LoadingScreen";
import AuthStack from "./screens/authentication/navigation/AuthStack";
import UserTabs from "./navigation/UserTabs";
import AdminTabs from "./navigation/AdminTabs";

export default function Root() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser, role } = useContext(UserContext); // Khởi tạo state user
  const { fetchSeeds } = useContext(SeedContext);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUserByToken();
        if (userData) {
          setUser(userData);
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
          {role === "admin" ? (
            <AdminTabs />
          ) : (
            <>{user ? <UserTabs /> : <AuthStack />}</>
          )}
        </NavigationContainer>
      )}
    </SafeAreaView>
  );
}
