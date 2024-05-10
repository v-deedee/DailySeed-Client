import * as React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { KeyboardContext } from "../contexts/KeyboardContext";
import { ConditionalContainer } from "./ConditionalContainer";

import EmojiTab from "./EmojiTab/EmojiTab";

export const EmojiStaticKeyboard = React.memo(
  () => {
    const {
      disableSafeArea,
      theme,
      styles: themeStyles,
      setWidth,
    } = React.useContext(KeyboardContext);

    return (
      <View
        style={[
          styles.container,
          styles.containerShadow,
          themeStyles.container,
          { backgroundColor: theme.container },
        ]}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      >
        <ConditionalContainer
          condition={!disableSafeArea}
          container={(children) => (
            <SafeAreaView style={[styles.flex]}>{children}</SafeAreaView>
          )}
        >
          <EmojiTab />
        </ConditionalContainer>
      </View>
    );
  },
  () => true,
);

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    borderRadius: 16,
  },
  searchContainer: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  containerReverse: { flexDirection: "column-reverse" },
  containerShadow: {
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    elevation: 10,
  },
});
