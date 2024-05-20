import React, { useContext, useEffect, useState } from "react";
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
