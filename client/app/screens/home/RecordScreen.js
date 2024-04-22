import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Slider } from "@rneui/themed";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";

import ConfirmDeleteHabitModal from "./_component/modals/ConfirmDeleteHabitModal";
import { getCurrentDate } from "../../components/Calendar";
import { color } from "../../utils/utils";

const habits = [
  {
    icon: "😈",
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
    icon: "🧹",
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
  {
    icon: "💻",
    name: "OOP",
    levels: [
      {
        label: "Basic",
        icon: "🤌",
      },
      {
        label: "Intermediate",
        icon: "💪",
      },
      {
        label: "Hard",
        icon: "🙏",
      },
      {
        label: "Expert",
        icon: "🏆",
      },
      {
        label: "God",
        icon: "👑",
      },
    ],
  },
];

const RecordScreen = ({ navigation }) => {
  const [openDelHabitModal, setOpenDelHabitModal] = useState(false);

  const [currentHabitId, setCurrentHabitId] = useState(0);

  const currentDate = getCurrentDate();

  const [values, setValues] = useState([0, 0, 0]);

  const closeRecord = () => {
    navigation.navigate("Home");
  };

  const editHabit = (habitId) => {
    navigation.navigate("Edit", { id: habitId });
  };

  const submitRecord = () => {
    let progress = 0;
    values.forEach((value, index) => {
      progress +=
        (value * 100) / ((habits[index].levels.length - 1) * habits.length);
    });

    navigation.navigate("Home", { progress: parseInt(progress) });
  };

  const toggleDelHabitModal = () => {
    setOpenDelHabitModal(!openDelHabitModal);
  };

  const deleteHabit = () => {
    habits.splice(currentHabitId, 1);

    toggleDelHabitModal();
  };

  const addNewHabit = () => {
    navigation.navigate("Edit", { id: habits.length });
  };

  return (
    <View style={styles.container}>
      <StatusBar />

      {/* Head: Add button + Date + Close button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={addNewHabit}>
          <MaterialIcons name="playlist-add" color={"#50AA75"} size={32} />
        </TouchableOpacity>

        <Text style={styles.date}>{currentDate}</Text>

        <TouchableOpacity onPress={closeRecord}>
          <MaterialIcons name="close" color={"#ACAC9A"} size={30} />
        </TouchableOpacity>
      </View>

      {/* Record field */}
      <ScrollView>
        {habits.map((habit, index) => (
          <View style={styles.recordContent} key={index}>
            {/* Icon + title */}
            <View
              style={{ alignItems: "center", marginTop: -55, marginBottom: 15 }}
            >
              <View style={styles.habitIconBox}>
                <View style={styles.habitIcon}>
                  <Text style={{ fontSize: 35 }}>{habit.icon}</Text>
                </View>
              </View>
              <Text style={{ fontSize: 16, fontWeight: "700" }}>
                {habit.name}
              </Text>
            </View>

            {/* Action */}
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
              trackStyle={{ height: 25, borderRadius: 999 }}
              thumbStyle={styles.sliderThumpStyle}
              thumbProps={{
                children: (
                  <Text style={{ fontSize: 40, marginTop: -3 }}>
                    {habit.levels[values[index]].icon}
                  </Text>
                ),
              }}
            />

            {/* Status */}
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

      {/* Submit button */}
      <View style={styles.submitBox}>
        <TouchableOpacity style={styles.submitButton} onPress={submitRecord}>
          <Text style={styles.submitText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Confirm delete habit modal */}
      <ConfirmDeleteHabitModal
        isOpen={openDelHabitModal}
        toggle={toggleDelHabitModal}
        deleteHabit={deleteHabit}
      />
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
    padding: 20,
  },
  date: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#474838",
  },
  recordContent: {
    marginTop: 40,
    padding: 20,
    height: "auto",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
    position: "relative",
  },
  habitIconBox: {
    // padding: 5,
    backgroundColor: "#FBF5E5",
    borderRadius: 999,
  },
  habitIcon: {
    width: 60,
    height: 60,
    alignItems: "center",
    borderRadius: 999,
    // backgroundColor: "#33B5B9",
    // padding: 8,
    borderWidth: 2,
    // borderStyle: "dashed",
    borderColor: "#33B5B9",
    paddingTop: 6,
  },
  actionIconBox: {
    right: 10,
    top: -15,
    // top: 10,
    flexDirection: "row",
    gap: 10,
    position: "absolute",
  },
  actionIcon: {
    backgroundColor: "#3B6C78",
    borderRadius: 999,
    padding: 10,
  },
  sliderThumpStyle: {
    height: 60,
    width: 60,
    backgroundColor: "#F9FDB8",
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
