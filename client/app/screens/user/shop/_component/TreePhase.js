import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

export default function TreePhase({ phase }) {
  const [croppedImageUri, setCroppedImageUri] = useState(null);

  let left = 0;
  let width = 0;
  switch (phase) {
    case 1:
      left = 0;
      width = 290;
      break;
    case 2:
      left = 290;
      width = 265;
      break;
    case 3:
      left = 290 + 265;
      width = 350;
      break;
    case 4:
      left = 290 + 265 + 350;
      width = 380;
      break;
  }

  const cropParams = {
    actions: [
      { crop: { originX: left, originY: 0, width: width, height: 375 } },
    ],
    saveOptions: { format: SaveFormat.PNG },
  };

  const sourceUri = "../../assets/garden/Tree2.png";

  useEffect(() => {
    const handleManipulate = async () => {
      const manipResult = await manipulateAsync(
        sourceUri,
        cropParams.actions,
        cropParams.saveOptions,
      );
      setCroppedImageUri(manipResult.uri);
    };
    handleManipulate();
  }, [phase]);

  return (
    <View style={styles.container}>
      {croppedImageUri && (
        <Image source={{ uri: croppedImageUri }} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginVertical: 20,
  },
});
