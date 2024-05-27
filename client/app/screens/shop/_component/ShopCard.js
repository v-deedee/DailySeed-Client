import React, { useContext, useState } from 'react';
import { Button, Card } from '@rneui/themed';
import { View, Text, StyleSheet, Image, ImageBackground, Alert, ActivityIndicator } from "react-native";
import { CLOUDINARY_BASE_URL } from '../../../utils/constants/cloudinary.constants';
import { Icon } from '@rneui/themed';
import Modal from 'react-native-modal';
import { buyTree } from '../../../services/tree.service';
import { UserContext } from '../../../contexts/user.context';

export default function ShopCard({ id, name, price, initialOwned, assets, onUpdateOwned }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [owned, setOwned] = useState(initialOwned);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const { user, setUser } = useContext(UserContext);

  const handleBuyTree = async () => {
    console.log(user);
    setIsLoading(true); // Start loading
    const data = await buyTree(id);
    console.log(data);
    setIsLoading(false); // End loading
    if (data.ok) {
      Alert.alert("Mua cây thành công");
      const newUser = {...user, profile: {...user.profile, money: user.profile.money - price}}
      setUser(newUser)
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
      <Card.Image source={require("../../../../assets/theme/background.png")} style={styles.image}>
        <View style={styles.treeImgContainer}>
          {assets.slice().reverse().map((asset, index) => (
            <View key={index} style={{ justifyContent: 'flex-end' }}>
              <Image source={{ uri: `${CLOUDINARY_BASE_URL}${asset}` }} style={{ width: 60 + index * 10, height: 60 + index * 10 }} />
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
            <Icon name='check' type='material' color='#41B06E' size={30} />
          ) : (
            <View style={styles.coinContainer}>
              <ImageBackground source={require('../../../../assets/shop/coin.png')} style={{ width: 30, height: 30 }} />
              <Text style={{ fontWeight: '700' }}>{price}</Text>
            </View>
          )}
        </Button>
      </View>
      <ConfirmModal
        visible={showConfirmModal}
        onConfirm={handleBuyTree}
        onCancel={hideConfirmModal}
        title="Xác nhận mua cây"
        message={`Bạn có chắc chắn muốn mua cây này với giá ${price}?`}
      />
    </Card>
  );
}

const ConfirmModal = ({ visible, onConfirm, onCancel, title, message }) => (
  <Modal
    isVisible={visible}
    onBackdropPress={onCancel}
    onBackButtonPress={onCancel}
  >
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>{title}</Text>
      <Text style={styles.modalMessage}>{message}</Text>
      <View style={styles.modalButtonContainer}>
        <Button
          title="Hủy"
          onPress={onCancel}
          buttonStyle={styles.modalButton}
          titleStyle={styles.modalButtonText}
        />
        <Button
          title="Xác nhận"
          onPress={onConfirm}
          buttonStyle={[styles.modalButton, styles.confirmButton]}
          titleStyle={styles.modalButtonText}
        />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  cardContainer: {
    padding: 0,
    margin: 0,
    marginTop: 20,
    backgroundColor: 'transparent',
    borderWidth: 0,
    shadowColor: 'rgba(0,0,0, 0.0)',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0
  },
  image: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  treeImgContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    alignItems: 'center'
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
    shadowColor: 'rgba(0,0,0, 0.0)',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  confirmButton: {
    backgroundColor: '#41B06E',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
