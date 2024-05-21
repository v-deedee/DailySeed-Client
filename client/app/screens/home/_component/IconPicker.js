// IconModal.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const iconList = [
  '👎',
  '👊',
  '👍',
  '👏',
  '🤌',
  '💪',
  '🙏',
  '🏆',
  '👑',
  // Thêm các emoji khác vào đây
];

const IconModal = ({ visible, onIconSelect, onClose }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.iconContainer} onPress={() => onIconSelect(item)}>
      <Ionicons name={null} style={{ fontSize: 24 }}>{item}</Ionicons>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <FlatList
            data={iconList}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            numColumns={3}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  iconContainer: {
    padding: 10,
    margin: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default IconModal;