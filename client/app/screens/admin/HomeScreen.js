import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Dialog } from "@rneui/base";
import { TabView } from "@rneui/themed";

import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

import { UserContext } from ".../../../contexts/user.context";
import CustomImagePicker from "./_component/ImagePicker";
import TabAll from "../user/shop/_component/TabAll";

export default function HomeScreen() {
  const { role } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const [seedName, setSeedName] = useState("");
  const [seedPrice, setSeedPrice] = useState(0);

  const [phase1Image, setPhase1Image] = useState(null);
  const [phase2Image, setPhase2Image] = useState(null);
  const [phase3Image, setPhase3Image] = useState(null);
  const [phase4Image, setPhase4Image] = useState(null);

  return (
    <View style={styles.container}>
      <View>
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
            <Text style={{ color: "#fff", fontWeight: "600", marginLeft: 5 }}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TabView disableTransition={true}>
        <TabView.Item style={{ width: "100%" }}>
          <TabAll role={role} />
        </TabView.Item>
      </TabView>

      <Dialog
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        overlayStyle={{
          borderRadius: 10,
          backgroundColor: "white",
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Add Seed</Text>
        </View>

        <Text style={{ fontWeight: "bold", marginLeft: 5 }}>Price</Text>
        <View style={styles.modalInputView}>
          <TextInput
            keyboardType="numeric"
            style={styles.modalInputText}
            placeholder="Enter seed price"
            selectionColor="#ccc"
            value={seedPrice}
            onChangeText={(number) => setSeedPrice(number)}
          />
        </View>
        <Text style={{ fontWeight: "bold", marginLeft: 5, marginTop: 10 }}>
          Name
        </Text>
        <View style={styles.modalInputView}>
          <TextInput
            style={styles.modalInputText}
            placeholder="Enter seed name"
            selectionColor="#ccc"
            value={seedName}
            onChangeText={(text) => setSeedName(text)}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <CustomImagePicker
              image={phase1Image}
              setImage={setPhase1Image}
              phase={"Phase 1"}
            />
            <CustomImagePicker
              image={phase2Image}
              setImage={setPhase2Image}
              phase={"Phase 2"}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              marginTop: 20,
            }}
          >
            <CustomImagePicker
              image={phase3Image}
              setImage={setPhase3Image}
              phase={"Phase 3"}
            />
            <CustomImagePicker
              image={phase4Image}
              setImage={setPhase4Image}
              phase={"Phase 4"}
            />
          </View>
        </View>

        <View style={styles.modalButtonGroup}>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: "#50AA75" }]}
          >
            <Text style={{ fontWeight: "bold", color: "#fff" }}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: "#ccc" }]}
            onPress={() => setShowModal(false)}
          >
            <Text style={{ fontWeight: "bold", color: "#474838" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Dialog>
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
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
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
    paddingLeft: 15,
    marginTop: 5,
  },
  modalInputText: {
    height: 50,
    fontWeight: "bold",
  },
  modalButtonGroup: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    paddingTop: 20,
  },
  modalButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
    height: "auto",
    borderRadius: 10,
  },
});
