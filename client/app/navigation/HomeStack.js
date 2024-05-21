import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home";
import RecordScreen from "../screens/home/RecordScreen";
import EditScreen from "../screens/home/EditScreen";
import ProfileScreen from "../screens/setting/ProfileScreen";
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Record" component={RecordScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen}/>
    </Stack.Navigator>
  );
}

export default HomeStack;
