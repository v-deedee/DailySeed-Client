import React from "react";
import { SafeAreaView, View } from "react-native";

export const ConditionalContainer = ({ children, container, condition }) => (
  <>{condition ? container(children) : children}</>
);

export const IsSafeAreaWrapper = ({ children, isSafeArea, ...props }) =>
  isSafeArea ? (
    <SafeAreaView {...props}>{children}</SafeAreaView>
  ) : (
    <View {...props}>{children}</View>
  );
