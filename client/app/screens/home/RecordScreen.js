import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Slider, Icon } from "@rneui/themed";
import { getCurrentDate } from "../../components/Calendar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { useState } from "react";

const RecordScreen = ({ navigation }) => {
  const currentDate = getCurrentDate();

  const [value, setValue] = useState(0);

  const interpolate = (start, end) => {
    let k = (value - 0) / 10; // 0 =>min  && 10 => MAX
    return Math.ceil((1 - k) * start + k * end) % 256;
  };

  const color = () => {
    let r = interpolate(255, 0);
    let g = interpolate(0, 205);
    let b = interpolate(0, 0);
    return `rgb(${r},${g},${b})`;
  };

  const iconName = () => {
    if (value >= 8) return "emoji-happy";
    else if (value >= 5) return "emoji-neutral";
    else return "emoji-sad";
  };

  const changeStatus = () => {
    if (value >= 8)
      return (
        <Text style={[styles.statusContent, { backgroundColor: color() }]}>
          Good
        </Text>
      );
    else if (value >= 5)
      return (
        <Text style={[styles.statusContent, { backgroundColor: color() }]}>
          Normal
        </Text>
      );
    else
      return (
        <Text style={[styles.statusContent, { backgroundColor: color() }]}>
          Bad
        </Text>
      );
  };

  const closeRecord = () => {
    navigation.navigate("Home");
  };

  const addCritiria = () => {
    navigation.navigate("Add");
  };

  const submitRecord = () => {
    navigation.navigate("Home", { progress: value });
  };

  return (
    <View style={styles.container}>
      <StatusBar />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="settings" color={"#ACAC9A"} size={30} />
        </TouchableOpacity>

        <Text style={styles.date}>{currentDate}</Text>

        <TouchableOpacity style={styles.headerButton} onPress={closeRecord}>
          <MaterialIcons name="close" color={"#ACAC9A"} size={30} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.recordContent}>
          <View style={styles.titleBox}>
            <Text style={styles.titleContent}>Emotion</Text>
          </View>
          <Slider
            value={value}
            onValueChange={setValue}
            maximumValue={10}
            minimumValue={0}
            minimumTrackTintColor="#50AA75"
            step={1}
            allowTouchTrack
            trackStyle={{
              height: 20,
              borderRadius: 999,
              backgroundColor: "transparent",
            }}
            thumbStyle={{
              height: 40,
              width: 40,
              backgroundColor: "#F9FDB8",
            }}
            thumbProps={{
              children: <Entypo name={iconName()} size={40} color={color()} />,
            }}
          />
          <View style={styles.statusBox}>
            <Text>Status: </Text>
            {changeStatus()}
          </View>
        </View>

        <View style={styles.addBox}>
          <TouchableOpacity style={styles.addButton} onPress={addCritiria}>
            <MaterialIcons name="add-box" color={"#50AA75"} size={35} />
            <Text style={{ color: "#50AA75", fontWeight: "bold" }}>
              Add your own critiria
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.submitBox}>
        <TouchableOpacity style={styles.submitButton} onPress={submitRecord}>
          <Text style={styles.submitText}>Done</Text>
        </TouchableOpacity>
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
    justifyContent: "space-between",
  },
  headerButton: {
    padding: 20,
  },
  date: {
    marginVertical: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#474838",
  },
  recordContent: {
    padding: 20,
    height: "auto",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 20,
  },
  titleBox: {
    marginBottom: 20,
  },
  titleContent: {
    fontSize: 16,
    fontWeight: "600",
  },
  statusBox: {
    paddingTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  statusContent: {
    padding: 10,
    borderRadius: 999,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
  },
  addBox: {
    padding: 20,
    height: "auto",
    backgroundColor: "#b4dcaa45",
    margin: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#50AA75",
  },
  addButton: {
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#50AA75",
    alignItems: "center",
    padding: 20,
  },
  submitText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default RecordScreen;
