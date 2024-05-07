import { StyleSheet, Image, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Dialog, CheckBox } from "@rneui/themed";
import { useContext } from "react";
import { SeedContext } from "../../../../contexts/seed.context";
import { CLOUDINARY_BASE_URL } from "../../../../utils/constants/cloudinary.constants"

export default function SelectTreeModal({ isOpen, toggle, treeType, setTreeType, }) {
  const { seeds } = useContext(SeedContext);

  if (!seeds) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Dialog isVisible={isOpen} overlayStyle={{ borderRadius: 30, width: "90%", }} style={{ width: "100%" }} >
      <View style={{ alignItems: "center", paddingBottom: 20 }}>
        <Dialog.Title title="Which kind of tree do you want to grow?" titleStyle={{ textAlign: "center", width: "80%", color: "#474838" }} />
      </View>
      <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 10, }} >
        {seeds.map((seed, index) => (
          <TouchableOpacity
            key={index}
            style={treeType === index + 1 ? styles.modalOptionActive : styles.modalOption}
            onPress={() => setTreeType(index + 1)}
          >
            <Image
              source={{ uri: `${CLOUDINARY_BASE_URL}${seed.assets[0]}` }}
              style={{ width: 80, height: 80 }}
            />
            <CheckBox
              checked={treeType === index + 1}
              onPress={() => setTreeType(index + 1)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.modalButtonGroup}>
        <TouchableOpacity style={[styles.modalButton, { backgroundColor: "#50AA75" }]} onPress={toggle} >
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