import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { UserContext } from "../../contexts/user.context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../../components/FormInput/formInput";

const formSchema = z
  .object({
    oldPassword: z.string().min(1, "Please fill in this field"),
    newPassword: z
      .string()
      .min(1, "Please fill in this field")
      .min(8, "Password must be at least 8 characters"),
    confirm: z.string().min(1, "Please fill in this field"),
  })
  .refine((data) => data.newPassword === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

export default function ChangePasswordScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirm: "",
    },
    resolver: zodResolver(formSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(UserContext);

  const handleUpdatePassword = async (data) => {
    setIsLoading(true);
    const { confirm, ...registerData } = data;
    console.log(registerData); // registerData in form: {"oldPassword": "abcdefghi", "password": "12345678"}

    // Perform password validation
    // if (oldPassword === user.profile.password) {
    //   onUpdateProfile({ ...user.profile, password: newPassword });
    // } else {
    //   alert("Invalid old password");
    // }

    setIsLoading(false);
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
          <FormInput
            control={control}
            name="oldPassword"
            placeholder="Current password"
            secureTextEntry
            style={styles.inputText}
            errorStyle={{
              color: "red",
              zIndex: 1,
              fontSize: 14,
              paddingLeft: 10,
            }}
          />
        </View>
        <Text
          style={{ margin: 5, marginTop: 0, fontWeight: "600", color: "#666" }}
        >
          New password
        </Text>
        <View style={styles.inputView}>
          <FormInput
            control={control}
            name="newPassword"
            placeholder="New Password"
            secureTextEntry
            style={styles.inputText}
            errorStyle={{
              color: "red",
              zIndex: 1,
              fontSize: 14,
              paddingLeft: 10,
            }}
          />
        </View>
        <Text
          style={{ margin: 5, marginTop: 0, fontWeight: "600", color: "#666" }}
        >
          Confirm password
        </Text>
        <View style={styles.inputView}>
          <FormInput
            control={control}
            name="confirm"
            placeholder="Confirm Password"
            secureTextEntry
            style={styles.inputText}
            errorStyle={{
              color: "red",
              zIndex: 1,
              fontSize: 14,
              paddingLeft: 10,
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.confirmBtn}
        disabled={isLoading}
        onPress={handleSubmit(handleUpdatePassword)}
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
    marginBottom: 20,
  },
  inputText: {
    padding: 15,
    marginBottom: 5,
    height: 60,
    color: "#333",
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: "#bbb",
    borderRadius: 10,
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
