import React from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { Controller } from "react-hook-form";

const FormInput = ({ control, name, errorStyle, ...otherProps }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <TextInput
            style={styles.inputText}
            value={value}
            placeholderTextColor="#aaa"
            selectionColor="#aaa"
            onChangeText={onChange}
            onBlur={onBlur}
            {...otherProps}
          />
          {error && (
            <Text
              style={[
                {
                  color: "red",
                  zIndex: 1,
                  fontSize: 13,
                  paddingLeft: 20,
                  paddingTop: 5,
                },
                errorStyle,
              ]}
            >
              {error.message}
            </Text>
          )}
        </>
      )}
    />
  );
};
export default FormInput;

const styles = StyleSheet.create({
  inputText: {
    height: 50,
    color: "#003f5c",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 25,
    // marginTop: 10,
    paddingLeft: 20,
    backgroundColor: "white",
  },
});
