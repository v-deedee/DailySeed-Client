import { StyleSheet, Text, View } from "react-native";
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", width: "100%" }}>
        <Text style={styles.title}>Admin Screen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fbf5e5",
    flex: 1,
    alignItems: "center",
  },
  title: {
    marginVertical: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#474838",
  },
});
