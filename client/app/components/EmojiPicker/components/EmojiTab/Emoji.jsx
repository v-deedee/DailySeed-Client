import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Emoji = React.memo(({ onPress, item }) => {
  return (
    <TouchableOpacity
      style={styles.emojiContainer}
      onPress={() => {
        onPress(item);
      }}
    >
      <Text style={styles.emoji}>{item}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  emojiContainer: {
    marginHorizontal: 9,
  },
  emoji: {
    margin: 5,
    fontSize: 30,
  },
});

export default Emoji;
