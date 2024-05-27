import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/setting/ProfileScreen";
import SettingScreen from "../screens/setting/SettingScreen";
const Stack = createNativeStackNavigator();

export default function SettingStack({ signOut }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Menu">
        {(navigation) => (
          <SettingScreen signOut={signOut} navigation={navigation.navigation} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
