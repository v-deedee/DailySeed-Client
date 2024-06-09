import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

import ShopScreen from "../screens/shop/ShopScreen";
import StatisticsScreen from "../screens/statistic/StatisticsScreen";
import HomeStack from "../screens/home/navigation/HomeStack";
import SettingStack from "../screens/setting/navigation/SettingStack";

const Tab = createBottomTabNavigator();

export default function UserTabs() {
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
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="house" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="chart-simple" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="cart-shopping" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-cog"
              color={color}
              size={28}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
