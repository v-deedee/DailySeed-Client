import { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";

export default function NoteScreen() {
  const [note, setNote] = useState("");
  return (
    <View style={styles.container}>
      {/* Instruction */}
      <View style={{ alignItems: "center" }}>
        <Text style={styles.instruction}>Tell us about your day</Text>
      </View>

      <View
        style={{
          width: "90%",
          padding: 20,
          backgroundColor: "#fff",
          borderRadius: 10,
        }}
      >
        <View>
          <Text style={{ fontWeight: "600", marginBottom: 10, color: "#333" }}>
            Today's note
          </Text>
          <View
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "#eee",
              fontWeight: "bold",
              borderRadius: 10,
              justifyContent: "center",
              padding: 20,
            }}
          >
            <TextInput
              style={{ height: 50, fontWeight: "bold" }}
              placeholder="Enter icon label"
              selectionColor="#ccc"
              value={note}
              onChangeText={(text) => setNote(text)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  instruction: {
    width: 200,
    marginVertical: 20,
    fontSize: 20,
    fontWeight: "600",
    color: "#474838",
    textAlign: "center",
    lineHeight: 30,
  },
});
