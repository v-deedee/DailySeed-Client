import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import { Dialog } from "@rneui/themed";

import Entypo from "react-native-vector-icons/Entypo";

import { EmojiPicker } from "../../../../components/EmojiPicker/EmojiPicker";

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
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

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

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontWeight: 700 }}>Icon: </Text>
        <View
          style={{
            minWidth: 40,
            minHeight: 35,
            paddingHorizontal: 10,
            paddingVertical: 5,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#EAEAEA",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 25 }}>{iconInput}</Text>
        </View>
        <TouchableOpacity
          style={{ paddingHorizontal: 10, flexDirection: "row" }}
          onPress={() => setOpenEmojiPicker(true)}
        >
          <Entypo name="emoji-happy" size={25} color="#aaa" />
        </TouchableOpacity>
        <EmojiPicker
          open={openEmojiPicker}
          onClose={() => {
            setOpenEmojiPicker(false);
          }}
          onEmojiSelected={(emoji) => {
            setIconInput(emoji);
          }}
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
