import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Slider } from "@rneui/themed";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

import { color } from "../../utils/utils";
import LevelModal from "./_component/modals/LevelModal";
import ConfirmSaveHabitModal from "./_component/modals/ConfirmSaveHabitModal";

const habits = [
  {
    icon: "😈",
    name: "Emotion",
    duration: 1,
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
    duration: 1,
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
    duration: 1,
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
  {
    icon: "☺️",
    name: "Sample",
    duration: 1,
    levels: [
      {
        label: "Sample 1",
        icon: "😟",
      },
      {
        label: "Sample 2",
        icon: "😀",
      },
    ],
  },
];

export default function EditScreen({ navigation }) {
  const route = useRoute();
  let currentId = route.params?.id;

  const [habitIcon, setHabitIcon] = useState(habits[currentId].icon);
  const [habitName, setHabitName] = useState(habits[currentId].name);
  const [habitDuration, setHabitDuration] = useState(
    habits[currentId].duration.toString(),
  );

  const [openLevelModal, setOpenLevelModal] = useState(false);

  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const [modalType, setModalType] = useState("");

  const [iconInput, setIconInput] = useState("");
  const [labelInput, setLabelInput] = useState("");

  const [toggleReRender, setToggleReRender] = useState(false);

  // slider value
  const [value, setValue] = useState(0);

  const [renderValue, setRenderValue] = useState(0);

  const toggleLevelModal = () => {
    setOpenLevelModal(!openLevelModal);
  };

  const toggleConfirmModal = () => {
    setOpenConfirmModal(!openConfirmModal);
  };

  const addNewLevel = () => {
    if (iconInput.length > 0 && labelInput.length > 0) {
      habits[currentId].levels.push({
        label: labelInput,
        icon: iconInput,
      });
      setValue(habits[currentId].levels.length - 1);
      setRenderValue(100);
      setIconInput("");
      setLabelInput("");
    }

    toggleLevelModal();
  };

  const editLevel = () => {
    if (iconInput.length > 0 && labelInput.length > 0) {
      habits[currentId].levels[value].icon = iconInput;
      habits[currentId].levels[value].label = labelInput;

      setIconInput("");
      setLabelInput("");
    }

    toggleLevelModal();
  };

  const deleteLevel = () => {
    let temp = [...habits[currentId].levels];
    temp.splice(value, 1);
    setValue(0);
    setRenderValue(0);
    habits[currentId].levels = [...temp];
    setToggleReRender(!toggleReRender);
  };

  const closeScreen = () => {
    navigation.navigate("Record");
  };

  const submit = () => {
    navigation.navigate("Record");
  };

  return (
    <View style={styles.container}>
      <StatusBar />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Custom habit</Text>
        <TouchableOpacity style={{ padding: 20 }} onPress={closeScreen}>
          <MaterialIcons name="close" color={"#ACAC9A"} size={30} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.recordContent}>
          {/* Habit icon + habit name */}
          <View style={{ gap: 10, marginBottom: 10 }}>
            {/* Habit icon */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ width: "22%", fontWeight: 700 }}>Icon: </Text>
              <View style={[styles.inputView, { flex: 1 }]}>
                <TextInput
                  style={{ height: 50 }}
                  placeholder="Enter habit name"
                  selectionColor="#ccc"
                  value={habitIcon}
                  onChangeText={(text) => setHabitIcon(text)}
                />
              </View>
              <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                <MaterialIcons name="check" size={30} color="#008D6A" />
              </TouchableOpacity>
            </View>

            {/* Habit name */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ width: "22%", fontWeight: 700 }}>Name: </Text>
              <View style={[styles.inputView, { flex: 1 }]}>
                <TextInput
                  style={{ height: 50 }}
                  placeholder="Enter habit name"
                  selectionColor="#ccc"
                  value={habitName}
                  onChangeText={(text) => setHabitName(text)}
                />
              </View>
              <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                <MaterialIcons name="check" size={30} color="#008D6A" />
              </TouchableOpacity>
            </View>

            {/* Habit duration */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <Text style={{ fontWeight: 700 }}>Duration: </Text>
                <View
                  style={{
                    borderBottomWidth: 2,
                    marginLeft: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    keyboardType="numeric"
                    maxLength={3}
                    style={{ height: 30, width: 50 }}
                    selectionColor="#aaa"
                    value={habitDuration}
                    onChangeText={(text) => setHabitDuration(text)}
                  />
                  <Text style={{}}>(days)</Text>
                </View>
              </View>
              <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                <MaterialIcons name="check" size={30} color="#008D6A" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Habit levels */}
          <View
            style={{ paddingTop: 10, borderTopWidth: 0.5, borderColor: "#ccc" }}
          >
            {/* Levels header: Title + Add level button */}
            <View style={styles.levelHeader}>
              {/* Title */}
              <Text style={{ fontWeight: 700 }}>Levels: </Text>

              {/* Add level button */}
              <TouchableOpacity
                style={
                  habits[currentId].levels.length >= 5
                    ? [styles.addLevelButton, { opacity: 0.5 }]
                    : styles.addLevelButton
                }
                onPress={() => {
                  setModalType("add");
                  setIconInput("");
                  setLabelInput("");
                  toggleLevelModal();
                }}
                disabled={habits[currentId].levels.length >= 5}
              >
                <MaterialIcons name="playlist-add" color="#fff" size={15} />
                <Text style={{ color: "#fff", fontWeight: 700 }}>
                  New level
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.levelContent}>
              <Slider
                value={renderValue}
                onValueChange={(value) => {
                  let divider = Math.floor(
                    100 / (habits[currentId].levels.length - 1),
                  );
                  let shiftedValue = value + divider / 2;
                  setValue(Math.floor(shiftedValue / divider));
                  setRenderValue(value);
                }}
                maximumValue={100}
                minimumValue={0}
                step={2}
                minimumTrackTintColor={color(
                  value,
                  habits[currentId].levels.length - 1,
                )}
                onSlidingComplete={(value) => {
                  let divider = Math.floor(
                    100 / (habits[currentId].levels.length - 1),
                  );
                  let shiftedValue = value + divider / 2;
                  setValue(Math.floor(shiftedValue / divider));
                  setRenderValue(Math.floor(shiftedValue / divider) * divider);
                }}
                allowTouchTrack
                style={{ width: "100%", marginBottom: 30 }}
                trackStyle={{ height: 20, borderRadius: 999 }}
                thumbStyle={styles.sliderThumbStyle}
                thumbProps={{
                  children: (
                    <View style={{ alignItems: "center", gap: 10 }}>
                      <Text style={{ fontSize: 35 }}>
                        {habits[currentId].levels[value].icon}
                      </Text>
                      <Text
                        style={{
                          fontWeight: 800,
                          color: color(
                            value,
                            habits[currentId].levels.length - 1,
                          ),
                        }}
                      >
                        {Math.floor(
                          (value * 100) / (habits[currentId].levels.length - 1),
                        )}
                        %
                      </Text>
                    </View>
                  ),
                }}
              />

              {/* Level info */}
              <View style={styles.levelInfo}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontWeight: 700 }}>Level: </Text>
                  <Text>{value + 1}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontWeight: 700 }}>Icon: </Text>
                  <Text style={{ fontSize: 25 }}>
                    {habits[currentId].levels[value].icon}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontWeight: 700 }}>Label: </Text>
                  <Text>{habits[currentId].levels[value].label}</Text>
                </View>
              </View>

              <View style={styles.actionButtonGroup}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: "#529290" }]}
                  onPress={() => {
                    setModalType("edit");
                    setIconInput(habits[currentId].levels[value].icon);
                    setLabelInput(habits[currentId].levels[value].label);
                    toggleLevelModal();
                  }}
                >
                  <AntDesign name="edit" color="#fff" size={15} />
                  <Text style={{ fontWeight: "bold", color: "#fff" }}>
                    Edit level
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    habits[currentId].levels.length <= 2
                      ? [
                          styles.actionButton,
                          { backgroundColor: "#E94D61", opacity: 0.5 },
                        ]
                      : [styles.actionButton, { backgroundColor: "#E94D61" }]
                  }
                  onPress={deleteLevel}
                  disabled={habits[currentId].levels.length <= 2}
                >
                  <MaterialIcons name="delete" color="#fff" size={15} />
                  <Text style={{ fontWeight: "bold", color: "#fff" }}>
                    Delete level
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Submit button */}
      <View style={styles.submitBox}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={toggleConfirmModal}
        >
          <Text style={styles.submitText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Level modal */}
      <LevelModal
        isOpen={openLevelModal}
        toggle={toggleLevelModal}
        type={modalType}
        iconInput={iconInput}
        setIconInput={setIconInput}
        labelInput={labelInput}
        setLabelInput={setLabelInput}
        addNewLevel={addNewLevel}
        editLevel={editLevel}
      />

      <ConfirmSaveHabitModal
        isOpen={openConfirmModal}
        toggle={toggleConfirmModal}
        duration={parseInt(habitDuration)}
        save={submit}
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
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  headerText: {
    margin: 20,
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
  inputView: {
    width: "70%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    padding: 10,
  },
  levelHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addLevelButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#50AA75",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  levelContent: {
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#E3F8F9",
    borderRadius: 10,
    padding: 20,
  },
  sliderThumbStyle: {
    height: 55,
    width: 55,
    borderRadius: 999,
    backgroundColor: "#F9FDB8",
    paddingTop: 2,
  },
  levelInfo: {
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 8,
    width: "100%",
    paddingHorizontal: 10,
  },
  actionButtonGroup: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    paddingTop: 20,
  },
  actionButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    gap: 5,
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
