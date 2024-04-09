import { Button, StyleSheet, Text, View } from "react-native";
import UserSingleton from "../services/user-singleton";
import { deleteTokenFromLocalStorage } from "../services/auth/token-services";

export default function SettingScreen({ signOut }) {

  const handleLogout = () => {
      UserSingleton.getInstance().setUser(null);
      deleteTokenFromLocalStorage();
      signOut();
  }

  return (
    <View style={styles.container}>
      <Text>Setting Screen</Text>
      <Button
        onPress={() => handleLogout()}
        title="Log out"
        color="blue"
        accessibilityLabel="Log out button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
