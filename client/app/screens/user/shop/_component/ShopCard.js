import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button, Card, Icon } from "@rneui/themed";
import { Dialog } from "@rneui/base";
import Modal from "react-native-modal";

import { CLOUDINARY_BASE_URL } from "../../../../utils/constants/cloudinary.constants";
import { buyTree } from "../../../../services/tree.service";
import { UserContext } from "../../../../contexts/user.context";

export default function ShopCard({
  id,
  name,
  price,
  initialOwned,
  assets,
  onUpdateOwned,
  edit,
}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [owned, setOwned] = useState(initialOwned);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const { user, setUser } = useContext(UserContext);

  const handleBuyTree = async () => {
    setIsLoading(true); // Start loading
    const data = await buyTree(id);
    setIsLoading(false); // End loading
    if (data.ok) {
      Alert.alert("Your purchase was successful.");
      const newUser = {
        ...user,
        profile: { ...user.profile, money: user.profile.money - price },
      };
      setUser(newUser);
      onUpdateOwned(id, true);
      setOwned(true); // Update the state using setOwned
    } else {
      Alert.alert(data.message);
    }
    setShowConfirmModal(false);
  };

  const showConfirmBuyModal = () => {
    setShowConfirmModal(true);
  };

  const hideConfirmModal = () => {
    setShowConfirmModal(false);
  };

  return (
    <Card containerStyle={styles.cardContainer}>
      <Card.Image
        source={require("../../../../../assets/theme/background.png")}
        style={styles.image}
      >
        <View style={styles.treeImgContainer}>
          {assets
            .slice()
            .reverse()
            .map((asset, index) => (
              <View key={index} style={{ justifyContent: "flex-end" }}>
                <Image
                  source={{ uri: `${CLOUDINARY_BASE_URL}${asset}` }}
                  style={{ width: 60 + index * 10, height: 60 + index * 10 }}
                />
              </View>
            ))}
        </View>
      </Card.Image>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.title}>{name}</Text>
        </View>
        <Button
          color="#ffecb3"
          buttonStyle={styles.button}
          onPress={() => !owned && showConfirmBuyModal()}
          disabled={owned || isLoading} // Disable button while loading
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#0000ff" /> // Show loading indicator
          ) : owned ? (
            <Icon name="check" type="material" color="#41B06E" size={30} />
          ) : (
            <View style={styles.coinContainer}>
              <ImageBackground
                source={require("../../../../../assets/shop/coin.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={{ fontWeight: "700" }}>{price}</Text>
            </View>
          )}
        </Button>
      </View>

      {!edit && (
        <ConfirmModal
          visible={showConfirmModal}
          onConfirm={handleBuyTree}
          onCancel={hideConfirmModal}
          title="Confirm payment"
          message={`Do you want to buy this seed with the price ${price}?`}
          isLoading={isLoading}
        />
      )}

      {edit && (
        <Dialog
          isVisible={showConfirmModal}
          onBackdropPress={() => setShowConfirmModal(false)}
          overlayStyle={{
            borderRadius: 30,
            backgroundColor: "white",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", marginBottom: 5, fontSize: 18 }}>
              Change Seed
            </Text>
          </View>
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
            Change seed name
          </Text>
          <View style={styles.modalInputView}>
            <TextInput
              style={styles.modalInputText}
              placeholder="Change seed name"
              selectionColor="#ccc"
              value={name}
            />
          </View>
          <Text style={{ fontWeight: "bold", marginBottom: 5, marginTop: 10 }}>
            Change seed price
          </Text>
          <View style={styles.modalInputView}>
            <TextInput
              style={styles.modalInputText}
              placeholder="Change seed price"
              selectionColor="#ccc"
              value={price}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 5,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={[styles.newModalButton, { backgroundColor: "#50AA75" }]}
            >
              <Text style={{ fontWeight: "bold", color: "#fff" }}>Done</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.newModalButton, { backgroundColor: "#FF0000" }]}
            >
              <Text style={{ fontWeight: "bold", color: "#fff" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Dialog>
      )}
    </Card>
  );
}

const ConfirmModal = ({
  visible,
  onConfirm,
  onCancel,
  title,
  message,
  isLoading,
}) => (
  <Modal
    isVisible={visible}
    onBackdropPress={onCancel}
    onBackButtonPress={onCancel}
  >
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>{title}</Text>
      <Text style={styles.modalMessage}>{message}</Text>

      {isLoading ? (
        <View style={[styles.modalButtonContainer, { width: "90%" }]}>
          <View
            style={{
              alignItems: "center",
              flex: 1,
              paddingVertical: 15,
              height: "auto",
              borderRadius: 10,
              backgroundColor: "#ccc",
            }}
          >
            <ActivityIndicator size="small" color="#ffffff" />
          </View>
        </View>
      ) : (
        <View style={styles.modalButtonContainer}>
          <Button
            title="Yes"
            onPress={onConfirm}
            buttonStyle={[styles.modalButton, styles.confirmButton]}
            titleStyle={styles.modalButtonText}
          />
          <Button
            title="No"
            onPress={onCancel}
            buttonStyle={[styles.modalButton, { backgroundColor: "#ccc" }]}
            titleStyle={[styles.modalButtonText, { color: "#333" }]}
          />
        </View>
      )}
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  cardContainer: {
    padding: 0,
    margin: 0,
    marginTop: 20,
    backgroundColor: "transparent",
    borderWidth: 0,
    shadowColor: "rgba(0,0,0, 0.0)",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  image: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  treeImgContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#474838",
  },
  button: {
    borderRadius: 100,
    borderWidth: 2,
    borderWidth: 0,
    shadowColor: "rgba(0,0,0, 0.0)",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  coinContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalMessage: {
    width: "80%",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 150,
  },
  confirmButton: {
    backgroundColor: "#41B06E",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "600",
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
    marginTop: 10,
  },
  modalInputText: {
    height: 50,
    fontWeight: "bold",
  },
  newModalButton: {
    alignItems: "center",
    paddingVertical: 10,
    height: "auto",
    borderRadius: 10,
    marginTop: 20,
    padding: 20,
    width: 125,
  },
});
