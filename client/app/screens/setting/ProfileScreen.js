import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "../../contexts/user.context";

import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const { user } = useContext(UserContext);
  useEffect(() => {
    setName(user.user.username);
    setProfileImage(user.profile.picture);
  }, [user]);
  const handleNameChange = (text) => {
    setName(text);
  };

  const handlePasswordChange = (text, field) => {
    if (field === "old") {
      setOldPassword(text);
    } else {
      setNewPassword(text);
    }
  };

  const handleUpdateName = () => {
    onUpdateUser({ ...user, name });
  };

  const handleUpdatePassword = () => {
    // Perform password validation
    if (oldPassword === user.profile.password) {
      onUpdateProfile({ ...user.profile, password: newPassword });
    } else {
      alert("Invalid old password");
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
      onUpdateProfile({ ...user.profile, picture: result.uri });
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    onUpdateProfile({ ...user.profile, picture: null });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 20,
          backgroundColor: "#fff",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
          <FontAwesome6 name="arrow-left-long" color={"#333"} size={20} />
        </TouchableOpacity>

        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#474838" }}>
          My info
        </Text>

        <TouchableOpacity disabled>
          <FontAwesome6 name="arrow-left-long" color={"#fff"} size={20} />
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>Profile</Text>
      <View style={styles.imageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.image} />
        ) : (
          <Text style={styles.placeholder}>No image</Text>
        )}
        <View style={styles.imageButtons}>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Add Image</Text>
          </TouchableOpacity>
          {profileImage && (
            <TouchableOpacity style={styles.button} onPress={removeImage}>
              <Text style={styles.buttonText}>Remove Image</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={handleNameChange}
        placeholder="Name"
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateName}>
        <Text style={styles.buttonText}>Update Name</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={oldPassword}
        onChangeText={(text) => handlePasswordChange(text, "old")}
        placeholder="Old Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={(text) => handlePasswordChange(text, "new")}
        placeholder="New Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  placeholder: {
    fontSize: 16,
    color: "gray",
  },
  imageButtons: {
    flexDirection: "row",
    marginTop: 10,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
