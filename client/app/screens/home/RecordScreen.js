import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Slider } from "@rneui/themed";
import { getCurrentDate } from "../../components/Calendar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useState } from "react";

const critiria = [
  {
    name: "Emotion",
    levels: [
      {
        label: "Bad",
        icon: "☹️",
      },
      {
        label: "Normal",
        icon: "😐",
      },
      {
        label: "Good",
        icon: "😀",
      },
    ],
  },
  {
    name: "Housework",
    levels: [
      {
        label: "Đéo làm",
        icon: "👎",
      },
      {
        label: "Bad",
        icon: "👊",
      },
      {
        label: "Good",
        icon: "👍",
      },
      {
        label: "Excellent",
        icon: "👏",
      },
    ],
  },
];

const RecordScreen = ({ navigation }) => {
  const currentDate = getCurrentDate();

  const [values, setValues] = useState([0, 0]);

  const interpolate = (start, end, value, maxValue) => {
    let k = (value - 0) / maxValue;
    return Math.ceil((1 - k) * start + k * end) % 256;
  };

  const color = (value, maxValue) => {
    let r = interpolate(255, 0, value, maxValue);
    let g = interpolate(0, 205, value, maxValue);
    let b = interpolate(0, 0, value, maxValue);
    return `rgb(${r},${g},${b})`;
  };

  const closeRecord = () => {
    navigation.navigate("Home");
  };

  const editCritiria = () => {
    navigation.navigate("Edit");
  };

  const submitRecord = () => {
    navigation.navigate("Home", { progress: 5 });
  };

  return (
    <View style={styles.container}>
      <StatusBar />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={editCritiria}>
          <MaterialIcons name="settings" color={"#ACAC9A"} size={30} />
        </TouchableOpacity>

        <Text style={styles.date}>{currentDate}</Text>

        <TouchableOpacity style={styles.headerButton} onPress={closeRecord}>
          <MaterialIcons name="close" color={"#ACAC9A"} size={30} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {critiria.map((critirion, index) => (
          <View style={styles.recordContent} key={index}>
            <View style={styles.titleBox}>
              <Text style={styles.titleContent}>{critirion.name}</Text>
            </View>
            <Slider
              value={values[index]}
              onValueChange={(value) => {
                let newValues = [...values];
                newValues[index] = value;
                setValues(newValues);
              }}
              maximumValue={critirion.levels.length - 1}
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
                backgroundColor: "transparent",
              }}
              thumbProps={{
                children: (
                  <Text style={{ fontSize: 35, marginTop: -5 }}>
                    {critirion.levels[values[index]].icon}
                  </Text>
                ),
                // children: (
                //   <Image
                //     width={40}
                //     source={require("../../../assets/turtle.png")}
                //     style={{ width: 40, height: 40 }}
                //   />
                // ),
              }}
            />
            <View style={styles.statusBox}>
              <Text>Status: </Text>
              <Text
                style={[
                  styles.statusContent,
                  {
                    backgroundColor: color(
                      values[index],
                      critirion.levels.length - 1,
                    ),
                  },
                ]}
              >
                {critirion.levels[values[index]].label}
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.addBox}>
          <TouchableOpacity style={styles.addButton} onPress={editCritiria}>
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
    marginVertical: 10,
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
