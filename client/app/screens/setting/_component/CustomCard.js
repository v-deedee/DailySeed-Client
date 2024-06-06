import { BottomSheet, Card, Dialog, Switch } from "@rneui/themed";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { StyleSheet, Text, View, Modal, Pressable, ScrollView, Alert } from "react-native";
import { useState, useEffect, useRef } from "react";
import WheelPicker from "react-native-wheely";
import {
  schedulePushNotification,
  cancelAllScheduledNotificationsAsync,
  handleNotificationResponse,
  setupNotificationHandlers,
  registerForPushNotificationsAsync
} from '../../../notification/notificationService';

import * as Notifications from 'expo-notifications';

export default function CustomCard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [checked, setChecked] = useState(false);

  const addLeadingZero = (num) => (num < 10 ? `0${num}` : `${num}`);

  const minuteOption = Array.from({ length: 61 }, (_, i) => addLeadingZero(i));
  const hourOption = Array.from({ length: 24 }, (_, i) => addLeadingZero(i));

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  useEffect(() => {
    const responseListener = setupNotificationHandlers(handleNotificationResponse);
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const scheduleNotification = () => {
    const selectedTime = new Date();
    selectedTime.setHours(selectedHour);
    selectedTime.setMinutes(selectedMinute);
    selectedTime.setSeconds(0);
    selectedTime.setMilliseconds(0);

    const title = 'Nhắc nhở hàng ngày';
    const body = 'Đừng quên thực hiện thói quen tốt của bạn!';
    const data = { redirect: 'root' };

    schedulePushNotification(title, body, data, selectedTime);
    Alert.alert('Thông báo', 'Lập lịch thông báo thành công!');
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!checked) {
      cancelAllScheduledNotificationsAsync();
    }
  }, [checked]);

  return (
    <View>
      <Text style={styles.title}>Customization</Text>
      <Card containerStyle={styles.cardContainer}>
        <View style={styles.row}>
          <View style={styles.row}>
            <View>
              <MaterialIcons
                name="notifications-on"
                size={25}
                color="#b2b2b2"
              />
            </View>

            <View style={{ marginLeft: 10 }}>
              <Text>Daily reminder ON/OFF</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Switch color="#50AA75" value={checked} onValueChange={(value) => setChecked(value)} />
          </View>
        </View>
        {checked && (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Pressable onPress={() => setShowModal(true)}>
                <View style={styles.selectTime}>
                  <Text>{addLeadingZero(selectedHour)} : {addLeadingZero(selectedMinute)}</Text>
                </View>
              </Pressable>
            </View>

            <Dialog
              isVisible={showModal}
              onBackdropPress={() => { setShowModal(false) }}
              overlayStyle={{
                borderRadius: 30,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 5,
                }}
              >
                <View>
                  <View style={styles.modalContent}>
                    <ScrollView horizontal={false} contentContainerStyle={styles.centeredContent}>
                      <ScrollView horizontal contentContainerStyle={styles.pickerContainer}>
                        <View>
                          <WheelPicker
                            containerStyle={styles.wheelPicker}
                            selectedIndex={selectedHour}
                            options={hourOption}
                            onChange={setSelectedHour}
                          />
                        </View>
                        <View>
                          <WheelPicker
                            containerStyle={styles.wheelPicker}
                            selectedIndex={selectedMinute}
                            options={minuteOption}
                            onChange={setSelectedMinute}
                          />
                        </View>
                      </ScrollView>
                    </ScrollView>
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
                    </View>
                    <View style={styles.modalButtonGroup}>
                      <Pressable style={[styles.modalButton, { backgroundColor: "#50AA75" }]}>
                        <Text style={{ fontWeight: "bold", color: "#fff" }} onPress={scheduleNotification}>Confirm</Text>
                      </Pressable>
                      <Pressable style={[styles.modalButton, { backgroundColor: "#ccc" }]}>
                        <Text style={{ fontWeight: "bold", color: "#474838" }} onPress={handleCancel}>Cancel</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </Dialog>
          </>
        )}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#474838",
    marginTop: 10,
    marginBottom: 10,
  },
  cardContainer: {
    padding: 15,
    paddingVertical: 10,
    margin: 0,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0,
    shadowColor: "rgba(0,0,0, 0.0)",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 3,
  },
  selectTime: {
    backgroundColor: "#eeeeee",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  centeredContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelPicker: {
    width: 100,
  },
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
  button: {
    backgroundColor: '#50AA75',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});