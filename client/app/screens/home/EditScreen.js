import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { Dialog } from "@rneui/themed";
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

const EditScreen = ({ navigation }) => {
  const [openEditHabitModal, setOpenEditHabitModel] = useState(false);
  const [openAddHabitModal, setOpenAddHabitModal] = useState(false);
  const [openAddIconModal, setOpenAddIconModal] = useState(false);
  const [openDelHabitModal, setOpenDelHabitModal] = useState(false);

  const [currentHabitId, setCurrentHabitId] = useState(0);
  const [currentHabitName, setCurrentHabitName] = useState("");

  const [newHabitName, setNewHabitName] = useState("");
  const [newIcon, setNewIcon] = useState("");
  const [newIconLabel, setNewIconLabel] = useState("");

  const closeScreen = () => {
    navigation.navigate("Record");
  };

  const toggleEditHabitModal = () => {
    setOpenEditHabitModel(!openEditHabitModal);
  };

  const toggleAddHabitModal = () => {
    setOpenAddHabitModal(!openAddHabitModal);
  };

  const togleAddIconModal = () => {
    setOpenAddIconModal(!openAddIconModal);
  };

  const toggleDelHabitModal = () => {
    setOpenDelHabitModal(!openDelHabitModal);
  };

  const editHabit = () => {
    if (currentHabitName.length > 0) {
      habits[currentHabitId].name = currentHabitName;
      setCurrentHabitName("");
    }

    toggleEditHabitModal();
  };

  const deleteHabit = () => {
    habits.splice(currentHabitId, 1);

    toggleDelHabitModal();
  };

  const addNewHabit = () => {
    if (newHabitName.length > 0) {
      habits.push({
        name: newHabitName,
        levels: [],
      });
      setNewHabitName("");
    }
    toggleAddHabitModal();
  };

  const addNewIcon = () => {
    if (newIcon.length > 0) {
      habits[currentHabitId].levels.push({
        label: newIconLabel,
        icon: newIcon,
      });
      setNewIcon("");
      setNewIconLabel("");
    }
    togleAddIconModal();
  };

  return (
    <View style={styles.container}>
      <StatusBar />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Custom habits</Text>
        <TouchableOpacity style={styles.headerButton} onPress={closeScreen}>
          <MaterialIcons name="close" color={"#ACAC9A"} size={30} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Note */}
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              alignItems: "center",
              margin: 15,
              flexDirection: "row",
              gap: 10,
            }}
          >
            {/* <Feather name="edit" color="#3B6C78" size={20} /> */}
            <Text style={{ fontWeight: "bold", color: "#3B6C78" }}>
              Edit icons in the block by tapping on it
            </Text>
          </View>
        </View>

        {habits.map((habit, index) => (
          <View style={styles.recordContent} key={index}>
            <View style={styles.titleBox}>
              <View>
                <Text style={styles.titleContent}>{habit.name}</Text>
              </View>
              <View style={styles.actionIconBox}>
                <TouchableOpacity
                  style={styles.actionIcon}
                  onPress={() => {
                    setCurrentHabitName(habit.name);
                    toggleEditHabitModal();
                  }}
                >
                  <Feather name="edit" color="#fff" size={15} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionIcon}
                  onPress={() => {
                    setCurrentHabitId(index), toggleDelHabitModal();
                  }}
                >
                  <MaterialIcons name="delete" color="#fff" size={15} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.editLevelBox}>
              {habit.levels.map((level, index) => (
                <TouchableOpacity
                  style={styles.levelBlock}
                  key={"icon" + index}
                >
                  <Text style={styles.levelIcon}>{level.icon}</Text>
                  <Text style={styles.levelLabel}>{level.label}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.levelBlock}
                onPress={() => {
                  setCurrentHabitId(index);
                  togleAddIconModal();
                }}
              >
                <AntDesign
                  name="pluscircle"
                  color={"#50AA75"}
                  size={45}
                  style={{ marginTop: 8 }}
                />
                <Text style={{ color: "#50AA75" }}>New icon</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Add new habit button */}
        <View style={styles.addBox}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={toggleAddHabitModal}
          >
            <MaterialIcons name="add-box" color={"#50AA75"} size={35} />
            <Text style={{ color: "#50AA75", fontWeight: "bold" }}>
              Add your own habits
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Submit button */}
      <View style={styles.submitBox}>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Edit habit name modal */}
      <Dialog
        isVisible={openEditHabitModal}
        onBackdropPress={toggleEditHabitModal}
        overlayStyle={{
          borderRadius: 30,
        }}
      >
        <View style={{ alignItems: "center", paddingBottom: 20 }}>
          <Dialog.Title title="Edit habit name" titleStyle={{}} />
        </View>

        <View style={styles.modalInputView}>
          <TextInput
            style={styles.modalInputText}
            placeholder="Enter habit name"
            selectionColor="#ccc"
            value={currentHabitName}
            onChangeText={(text) => setCurrentHabitName(text)}
          />
        </View>
        <View style={styles.modalButtonGroup}>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: "#ccc" }]}
            onPress={toggleEditHabitModal}
          >
            <Text style={{ fontWeight: "bold", color: "#474838" }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: "#50AA75" }]}
            onPress={editHabit}
          >
            <Text style={{ fontWeight: "bold", color: "#fff" }}>Done</Text>
          </TouchableOpacity>
        </View>
      </Dialog>

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
            onPress={deleteHabit}
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

      {/* Add new habit modal */}
      <Dialog
        isVisible={openAddHabitModal}
        onBackdropPress={toggleAddHabitModal}
        overlayStyle={{
          borderRadius: 30,
        }}
      >
        <View style={{ alignItems: "center", paddingBottom: 20 }}>
          <Dialog.Title title="Add new habit" titleStyle={{}} />
        </View>
        <View style={styles.modalInputView}>
          <TextInput
            style={styles.modalInputText}
            placeholder="Enter habit name"
            selectionColor="#ccc"
            value={newHabitName}
            onChangeText={(text) => setNewHabitName(text)}
          />
        </View>
        <View style={styles.modalButtonGroup}>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: "#ccc" }]}
            onPress={toggleAddHabitModal}
          >
            <Text style={{ fontWeight: "bold", color: "#474838" }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: "#50AA75" }]}
            onPress={addNewHabit}
          >
            <Text style={{ fontWeight: "bold", color: "#fff" }}>Done</Text>
          </TouchableOpacity>
        </View>
      </Dialog>

      {/* Add new icon modal */}
      <Dialog
        isVisible={openAddIconModal}
        onBackdropPress={togleAddIconModal}
        overlayStyle={{
          borderRadius: 30,
        }}
      >
        <View style={{ alignItems: "center", paddingBottom: 20 }}>
          <Dialog.Title title="Add icon" titleStyle={{}} />
        </View>

        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Icon</Text>
        <View style={styles.modalInputView}>
          <TextInput
            style={styles.modalInputText}
            placeholder="Choose an icon from keyboard"
            selectionColor="#ccc"
            value={newIcon}
            onChangeText={(text) => setNewIcon(text)}
          />
        </View>

        <View style={{ height: 20 }}></View>

        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Label</Text>
        <View style={styles.modalInputView}>
          <TextInput
            style={styles.modalInputText}
            placeholder="Enter icon label"
            selectionColor="#ccc"
            value={newIconLabel}
            onChangeText={(text) => setNewIconLabel(text)}
          />
        </View>
        <View style={styles.modalButtonGroup}>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: "#ccc" }]}
            onPress={togleAddIconModal}
          >
            <Text style={{ fontWeight: "bold", color: "#474838" }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: "#50AA75" }]}
            onPress={addNewIcon}
          >
            <Text style={{ fontWeight: "bold", color: "#fff" }}>Done</Text>
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
    backgroundColor: "#fff",
  },
  headerButton: {
    padding: 20,
  },
  headerText: {
    margin: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#474838",
  },
  titleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  titleContent: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 5,
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
  editLevelBox: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 10,
  },
  levelBlock: {
    flexDirection: "col",
    alignItems: "center",
    width: 60,
  },
  levelIcon: {
    fontSize: 40,
  },
  inputView: {
    width: "50%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    padding: 10,
  },
  inputText: {
    height: 50,
  },
  modalInputView: {
    width: "100%",
    backgroundColor: "#E5E5E5",
    color: "#000",
    fontWeight: "bold",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    padding: 20,
  },
  modalInputText: {
    height: 50,
    fontWeight: "bold",
  },
  recordContent: {
    padding: 20,
    height: "auto",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
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

export default EditScreen;
