import { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AccoutCard from "./_component/AccoutCard";
import CustomCard from "./_component/CustomCard";
import { logout } from "../../services/user.service";
import { UserContext } from "../../contexts/user.context";
import { HabitContext } from "../../contexts/habit.context";
import { SeedContext } from "../../contexts/seed.context";
import { TreeContext } from "../../contexts/tree.context";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function SettingScreen({ signOut, navigation }) {
  const { setUser } = useContext(UserContext);
  const { setHabits } = useContext(HabitContext);
  const { setSeeds } = useContext(SeedContext);
  const { setTree } = useContext(TreeContext);

  const handleLogout = () => {
    logout();
    setUser(null);
    setHabits([]);
    setSeeds([]);
    setTree(null);
    signOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Setting</Text>
      </View>

      <AccoutCard navigation={navigation} />

      <CustomCard />

      <View style={{ marginTop: 10 }}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            gap: 8,
            backgroundColor: "#649B92",
            marginTop: 30,
            padding: 12,
            borderRadius: 10,
          }}
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={20} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "600" }}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fbf5e5",
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    marginVertical: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#474838",
  },
});
