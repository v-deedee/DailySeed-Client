import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Dialog } from "@rneui/themed";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function ConfirmDeleteHabitModal({
  isOpen,
  toggle,
  deleteHabit,
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
          onPress={toggle}
        >
          <Text style={{ fontWeight: "bold", color: "#fff" }}>No</Text>
        </TouchableOpacity>
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
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
