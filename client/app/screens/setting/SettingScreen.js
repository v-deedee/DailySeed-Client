import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { Card, Button } from '@rneui/themed';
import AccoutCard from "./_component/AccoutCard";
import CustomCard from "./_component/CustomCard";
import { logout } from "../../services/user.service";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";


export default function SettingScreen({ signOut }) {
  const {setUser} = useContext(UserContext)

  const handleLogout = () => {
    logout();
    setUser(null);
    signOut();
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Store</Text>
      </View>

      <AccoutCard />

      <CustomCard />

      <View style={{ marginTop: 30 }}>
        <Button
          onPress={() => handleLogout()}
          title="Log out"
          color="red"
          accessibilityLabel="Log out button"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbf5e5',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  titleContainer: {
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#474838",
    marginTop: 10,
    marginBottom: 10
  },
});
