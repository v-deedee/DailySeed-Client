import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/setting/ProfileScreen";
import SettingScreen from "../screens/setting/SettingScreen";
import ChangePasswordScreen from "../screens/setting/ChangePasswordScreen";
const Stack = createNativeStackNavigator();

export default function SettingStack({ signOut }) {
  return (
    <Stack.Navigator
      screenOptions={
        {
          // headerShown: false,
        }
      }
    >
      <Stack.Screen
        name="Menu"
        options={{
          headerShown: false,
        }}
      >
        {(navigation) => (
          <SettingScreen signOut={signOut} navigation={navigation.navigation} />
        )}
      </Stack.Screen>
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
