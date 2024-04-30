import React, { useContext, useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { register } from "../services/user.service"
import { UserContext } from "../contexts/user.context";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false); // State để kiểm soát hiển thị biểu tượng load


  const handleRegister = async () => {
    setIsLoading(true); // Bắt đầu hiển thị biểu tượng load

    console.log("Register with username:", username, "and password:", password);
    const data = await register(username, password, email);
    if(data) {
      navigation.navigate("Login");
      alert('Successful account registration');
    } else {
      console.log(data.message);
      alert(data.message);
    }
    setIsLoading(false); // Dừng hiển thị biểu tượng load khi nhận được kết quả

  };

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/logo/logo-with-text.png")}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Confirm password"
          placeholderTextColor="#003f5c"
          // onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        {isLoading ? ( // Hiển thị biểu tượng load nếu isLoading là true
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.registerText}>REGISTER</Text>
        )}
      </TouchableOpacity>
      <View style={styles.loginField}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={handleLoginPress}>
          <Text style={styles.loginText}>Login here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFFD8",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#003f5c",
  },
  registerBtn: {
    width: "80%",
    backgroundColor: "#50AA75",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  registerText: {
    color: "white",
  },
  loginField: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  loginText: {
    color: "#008D6A",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
