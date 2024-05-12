import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import User from "./app/navigation/UserTabs";
import Login from "./app/navigation/LoginStack";
import LoadingScreen from "./app/screens/LoadingScreen"; 
import { UserProvider } from "./app/contexts/user.context";
import { getUserByToken } from "./app/services/user.service"
import { UserContext } from "./app/contexts/user.context";
import { SeedProvider } from "./app/contexts/seed.context";
import  AllProviders  from "./app/contexts/provider"
import  Root  from './app/Root'
// import * as dotenv from 'react-native-dotenv';

// dotenv.config(); // Load environment variables



export default function App() {


  return (
    <AllProviders>
      <Root/>
    </AllProviders>
  );
}
