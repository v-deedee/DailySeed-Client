import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Alert, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { CardForm, useConfirmPayment } from '@stripe/stripe-react-native';
import { createPaymentIntent } from '../../../services/user.service';
import { color } from '@rneui/base';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

export default function PaymentModal({ isVisible, onClose, amount }) {
  const { confirmPayment, loading } = useConfirmPayment();
  const [email, setEmail] = useState('');
  const [cardDetails, setCardDetails] = useState({ complete: false });

  const handlePayment = async () => {
    if (!cardDetails.complete || !email) {
      Alert.alert('Please enter complete card details and email');
      return;
    }

    const billingDetails = { email };

    try {
      const clientSecret = await createPaymentIntent(amount);
      const { error } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails,
        },
      });

      if (error) {
        Alert.alert('Payment failed', error.message);
      } else {
        Alert.alert('Payment successful', 'Your payment was successful!');
        onClose();
      }
    } catch (error) {
      Alert.alert('Payment failed', error.message);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Enter your payment details</Text>
            <TextInput
              placeholder="Enter your email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setEmail}
              style={styles.input}
            />
            <CardForm
              onFormComplete={(details) => {
                setCardDetails(details);
              }}
              style={styles.cardForm}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handlePayment}
                style={[styles.button, loading && styles.buttonDisabled]}
                disabled={loading}
              >
                <Text style={styles.buttonText}>Confirm Pay {formatCurrency(amount)}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#efefef',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  cardForm: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#50AA75',
    padding: 15,
    marginTop: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'red',
  },

});
