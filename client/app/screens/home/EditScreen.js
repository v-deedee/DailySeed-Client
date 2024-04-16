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

import { Dialog, Slider } from "@rneui/themed";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";

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
  {
    name: "Sample",
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

const EditScreen = ({ navigation }) => {
  const [toggleReRender, setToggleReRender] = useState(false);

  const route = useRoute();
  let currentId = route.params?.id;

  const [habitName, setHabitName] = useState(() => {
    if (currentId !== habits.length) {
      return habits[currentId].name;
    } else {
      return "";
    }
  });

  // slider value
  const [value, setValue] = useState(0);

  const [iconInput, setIconInput] = useState("");

  const [labelInput, setLabelInput] = useState("");

  const [openAddLevelModal, setOpenAddLevelModal] = useState(false);

  const [openEditLevelModal, setOpenEditLevelModal] = useState(false);

  const toggleAddLevelModal = () => {
    setIconInput("");
    setLabelInput("");
    setOpenAddLevelModal(!openAddLevelModal);
  };

  const toggleEditLevelModal = () => {
    setOpenEditLevelModal(!openEditLevelModal);
  };

  const addNewLevel = () => {
    if (currentId !== habits.length) {
      if (iconInput.length > 0 && labelInput.length > 0) {
        habits[currentId].levels.push({
          label: labelInput,
          icon: iconInput,
        });
        setValue(habits[currentId].levels.length - 1);
        setIconInput("");
        setLabelInput("");
      }
    } else {
      setValue(0);
    }
    toggleAddLevelModal();
  };

  const editLevel = () => {
    if (currentId !== habits.length) {
      habits[currentId].levels[value].icon = iconInput;
      habits[currentId].levels[value].label = labelInput;

      setIconInput("");
      setLabelInput("");
    }

    toggleEditLevelModal();
  };

  const deleteLevel = () => {
    if (currentId !== habits.length) {
      if (value !== 0) {
        let temp = [...habits[currentId].levels];
        temp.splice(value, 1);
        habits[currentId].levels = [...temp];
        setValue(0);
      } else {
        let temp = [...habits[currentId].levels];
        temp.shift();
        habits[currentId].levels = [...temp];
        setToggleReRender(!toggleReRender);
      }
    }
  };

  const closeScreen = () => {
    navigation.navigate("Record");
  };

  const submit = () => {
    navigation.navigate("Record");
  };

  // useEffect(() => {
  //   habits.push({

  //   });
  //   console.log(habits);
  //   setValue(0);
  // }, []);

  return (
    <View style={styles.container}>
      <StatusBar />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Custom habit</Text>
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
              margin: 10,
              flexDirection: "row",
              gap: 10,
            }}
          ></View>
        </View>

        <View style={styles.recordContent}>
          <View style={styles.titleBox}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: 700 }}>Name: </Text>
              <View style={[styles.inputView, { flex: 1 }]}>
                <TextInput
                  style={styles.inputText}
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
          </View>

          <View
            style={{
              paddingTop: 10,
              borderTopWidth: 0.5,
              borderColor: "#ccc",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: 700 }}>Levels: </Text>
            <TouchableOpacity
              style={
                habits[currentId].levels.length >= 5
                  ? {
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      backgroundColor: "#50AA75",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      opacity: 0.5,
                    }
                  : {
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      backgroundColor: "#50AA75",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }
              }
              onPress={toggleAddLevelModal}
              disabled={habits[currentId].levels.length >= 5}
            >
              <MaterialIcons name="playlist-add" color="#fff" size={15} />
              <Text style={{ color: "#fff", fontWeight: 700 }}>New level</Text>
            </TouchableOpacity>
          </View>
          {currentId !== habits.length ? (
            <View
              style={{
                marginTop: 10,
                alignItems: "center",
                backgroundColor: "#E3F8F9",
                borderRadius: 10,
                padding: 20,
              }}
            >
              <Slider
                value={value}
                onValueChange={setValue}
                maximumValue={
                  currentId !== habits.length
                    ? habits[currentId].levels.length - 1
                    : 0
                }
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
                  height: 45,
                  width: 55,
                  backgroundColor: "transparent",
                }}
                thumbProps={{
                  children: (
                    <View style={{ alignItems: "center", marginTop: 5 }}>
                      <Text
                        style={{
                          paddingHorizontal: 3,
                          paddingBottom: 3,
                          fontSize: 40,
                          marginTop: -10,
                          backgroundColor: "#F9FDB8",
                          borderRadius: 999,
                        }}
                      >
                        {currentId !== habits.length
                          ? habits[currentId].levels[value].icon
                          : ""}
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
                style={{ width: "100%", marginBottom: 30 }}
              />
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  gap: 8,
                  width: "100%",
                  paddingHorizontal: 10,
                }}
              >
                {currentId !== habits.length ? (
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontWeight: 700 }}>Level: </Text>
                      <Text>{value + 1}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontWeight: 700 }}>Icon: </Text>
                      <Text style={{ fontSize: 25 }}>
                        {habits[currentId].levels[value].icon}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontWeight: 700 }}>Label: </Text>
                      <Text>{habits[currentId].levels[value].label}</Text>
                    </View>
                  </>
                ) : (
                  <></>
                )}
              </View>

              <View style={[styles.modalButtonGroup, { width: "100%" }]}>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    {
                      backgroundColor: "#529290",
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: 5,
                    },
                  ]}
                  onPress={() => {
                    if (currentId !== habits.length) {
                      setIconInput(habits[currentId].levels[value].icon);
                      setLabelInput(habits[currentId].levels[value].label);
                    }
                    toggleEditLevelModal();
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
                          styles.modalButton,
                          {
                            backgroundColor: "#E94D61",
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: 5,
                            opacity: 0.5,
                          },
                        ]
                      : [
                          styles.modalButton,
                          {
                            backgroundColor: "#E94D61",
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: 5,
                          },
                        ]
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
          ) : (
            <></>
          )}
        </View>
      </ScrollView>

      {/* Submit button */}
      <View style={styles.submitBox}>
        <TouchableOpacity style={styles.submitButton} onPress={submit}>
          <Text style={styles.submitText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Add Level modal */}
      <Dialog
        isVisible={openAddLevelModal}
        onBackdropPress={toggleAddLevelModal}
        overlayStyle={{
          borderRadius: 30,
        }}
      >
        <View style={{ alignItems: "center", paddingBottom: 20 }}>
          <Dialog.Title title="Add level" titleStyle={{}} />
        </View>

        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Icon</Text>
        <View style={styles.modalInputView}>
          <TextInput
            style={styles.modalInputText}
            placeholder="Choose an icon from keyboard"
            selectionColor="#ccc"
            value={iconInput}
            onChangeText={(text) => setIconInput(text)}
          />
        </View>

        <View style={{ height: 20 }}></View>

        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Label</Text>
        <View style={styles.modalInputView}>
          <TextInput
            style={styles.modalInputText}
            placeholder="Enter icon label"
            selectionColor="#ccc"
            value={labelInput}
            onChangeText={(text) => setLabelInput(text)}
          />
        </View>
        <View style={styles.modalButtonGroup}>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: "#ccc" }]}
            onPress={toggleAddLevelModal}
          >
            <Text style={{ fontWeight: "bold", color: "#474838" }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: "#50AA75" }]}
            onPress={addNewLevel}
          >
            <Text style={{ fontWeight: "bold", color: "#fff" }}>Done</Text>
          </TouchableOpacity>
        </View>
      </Dialog>

      {/* Edit Level modal */}
      <Dialog
        isVisible={openEditLevelModal}
        onBackdropPress={toggleEditLevelModal}
        overlayStyle={{
          borderRadius: 30,
        }}
      >
        <View style={{ alignItems: "center", paddingBottom: 20 }}>
          <Dialog.Title title="Edit level" titleStyle={{}} />
        </View>

        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Icon</Text>
        <View style={styles.modalInputView}>
          <TextInput
            style={styles.modalInputText}
            placeholder="Choose an icon from keyboard"
            selectionColor="#ccc"
            value={iconInput}
            onChangeText={(text) => setIconInput(text)}
          />
        </View>

        <View style={{ height: 20 }}></View>

        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Label</Text>
        <View style={styles.modalInputView}>
          <TextInput
            style={styles.modalInputText}
            placeholder="Enter icon label"
            selectionColor="#ccc"
            value={labelInput}
            onChangeText={(text) => setLabelInput(text)}
          />
        </View>
        <View style={styles.modalButtonGroup}>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: "#ccc" }]}
            onPress={toggleEditLevelModal}
          >
            <Text style={{ fontWeight: "bold", color: "#474838" }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: "#50AA75" }]}
            onPress={editLevel}
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
    marginBottom: 10,
  },
  titleContent: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 5,
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
    width: "70%",
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
