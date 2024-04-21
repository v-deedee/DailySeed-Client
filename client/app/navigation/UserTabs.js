import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopScreen from "../screens/shop/ShopScreen";
import StatisticsScreen from "../screens/statistic/StatisticsScreen";
import SettingScreen from "../screens/setting/SettingScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import HomeStack from "./HomeStack";
import { TouchableOpacity, View, Image } from "react-native";
import RecordScreen from "../screens/home/RecordScreen";

const Tab = createBottomTabNavigator();

// const FAB = ({ children, onPress }) => (
//   <TouchableOpacity onPress={onPress} style={{ top: -30, alignItems: 'center', justifyContent: 'center' }}>
//     <View style={{ width: 70, height: 70, borderRadius: 50, backgroundColor: '#b3edff' }}>
//       {children}
//     </View>
//   </TouchableOpacity>
// );

export default function UserTabs({ signOut }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#61AF72",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 55 },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
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
      {/* <Tab.Screen
        name="RecordScreen"
        component={RecordScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={require('../../assets/seed/drop.png')} style={{ width: 40, height: 40 }} />
          ),
          tabBarButton: (props) => (
            <FAB {...props} />
          )
        }}
      /> */}
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
