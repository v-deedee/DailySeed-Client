import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ShopScreen from "../screens/ShopScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import SettingScreen from "../screens/SettingScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

const Tab = createBottomTabNavigator();

export default function UserTabs({ signOut }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#61AF72",
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="house" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="chart-simple" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="cart-shopping" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-cog"
              color={color}
              size={28}
            />
          ),
        }}
      >
        {() => <SettingScreen signOut={signOut} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
