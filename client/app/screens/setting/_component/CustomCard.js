import { BottomSheet, Card, Switch } from "@rneui/themed";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import WheelPicker from "react-native-wheely";
import { MyBottomSheet } from "../../statistic/_component/BottomSheet/MyBottomSheet";

export default function CustomCard() {
  const [checked, setChecked] = useState(false);
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const addLeadingZero = (num) => (num < 10 ? `0${num}` : `${num}`);

  const minuteOption = Array.from({ length: 61 }, (_, i) => addLeadingZero(i));
  const hourOption = Array.from({ length: 24 }, (_, i) => addLeadingZero(i));

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
              <Pressable onPress={() => setOpenBottomSheet(true)}>
                <View style={styles.selectTime}>
                  <Text>{addLeadingZero(selectedHour)} : {addLeadingZero(selectedMinute)}</Text>
                </View>
              </Pressable>
            </View>
            <BottomSheet isVisible={openBottomSheet} onBackdropPress={() => { setOpenBottomSheet(false) }}>
              <View style={styles.bottomSheet}>
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
              </View>
            </BottomSheet>
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
  innerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 3,
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "transparent",
    color: "green",
  },
  selectTime: {
    backgroundColor: "#eeeeee",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10
  },
  bottomSheet: {
    borderRadius: 30,
    backgroundColor: "white",
    padding: 20,
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
    width: '100%',
  },
});
