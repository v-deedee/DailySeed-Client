import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Dialog } from "@rneui/themed";
import { useState } from "react";

export default function ConfirmSaveHabitModal({
  isOpen,
  toggle,
  duration,
  save,
  isLoading,
}) {
  return (
    <Dialog
      isVisible={isOpen}
      onBackdropPress={toggle}
      overlayStyle={{
        borderRadius: 30,
      }}
    >
      <View style={{ alignItems: "center", paddingBottom: 10 }}>
        <Dialog.Title title="Are you sure?" titleStyle={{ color: "orange" }} />
      </View>

      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            textAlign: "center",
            lineHeight: 20,
          }}
        >
          After saving, you won't be able to edit this habit until{" "}
          <Text style={{ color: "red" }}>{getNextNDays(duration)}</Text>
        </Text>
      </View>

      <View style={styles.modalButtonGroup}>
        {isLoading ? (
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
        ) : (
          <>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#50AA75" }]}
              onPress={save}
            >
              <Text style={{ fontWeight: "bold", color: "#fff" }}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#ccc" }]}
              onPress={toggle}
            >
              <Text style={{ fontWeight: "bold", color: "#474838" }}>No</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
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
});

function getNextNDays(n) {
  var currentDate = new Date(); // Get current date
  currentDate.setDate(currentDate.getDate() + n); // Add n days

  // Get day, month, and year
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1; // January is 0
  var year = currentDate.getFullYear();

  // Add leading zeros if needed
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  // Format the date
  var formattedDate = day + "/" + month + "/" + year;

  return formattedDate;
}
