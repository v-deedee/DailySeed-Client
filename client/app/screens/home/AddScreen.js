import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const AddScreen = ({ navigation }) => {
  const closeScreen = () => {
    navigation.navigate("Record");
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={closeScreen}>
          <MaterialIcons name="close" color={"#ACAC9A"} size={30} />
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center" }}>
        <Text>This is add screen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF5E5",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  headerButton: {
    padding: 20,
  },
});

export default AddScreen;
