import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../ProfileScreen";
import SettingScreen from "../SettingScreen";
import ChangePasswordScreen from "../ChangePasswordScreen";
const Stack = createNativeStackNavigator();

export default function SettingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={SettingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "My info",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 15 },
        }}
      />
      <Stack.Screen
        name="Change_Password"
        component={ChangePasswordScreen}
        options={{
          title: "Change password",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 15 },
        }}
      />
    </Stack.Navigator>
  );
}
