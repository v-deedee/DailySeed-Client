import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import { Dialog, CheckBox } from "@rneui/themed";
import { trees } from "../../../../utils/utils";

export default function SelectTreeModal({
  isOpen,
  toggle,
  treeType,
  setTreeType,
}) {
  return (
    <Dialog
      isVisible={isOpen}
      overlayStyle={{
        borderRadius: 30,
        width: "90%",
      }}
      style={{ width: "100%" }}
    >
      <View style={{ alignItems: "center", paddingBottom: 20 }}>
        <Dialog.Title
          title="Which kind of tree do you want to grow?"
          titleStyle={{ textAlign: "center", width: "80%", color: "#474838" }}
        />
      </View>

      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <TouchableOpacity
          style={treeType === 1 ? styles.modalOptionActive : styles.modalOption}
          onPress={() => setTreeType(1)}
        >
          <Image source={trees[0][3]} style={{ width: 80, height: 80 }} />
          <CheckBox
            checked={treeType === 1}
            onPress={() => setTreeType(1)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={treeType === 2 ? styles.modalOptionActive : styles.modalOption}
          onPress={() => setTreeType(2)}
        >
          <Image source={trees[1][3]} style={{ width: 80, height: 80 }} />
          <CheckBox
            checked={treeType === 2}
            onPress={() => setTreeType(2)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={treeType === 3 ? styles.modalOptionActive : styles.modalOption}
          onPress={() => setTreeType(3)}
        >
          <Image source={trees[2][3]} style={{ width: 80, height: 80 }} />
          <CheckBox
            checked={treeType === 3}
            onPress={() => setTreeType(3)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.modalButtonGroup}>
        <TouchableOpacity
          style={[styles.modalButton, { backgroundColor: "#50AA75" }]}
          onPress={toggle}
        >
          <Text style={{ fontWeight: "bold", color: "#fff" }}>Done</Text>
        </TouchableOpacity>
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  modalOption: {
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  modalOptionActive: {
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#2089DC",
  },
  modalButtonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
  },
  modalButton: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
  },
});
