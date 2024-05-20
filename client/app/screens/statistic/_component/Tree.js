import React from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Avatar, Badge, Icon } from "@rneui/themed";
import { CLOUDINARY_BASE_URL } from "../../../utils/constants/cloudinary.constants";

const numRows = 6; // Number of rows in the garden
const numColumns = 6; // Number of columns in the garden
const cellSize = 50; // Fixed size for each cell

export const CellComponent = ({ type, x, y, openBorder, imgURL }) => {
  const assets = {
    1: require("../../../../assets/garden/Tree3/tree3-phase1.png"),
    2: require("../../../../assets/garden/Tree3/tree3-phase2.png"),
    3: require("../../../../assets/garden/Tree3/tree3-phase3.png"),
    4: require("../../../../assets/garden/Tree3/tree3-phase4.png"),
  };

  const positionStyle = {
    position: "relative",
    left:
      -(y * cellSize) / 2 -
      (x * cellSize) / 2 +
      Math.floor(numColumns / 2) * cellSize,
    top:
      -(y * cellSize) / 2 +
      (x * cellSize) / 2 -
      (x + y) * 0.22 * cellSize,
  };

  const cellStyle = {
    1: { width: "30%", height: "40%", top: '0%', left: '35%', opacity: openBorder ? 0.6 : 1 },
    2: { width: "60%", height: "70%", top: '-35%', left: '20%', opacity: openBorder ? 0.4 : 1 },
    3: { width: "80%", height: "80%", top: '-40%', left: '10%', opacity: openBorder ? 0.3 : 1 },
    4: { width: "100%", height: "100%", top: '-60%', left: '0%', opacity: openBorder ? 0.2 : 1 },
  }[type];

  return (
    <View>
      <ImageBackground
        source={require("../../../../assets/garden/block.png")}
        style={[styles.img, positionStyle]}
      >
        <Image source={{ uri: `${CLOUDINARY_BASE_URL}${imgURL}` }} style={cellStyle} />
      </ImageBackground>
    </View>
  );
};

export const HitBox = ({ x, y, openBorder, handleTool }) => {
  const positionStyle = {
    position: "relative",
    left:
      -(y * cellSize) / 2 -
      (x * cellSize) / 2 +
      Math.floor(numColumns / 2) * cellSize,
    top:
      -(y * cellSize) / 2 +
      (x * cellSize) / 2 -
      (x + y) * 0.22 * cellSize,
  };

  const handlePress = () => {
    console.log(`Cell clicked at (${x}, ${y})`);
    handleTool(x, y);
  };

  return (
    <View>
      <Pressable
        onPress={handlePress}
        style={[
          styles.hitbox,
          positionStyle,
          openBorder && { borderWidth: 2, borderColor: "#fff" },
        ]}
      />
    </View>
  );
};

export const TreeBox = ({ toggleBottomSheet, setDisable }) => (
  <View>
    <TouchableOpacity activeOpacity={0.5} onPress={toggleBottomSheet} disabled={setDisable}>
      <Icon
        name="seed"
        type="material-community"
        color="#00B8A9"
        size={36}
        containerStyle={styles.image}
      />
    </TouchableOpacity>
  </View>
);

export const Shovel = ({ handleShovelPress, setDisable }) => (
  <View>
    <TouchableOpacity activeOpacity={0.5} onPress={handleShovelPress} disabled={setDisable}>
      <Icon
        name="shovel"
        type="material-community"
        color="#00B8A9"
        size={36}
        containerStyle={styles.image}
      />
    </TouchableOpacity>
  </View>
);

export const ViewTree = ({ handleLoupePress, setDisable }) => (
  <View>
    <TouchableOpacity activeOpacity={0.5} onPress={handleLoupePress} disabled={setDisable}>
      <Icon
        name="preview"
        type="material"
        color="#00B8A9"
        size={36}
        containerStyle={styles.image}
      />
    </TouchableOpacity>
  </View>
);

export const CrossHair = ({ resetZoom }) => (
  <View>
    <TouchableOpacity activeOpacity={0.5} onPress={resetZoom}>
      <Icon
        name="crosshairs-gps"
        type="material-community"
        color="#62CDFF"
        size={36}
        containerStyle={styles.image}
      />
    </TouchableOpacity>
  </View>
);

export const ShareSocial = ({ handleShare }) => (
  <View>
    <TouchableOpacity activeOpacity={0.5} onPress={handleShare}>
      <Icon
        name="share-variant"
        type="material-community"
        color="#62CDFF"
        size={36}
        containerStyle={styles.image}
      />
    </TouchableOpacity>
  </View>
);

export const ViewGarden = ({ handleCalendarPress }) => (
  <View>
    <TouchableOpacity activeOpacity={0.5} onPress={handleCalendarPress}>
      <Icon
        name="calendar-month"
        type="material-community"
        color="#62CDFF"
        size={36}
        containerStyle={styles.image}
      />
    </TouchableOpacity>
  </View>
);

export const TreeAvatar = ({ treeStatus, value, handleAvatarPress }) => {
  const assets = {
    phase1: require("../../../../assets/garden/Tree3/tree3-phase1.png"),
    phase2: require("../../../../assets/garden/Tree3/tree3-phase2.png"),
    phase3: require("../../../../assets/garden/Tree3/tree3-phase3.png"),
    phase4: require("../../../../assets/garden/Tree3/tree3-phase4.png"),
  };

  return (
    <View>
      <Avatar
        size={60}
        rounded
        source={assets[treeStatus]}
        containerStyle={{ backgroundColor: "#fcf0be" }}
        onPress={handleAvatarPress}
      />
      <Badge status="success" value={value} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 36,
    height: 36,
  },
  img: {
    width: cellSize,
    height: cellSize,
  },
  hitbox: {
    backgroundColor: "transparent",
    height: cellSize * 0.6,
    width: cellSize * 0.6,
    margin: cellSize * 0.2,
    transform: [
      { rotateX: "55deg" },
      { rotateY: "0deg" },
      { rotateZ: "45deg" },
    ],
  },
});
