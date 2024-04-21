import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Slider, Dialog } from "@rneui/themed";
import { getCurrentDate } from "../../components/Calendar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";

const habits = [
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
        label: "Poor",
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
  const [openDelHabitModal, setOpenDelHabitModal] = useState(false);

  const [currentHabitId, setCurrentHabitId] = useState(0);

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

  const editHabit = (habitId) => {
    navigation.navigate("Edit", { id: habitId });
  };

  const submitRecord = () => {
    navigation.navigate("Home", { progress: 5 });
  };

  const toggleDelHabitModal = () => {
    setOpenDelHabitModal(!openDelHabitModal);
  };

  const deleteHabit = () => {
    habits.splice(currentHabitId, 1);

    toggleDelHabitModal();
  };

  const addNewHabit = () => {
    // if (newHabitName.length > 0) {
    //   habits.push({
    //     name: newHabitName,
    //     levels: [],
    //   });
    //   setNewHabitName("");
    // }
    // toggleAddHabitModal();
    navigation.navigate("Edit", { id: habits.length });
  };

  return (
    <View style={styles.container}>
      <StatusBar />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={addNewHabit}>
          <MaterialIcons name="playlist-add" color={"#50AA75"} size={32} />
        </TouchableOpacity>

        <Text style={styles.date}>{currentDate}</Text>

        <TouchableOpacity style={styles.headerButton} onPress={closeRecord}>
          <MaterialIcons name="close" color={"#ACAC9A"} size={30} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {habits.map((habit, index) => (
          <View style={styles.recordContent} key={index}>
            <View style={styles.titleBox}>
              <Text style={styles.titleContent}>{habit.name}</Text>
              <View style={styles.actionIconBox}>
                <TouchableOpacity
                  style={styles.actionIcon}
                  onPress={() => {
                    editHabit(index);
                  }}
                >
                  <Feather name="edit" color="#fff" size={15} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionIcon}
                  onPress={() => {
                    setCurrentHabitId(index);
                    toggleDelHabitModal();
                  }}
                >
                  <MaterialIcons name="delete" color="#fff" size={15} />
                </TouchableOpacity>
              </View>
            </View>

            <Slider
              value={values[index]}
              onValueChange={(value) => {
                let newValues = [...values];
                newValues[index] = value;
                setValues(newValues);
              }}
              maximumValue={habit.levels.length - 1}
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
                height: 60,
                width: 60,
                backgroundColor: "#F9FDB8",
                borderRadius: 999,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              thumbProps={{
                children: (
                  <Text
                    style={{
                      fontSize: 40,
                      marginTop: -3,
                    }}
                  >
                    {habit.levels[values[index]].icon}
                  </Text>
                ),
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
                      habit.levels.length - 1,
                    ),
                  },
                ]}
              >
                {habit.levels[values[index]].label}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.submitBox}>
        <TouchableOpacity style={styles.submitButton} onPress={submitRecord}>
          <Text style={styles.submitText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Confirm delete habit modal */}
      <Dialog
        isVisible={openDelHabitModal}
        onBackdropPress={toggleDelHabitModal}
        overlayStyle={{
          borderRadius: 30,
        }}
      >
        <View style={{ alignItems: "center", paddingBottom: 20 }}>
          <Dialog.Title title="Confirm delete" titleStyle={{}} />
        </View>

        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <AntDesign name="warning" color={"red"} size={20} />
          <Text style={{ color: "red", fontWeight: "700" }}>
            Are you sure to delete this habit?
          </Text>
        </View>

        <View style={styles.modalButtonGroup}>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: "#ccc" }]}
            onPress={() => deleteHabit()}
          >
            <Text style={{ fontWeight: "bold", color: "#474838" }}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: "#50AA75" }]}
            onPress={toggleDelHabitModal}
          >
            <Text style={{ fontWeight: "bold", color: "#fff" }}>No</Text>
          </TouchableOpacity>
        </View>
      </Dialog>
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
    marginTop: 20,
    padding: 20,
    height: "auto",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
  },
  titleBox: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContent: {
    fontSize: 16,
    fontWeight: "600",
  },
  actionIconBox: {
    marginTop: -50,
    flexDirection: "row",
    gap: 10,
  },
  actionIcon: {
    backgroundColor: "#3B6C78",
    borderRadius: 999,
    padding: 10,
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
  modalButtonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    paddingTop: 20,
  },
  modalButton: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 15,
    height: "auto",
    borderRadius: 10,
  },
});

export default RecordScreen;
