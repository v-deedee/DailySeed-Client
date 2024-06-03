import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { UserContext } from "../../contexts/user.context";

export default function ChangePasswordScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { user } = useContext(UserContext);

  const handleUpdatePassword = () => {
    // Perform password validation
    if (oldPassword === user.profile.password) {
      onUpdateProfile({ ...user.profile, password: newPassword });
    } else {
      alert("Invalid old password");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            margin: 5,
            marginBottom: 10,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Change your password here.
        </Text>
        <Text style={{ margin: 5, fontWeight: "600", color: "#666" }}>
          Old password
        </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Current password"
            selectionColor="#aaa"
            placeholderTextColor="#ccc"
            value={oldPassword}
            onChange={(text) => setOldPassword(text)}
          />
        </View>
        <Text
          style={{ margin: 5, marginTop: 0, fontWeight: "600", color: "#666" }}
        >
          New password
        </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="New password"
            selectionColor="#aaa"
            placeholderTextColor="#ccc"
            value={newPassword}
            onChange={(text) => setNewPassword(text)}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.confirmBtn}
        disabled={isLoading}
        onPress={handleUpdatePassword}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Change
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "center",
  },
  inputView: {
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#bbb",
    borderRadius: 10,
    height: 60,
    marginBottom: 20,
    justifyContent: "center",
    padding: 15,
  },
  inputText: {
    height: 50,
    color: "#333",
    fontSize: 16,
  },
  confirmBtn: {
    backgroundColor: "#50AA75",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  registerField: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  registerText: {
    color: "#008D6A",
    fontWeight: "bold",
  },
});
