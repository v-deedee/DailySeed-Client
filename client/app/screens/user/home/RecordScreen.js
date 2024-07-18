import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { Slider } from "@rneui/themed";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";

import ConfirmDeleteHabitModal from "./_component/modals/ConfirmDeleteHabitModal";
import { HabitContext } from ".../../../contexts/habit.context";
import { updateHabit } from ".../../../services/habit.service";
import { color, getCurrentDate } from ".../../../utils/utils";
import { trackHabit } from ".../../../services/habit.service";
import { TreeContext } from ".../../../contexts/tree.context";

function getNextNDays(currentTimestamp, n) {
  let date = new Date(currentTimestamp);

  date.setDate(date.getDate() + n);

  return date;
}

export default function RecordScreen({ navigation }) {
  const [openDelHabitModal, setOpenDelHabitModal] = useState(false);
  const { tree, setTree } = useContext(TreeContext);
  const [currentHabitId, setCurrentHabitId] = useState(0);

  const currentDate = getCurrentDate();

  const [values, setValues] = useState(new Array(20).fill(0));

  const [renderValues, setRenderValues] = useState(new Array(20).fill(0));
  const { habits, setHabits } = useContext(HabitContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (habits && habits.length) {
      const initialValues = habits.map((habit) => {
        if (!habit.selected) return 0;
        const selectedId = habit.selected;
        const criteriaIds = habit.criteria.map((criteria) => criteria.id);
        return criteriaIds.includes(selectedId)
          ? criteriaIds.indexOf(selectedId)
          : 0;
      });
      setValues((prevValues) => {
        const updatedValues = [...prevValues];
        initialValues.forEach((value, index) => {
          updatedValues[index] = value;
        });

        return updatedValues;
      });

      const initialRenderValues = habits.map((habit, index) => {
        return habit.criteria[initialValues[index]].score;
      });
      setRenderValues((prevValues) => {
        const updatedValues = [...prevValues];
        initialRenderValues.forEach((value, index) => {
          updatedValues[index] = value;
        });

        return updatedValues;
      });
    }
  }, [habits]);

  const closeRecord = () => {
    navigation.navigate("Home");
  };

  const editHabit = (habitId) => {
    navigation.navigate("Edit", { id: habitId });
  };

  const submitRecord = async () => {
    setIsLoading(true);
    let totalProgress = 0;

    habits.forEach((habit, index) => {
      const criteriaLength = habit.criteria.length;
      const value = values[index] || 0; // lấy giá trị tương ứng từ values, hoặc 0 nếu không có
      totalProgress += (value * 100) / (criteriaLength - 1);
    });
    const habitData = habits.map((habit, index) => {
      return {
        id: habit.criteria[values[index]].id,
        score: habit.criteria[values[index]].score,
      };
    });

    const treeData = await trackHabit(tree.tree.id, habitData);
    if (treeData) {
      const modifiedSeed = {
        ...treeData.seed,
        asset: treeData.seed.asset.split("|"),
      };
      const modifiedTree = {
        ...treeData,
        seed: modifiedSeed,
      };

      await setTreeAsync(modifiedTree);
    }

    setIsLoading(false);

    navigation.navigate("Home");
  };

  const setTreeAsync = async (modifiedTree) => {
    await setTree(modifiedTree);
  };

  const toggleDelHabitModal = () => {
    setOpenDelHabitModal(!openDelHabitModal);
  };

  const deleteHabit = async () => {
    const data = await updateHabit(habits[currentHabitId], false);
    const newHabits = habits.filter((_, index) => index !== currentHabitId);
    setHabits(newHabits);
    toggleDelHabitModal();
  };

  const addNewHabit = () => {
    navigation.navigate("Edit", { id: habits.length });
  };

  if (!habits) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
      {habits.length > 0 ? (
        <ScrollView>
          {habits.map((habit, index) => (
            <View style={styles.recordContent} key={index}>
              {/* Icon + title */}
              <View style={{ position: "absolute", top: -27, left: 20 }}>
                <View style={styles.habitIconBox}>
                  <View style={styles.habitIcon}>
                    <Text style={{ fontSize: Platform.OS === "ios" ? 40 : 35 }}>
                      {habit.icon}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Action */}
              <View style={styles.actionIconBox}>
                <TouchableOpacity
                  style={
                    new Date() < getNextNDays(habit.updatedAt, habit.duration)
                      ? [styles.actionIcon, { opacity: 0.5 }]
                      : styles.actionIcon
                  }
                  onPress={() => {
                    editHabit(index);
                  }}
                  disabled={
                    new Date() < getNextNDays(habit.updatedAt, habit.duration)
                  }
                >
                  <Feather name="edit" color="#fff" size={15} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    new Date() < getNextNDays(habit.updatedAt, habit.duration)
                      ? [styles.actionIcon, { opacity: 0.5 }]
                      : styles.actionIcon
                  }
                  onPress={() => {
                    setCurrentHabitId(index);
                    toggleDelHabitModal();
                  }}
                  disabled={
                    new Date() < getNextNDays(habit.updatedAt, habit.duration)
                  }
                >
                  <MaterialIcons name="delete" color="#fff" size={15} />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginBottom: 30,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "700", marginBottom: 5 }}
                >
                  {habit.name}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      fontStyle: "italic",
                      color: "#B3B3B3",
                      fontWeight: 700,
                    }}
                  >
                    {new Date() < getNextNDays(habit.updatedAt, habit.duration)
                      ? Math.round(
                          (getNextNDays(habit.updatedAt, habit.duration) -
                            new Date()) /
                            (24 * 60 * 60 * 1000),
                        )
                      : 0}{" "}
                    days left
                  </Text>
                </View>
              </View>

              <Slider
                value={renderValues[index]}
                onValueChange={(value) => {
                  let newValues = [...values];
                  let newRenderValues = [...renderValues];

                  let divider = Math.floor(
                    100 / (habits[index].criteria.length - 1),
                  );
                  let shiftedValue = value + divider / 2;

                  newValues[index] = Math.floor(shiftedValue / divider);
                  newRenderValues[index] = value;

                  setValues(newValues);
                  setRenderValues(newRenderValues);
                }}
                maximumValue={100}
                minimumValue={0}
                step={2}
                minimumTrackTintColor={color(
                  values[index],
                  habit.criteria.length - 1,
                )}
                onSlidingComplete={(value) => {
                  let newValues = [...values];
                  let newRenderValues = [...renderValues];

                  let divider = Math.floor(
                    100 / (habits[index].criteria.length - 1),
                  );
                  let shiftedValue = value + divider / 2;

                  newValues[index] = Math.floor(shiftedValue / divider);
                  newRenderValues[index] =
                    Math.floor(shiftedValue / divider) * divider;

                  setValues(newValues);
                  setRenderValues(newRenderValues);
                }}
                allowTouchTrack
                trackStyle={{ height: 25, borderRadius: 999 }}
                thumbStyle={{
                  height: 55,
                  width: 55,
                  borderRadius: 999,
                  backgroundColor: "#F9FDB8",
                  paddingTop: 2,
                  paddingLeft: Platform.OS === "ios" ? 3 : 0,
                }}
                thumbProps={{
                  children: (
                    <View style={{ alignItems: "center", gap: 5 }}>
                      <Text
                        style={{ fontSize: Platform.OS === "ios" ? 42 : 35 }}
                      >
                        {habit.criteria[values[index]].icon}
                      </Text>
                      <Text
                        style={{
                          width: 100,
                          textAlign: "center",
                          fontWeight: 800,
                          color: color(
                            values[index],
                            habit.criteria.length - 1,
                          ),
                        }}
                      >
                        {habit.criteria[values[index]].name}
                      </Text>
                    </View>
                  ),
                }}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 50,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#888",
              textAlign: "center",
            }}
          >
            You don't have any habits. Go and create your own habits to keep
            track!!!
          </Text>
        </View>
      )}

      {/* Submit button */}
      <View style={styles.submitBox}>
        <TouchableOpacity
          style={
            habits.length === 0
              ? [styles.submitButton, { opacity: 0.5 }]
              : styles.submitButton
          }
          onPress={submitRecord}
          disabled={isLoading || habits.length === 0}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.submitText}>Done</Text>
          )}
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
}

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
    marginTop: 35,
    padding: 20,
    paddingTop: 15,
    paddingBottom: 40,
    height: "auto",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 20,
    position: "relative",
  },
  habitIconBox: {
    backgroundColor: "#fff",
    borderRadius: 999,
  },
  habitIcon: {
    width: 65,
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: "#50AA7555",
    borderColor: "#3B6C78",
  },
  actionIconBox: {
    right: 15,
    top: -15,
    flexDirection: "row",
    gap: 8,
    position: "absolute",
  },
  actionIcon: {
    backgroundColor: "#3B6C78",
    borderRadius: 999,
    padding: 8,
  },
  statusContent: {
    // padding: 10,
    // borderRadius: 999,
    // color: "back",
    // fontWeight: "bold",
    // fontSize: 10,
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
