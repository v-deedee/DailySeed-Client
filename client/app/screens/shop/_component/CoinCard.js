import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import PaymentModal from './PaymentModal';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

export default function CoinCard({ value, vnd }) {
  const coinImage = value > 200 ? require('../../../../assets/shop/money-bag.png') : require('../../../../assets/shop/coin.png');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <View style={styles.cardContainer}>
        <View style={styles.infoContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={coinImage} style={{ width: 40, height: 40 }} />
            <Text style={styles.description}>{value}</Text>
          </View>
          <TouchableOpacity onPress={toggleModal} style={styles.button}>
            <Text style={styles.buttonText}>Pay {formatCurrency(vnd)}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <PaymentModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        amount={vnd}
        coin={value}
      />
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 0,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#50AA75',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
