import React, { memo } from "react";
import { FlatList } from "react-native";

import Emoji from "./Emoji";
import { emojisByCategory } from "../../data/emojis2";

import { KeyboardContext } from "../../contexts/KeyboardContext";

const EmojiCategory = ({ category }) => {
  const { onEmojiSelected } = React.useContext(KeyboardContext);

  const handleEmojiPress = (emoji) => {
    onEmojiSelected(emoji);
  };

  return (
    <FlatList
      data={emojisByCategory[category]}
      renderItem={({ item }) => (
        <Emoji onPress={handleEmojiPress} item={item} />
      )}
      keyExtractor={(item) => item}
      numColumns={6}
      columnWrapperStyle={{
        justifyContent: "space-evenly",
      }}
    />
  );
};

export default memo(EmojiCategory);
