import React, { useState, useEffect, useRef,useContext } from 'react';
import {
  setupNotificationHandlers,
  registerForPushNotificationsAsync,
  schedulePushNotification,
  scheduleNightlyNotification,
  handleNotificationResponse
} from './notification/notificationService';
import * as Notifications from 'expo-notifications';

import { NavigationContainer } from "@react-navigation/native";
import User from "./navigation/UserTabs";
import Login from "./navigation/LoginStack";
import LoadingScreen from "./screens/LoadingScreen"; 
import { getUserByToken } from "./services/user.service"
import { UserContext } from "./contexts/user.context";
import { SeedContext } from "./contexts/seed.context";
import { listTrees } from "./services/tree.service";
import { TreeContext } from "./contexts/tree.context";


function getLoginStatus() {
  return false;
}


export default function Root() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(getLoginStatus());
  const { user, setUser } = useContext(UserContext); // Khởi tạo state user
  const { setTree } = useContext(TreeContext);
  const { fetchSeeds } = useContext(SeedContext);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();

  useEffect(() => {
    const responseListener = setupNotificationHandlers(handleNotificationResponse);
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // Gọi hàm để tạo thông báo hàng ngày vào lúc 9 giờ tối
    scheduleNightlyNotification();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);


  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUserByToken();
        if(userData) {
          setUser(userData);
          setIsSignedIn(true);  
          fetchSeeds();
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