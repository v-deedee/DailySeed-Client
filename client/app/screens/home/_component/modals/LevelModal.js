import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Dialog } from "@rneui/themed";

export default function LevelModal({
  isOpen,
  toggle,
  type,
  iconInput,
  setIconInput,
  labelInput,
  setLabelInput,
  addNewLevel,
  editLevel,
}) {
  return (
    <Dialog
      isVisible={isOpen}
      onBackdropPress={toggle}
      overlayStyle={{
        borderRadius: 30,
      }}
    >
      <View style={{ alignItems: "center", paddingBottom: 20 }}>
        <Dialog.Title
          title={type === "add" ? "Add level" : "Edit level"}
          titleStyle={{}}
        />
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
          onPress={() => {
            setIconInput("");
            setLabelInput("");
            toggle();
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#474838" }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalButton, { backgroundColor: "#50AA75" }]}
          onPress={type === "add" ? addNewLevel : editLevel}
        >
          <Text style={{ fontWeight: "bold", color: "#fff" }}>Done</Text>
        </TouchableOpacity>
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
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
