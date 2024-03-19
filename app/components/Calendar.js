import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CustomCalendar() {
  return (
    <View style={styles.calendar}>
      <Calendar />
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    width: "100%",
  },
});
