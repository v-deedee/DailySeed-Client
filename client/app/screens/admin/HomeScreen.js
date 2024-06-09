import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import TabAll from "../shop/_component/TabAll";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { Dialog } from "@rneui/base";
import CustomImagePicker from "./_component/ImagePicker";

export default function HomeScreen() {
  const { role } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", width: "100%" }}>
        <Text style={styles.title}>Admin Shop</Text>
      </View>

      <View style={{ padding: 10 }}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "#649B92",
            padding: 12,
            borderRadius: 10,
          }}
          onPress={() => setShowModal(true)}
        >
          <FontAwesome6 name="plus" size={18} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "600", marginLeft: 5 }}>Add</Text>
        </TouchableOpacity>
      </View>

      <Dialog
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        overlayStyle={{
          borderRadius: 30,
          backgroundColor: 'white'
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontWeight: "bold", marginBottom: 5, fontSize: 18 }}>Add Seed</Text>
        </View>
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Seed Name</Text>
        <View style={styles.modalInputView}>
          <TextInput
            style={styles.modalInputText}
            placeholder="Enter seed name"
            selectionColor="#ccc"
          />
        </View>
        <View style={styles.modalInputView}>
          <TextInput
            style={styles.modalInputText}
            placeholder="Enter seed price"
            selectionColor="#ccc"
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
            <CustomImagePicker phase={"Phase 1"} />
            <CustomImagePicker phase={"Phase 2"} />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 20 }}>
            <CustomImagePicker phase={"Phase 3"} />
            <CustomImagePicker phase={"Phase 4"} />
          </View>
        </View>


        <TouchableOpacity
          style={[styles.modalButton, { backgroundColor: "#50AA75" }]}
        >
          <Text style={{ fontWeight: "bold", color: "#fff" }}>Done</Text>
        </TouchableOpacity>
      </Dialog>

      <TabAll />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fbf5e5",
    flex: 1,
  },
  title: {
    marginVertical: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#474838",
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  inputView: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    padding: 10,
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
    marginTop: 10
  },
  modalInputText: {
    height: 50,
    fontWeight: "bold",
  },
  modalButton: {
    alignItems: "center",
    paddingVertical: 10,
    height: "auto",
    borderRadius: 10,
    marginTop: 20
  },
});
