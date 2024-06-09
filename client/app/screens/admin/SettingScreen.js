import { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Card } from "@rneui/themed";
import { logout } from "../../services/user.service";
import { UserContext } from "../../contexts/user.context";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

export default function SettingScreen() {
  const { setRole } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    setRole("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Setting</Text>
      </View>

      <View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#474838",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Account
        </Text>
        <Card containerStyle={styles.cardContainer}>
          <View style={styles.row}>
            <View style={styles.row}>
              <View>
                <FontAwesome6 name="user-large" size={18} color="#b2b2b2" />
              </View>

              <View style={{ marginLeft: 15 }}>
                <Text>admin</Text>
              </View>
            </View>

            <View style={styles.row}>
              <TouchableOpacity>
                <View>
                  <Text style={{ color: "green" }}>My info</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </View>

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
    padding: 10,
    paddingTop: 0,
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
  cardContainer: {
    padding: 15,
    margin: 0,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0,
    shadowColor: "rgba(0,0,0, 0.0)",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  innerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 3,
  },
  button: {
    backgroundColor: "transparent",
    color: "green",
  },
});
