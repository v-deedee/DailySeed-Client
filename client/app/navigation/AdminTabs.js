import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

import HomeScreen from "../screens/admin/HomeScreen";
import SettingScreen from "../screens/admin/SettingScreen";

const Tab = createBottomTabNavigator();

export default function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#61AF72",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 60 },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="house" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
