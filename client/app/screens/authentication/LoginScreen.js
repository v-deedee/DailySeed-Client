import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { getUserByToken, login } from "../../services/user.service";
import { UserContext } from "../../contexts/user.context";
import { SeedContext } from "../../contexts/seed.context";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../../components/FormInput/formInput";

const formSchema = z.object({
  username: z.string().min(1, "Please fill in this field"),
  password: z.string().min(1, "Please fill in this field"),
});

const LoginScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const [loading, setLoading] = useState(false); // Thêm state cho hiệu ứng loading
  const { setUser, setRole } = useContext(UserContext);
  const { fetchSeeds } = useContext(SeedContext);

  const handleLogin = async (formData) => {
    setLoading(true); // Bắt đầu hiển thị hiệu ứng loading
    try {
      const loginData = await login(formData);
      console.log("Login data: ", loginData);
      if (loginData.ok) {
        if (loginData.data.payload.role === "admin") {
          setRole("admin");
        } else {
          setRole("user");
          const data = await getUserByToken();
          if (data) {
            // console.log("login data: ", data);
            setUser(data);
            fetchSeeds();
          } else {
            console.log(data.message);
          }
        }
      } else {
        Alert.alert(loginData.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false); // Ẩn hiệu ứng loading sau khi nhận được phản hồi từ API
    }
  };

  const handleRegisterPress = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../../assets/logo/logo-with-text.png")}
      />
      <View style={{ gap: 20, width: "100%", alignItems: "center" }}>
        <View style={styles.inputView}>
          <FormInput control={control} name="username" placeholder="Username" />
        </View>
        <View style={styles.inputView}>
          <FormInput
            control={control}
            name="password"
            placeholder="Password"
            secureTextEntry
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={handleSubmit(handleLogin)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.loginText}>LOGIN</Text>
        )}
      </TouchableOpacity>
      <View style={styles.registerField}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={handleRegisterPress}>
          <Text style={styles.registerText}>Register here</Text>
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
  },
  inputText: {
    height: 50,
    color: "#003f5c",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#50AA75",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  registerField: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    marginBottom: 20,
  },
  registerText: {
    color: "#008D6A",
    fontWeight: "bold",
  },
});

export default LoginScreen;
