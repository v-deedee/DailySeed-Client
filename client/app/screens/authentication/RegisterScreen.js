import React, { useContext, useState } from "react";
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { register } from "../../services/user.service";
import { UserContext } from "../../contexts/user.context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../../components/FormInput/formInput";

const formSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const RegisterScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirm: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { confirm, ...registerData } = data;
    const response = await register(registerData);
    if (response.ok) {
      setUser(data);
      navigation.navigate("Login");
      Alert.alert("Success", "Account registered successfully");
    } else {
      Alert.alert("Error", response.message);
    }
    setIsLoading(false);
  };

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../../assets/logo/logo-with-text.png")}
      />
      <View style={{ gap: 20, width: "100%", alignItems: "center" }}>
        <View style={styles.inputView}>
          <FormInput control={control} name="email" placeholder="Email" />
        </View>
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
        <View style={styles.inputView}>
          <FormInput
            control={control}
            name="confirm"
            placeholder="Confirm Password"
            secureTextEntry
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.registerBtn}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
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
