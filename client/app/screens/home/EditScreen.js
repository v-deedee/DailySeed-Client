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

const EditScreen = ({ navigation }) => {
  const [openAddNewCrModal, setOpenAddNewCrModal] = useState(false);
  const [openAddIconModal, setOpenAddIconModal] = useState(false);

  const [newCrName, setNewCrName] = useState("");

  const closeScreen = () => {
    navigation.navigate("Record");
  };

  const toggleNewCrModal = () => {
    setOpenAddNewCrModal(!openAddNewCrModal);
  };

  const togleAddIconModal = () => {
    setOpenAddIconModal(!openAddIconModal);
  };

  const addNewCritirion = () => {
    if (newCrName.length > 0) {
      critiria.push({
        name: newCrName,
        levels: [],
      });
      setNewCrName("");
    }
    toggleNewCrModal();
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <Text style={styles.headerText}>Edit critiria</Text>
        <TouchableOpacity style={styles.headerButton} onPress={closeScreen}>
          <MaterialIcons name="close" color={"#ACAC9A"} size={30} />
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center" }}>
        <View
          style={{
            alignItems: "center",
            margin: 15,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Feather name="edit" color="#3B6C78" size={20} />
          <Text style={{ fontWeight: "bold", color: "#3B6C78" }}>
            Edit icons in the block by tapping on it
          </Text>
        </View>
      </View>

      <ScrollView>
        {critiria.map((critirion, index) => (
          <View style={styles.recordContent} key={index}>
            <View style={styles.editTitleBox}>
              <Text style={styles.titleContent}>Title:</Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Enter new title"
                  value={critirion.name}
                  // onChangeText={(text) => setUsername(text)}
                />
              </View>
            </View>

            <View style={styles.editLevelBox}>
              {critirion.levels.map((level) => (
                <TouchableOpacity style={styles.levelBlock} key={level.icon}>
                  <Text style={styles.levelIcon}>{level.icon}</Text>
                  <Text style={styles.levelLabel}>{level.label}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.levelBlock}
                onPress={togleAddIconModal}
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

        <View style={styles.addBox}>
          <TouchableOpacity style={styles.addButton} onPress={toggleNewCrModal}>
            <MaterialIcons name="add-box" color={"#50AA75"} size={35} />
            <Text style={{ color: "#50AA75", fontWeight: "bold" }}>
              Add your own critiria
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.submitBox}>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Add new critirion modal */}
      <Dialog
        isVisible={openAddNewCrModal}
        onBackdropPress={toggleNewCrModal}
        overlayStyle={{
          borderRadius: 30,
        }}
      >
        <View style={{ alignItems: "center", paddingBottom: 20 }}>
          <Dialog.Title title="Add new critirion" titleStyle={{}} />
        </View>
        <View style={styles.modalInputView}>
          <TextInput
            style={styles.modalInputText}
            placeholder="Enter critirion name"
            selectionColor="#ccc"
            value={newCrName}
            onChangeText={(text) => setNewCrName(text)}
          />
        </View>
        <View style={styles.modalButtonGroup}>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: "#ccc" }]}
            onPress={toggleNewCrModal}
          >
            <Text style={{ fontWeight: "bold", color: "#474838" }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: "#50AA75" }]}
            onPress={addNewCritirion}
          >
            <Text style={{ fontWeight: "bold", color: "#fff" }}>Done</Text>
          </TouchableOpacity>
        </View>
      </Dialog>

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

        <View style={styles.editTitleBox}>
          <Text style={styles.titleContent}>Icon:</Text>
          <View style={[styles.inputView, { width: "80%" }]}>
            <TextInput
              style={styles.inputText}
              placeholder="Choose an icon from keyboard"
              // value={critirion.name}
              // onChangeText={(text) => setUsername(text)}
            />
          </View>
        </View>

        <Text>Label</Text>
        <View style={styles.modalInputView}>
          <TextInput
            style={styles.modalInputText}
            placeholder="Enter icon label"
            selectionColor="#ccc"
            value={newCrName}
            // onChangeText={(text) => setNewCrName(text)}
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
            // onPress={addNewCritirion}
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
  contentBlock: {
    padding: 20,
  },
  editTitleBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleContent: {
    fontWeight: "600",
    marginRight: 5,
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
    // color: "#003f5c",
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
    // marginVertical: 20,
  },
  modalInputText: {
    height: 50,
    // color: "#003f5c",
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
    // width: "40%",
    // paddingHorizontal: 30,
    paddingVertical: 15,
    // margin: 5,
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
