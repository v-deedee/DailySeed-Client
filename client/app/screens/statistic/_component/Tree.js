import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Avatar, Badge } from "@rneui/themed";

const numRows = 6; // Number of rows in the garden
const numColumns = 6; // Number of columns in the garden
const cellSize = 100; // Fixed size for each cell

const CellComponent = ({ type, x, y }) => {
  const assets = {
    // 0: require("../../../../assets/garden/block.png"),
    1: require("../../../../assets/garden/tree3-phase1.png"),
    2: require("../../../../assets/garden/tree3-phase2.png"),
    3: require("../../../../assets/garden/tree3-phase3.png"),
    4: require("../../../../assets/garden/tree3-phase4.png"),
  };

  // Calculate position based on cell position
  const positionStyle = {
    position: "relative",
    left:
      -(y * cellSize) / 2 -
      (x * cellSize) / 2 +
      Math.floor(numColumns / 2) * cellSize,
    top: -(y * cellSize) / 2 + (x * cellSize) / 2 - (x + y) * 0.22 * cellSize,
  };

  const cellStyle = () => {
    switch (type) {
      case 1:
        return { width: "50%", height: "40%", top: '0', left: '25%' };
      case 2:
        return { width: "60%", height: "70%", top: '-45%', left: '20%' };
      case 3:
        return { width: "70%", height: "90%", top: '-50%', left: '15%' };
      case 4:
        return { width: "80%", height: "110%", top: '-70%', left: '10%' };
      default:
        return { width: "100%", height: "100%" };
    }
  };

  const handlePress = () => {
    // Handle press event here
    console.log(`Cell clicked at (${x}, ${y})`);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.cell, positionStyle]}
    >
      <ImageBackground
        source={require("../../../../assets/garden/block.png")}
        style={styles.img}
      >
        <Image
          source={assets[type]}
          style={[
            { zIndex: 100 },
            cellStyle(),
          ]}
        />
      </ImageBackground>
    </TouchableOpacity>
  );
};

const Grass = ({ openBorder }) => {
  return (
    <ImageBackground
      source={require("../../../../assets/garden/grass.png")}
      style={[
        styles.image,
        openBorder && { borderWidth: 1, borderColor: "#fff" },
      ]}
    />
  );
};

const TreePhase1 = ({ openBorder }) => {
  return (
    <ImageBackground
      source={require("../../../../assets/garden/grass.png")}
      style={[
        styles.image,
        openBorder && { borderWidth: 1, borderColor: "#fff" },
      ]}
    >
      <View style={styles.treeContainer}>
        <Image
          source={require("../../../../assets/garden/tree3-phase1.png")}
          style={styles.tree}
        />
      </View>
    </ImageBackground>
  );
};

const TreePhase2 = ({ openBorder }) => {
  return (
    <ImageBackground
      source={require("../../../../assets/garden/grass.png")}
      style={[
        styles.image,
        openBorder && { borderWidth: 1, borderColor: "#fff" },
      ]}
    >
      <View style={styles.treeContainer}>
        <Image
          source={require("../../../../assets/garden/tree3-phase2.png")}
          style={styles.tree}
        />
      </View>
    </ImageBackground>
  );
};

const TreePhase3 = ({ openBorder }) => {
  return (
    <ImageBackground
      source={require("../../../../assets/garden/grass.png")}
      style={[
        styles.image,
        openBorder && { borderWidth: 1, borderColor: "#fff" },
      ]}
    >
      <View style={styles.treeContainer}>
        <Image
          source={require("../../../../assets/garden/tree3-phase3.png")}
          style={styles.tree}
        />
      </View>
    </ImageBackground>
  );
};

const TreePhase4 = ({ openBorder }) => {
  return (
    <ImageBackground
      source={require("../../../../assets/garden/grass.png")}
      style={[
        styles.image,
        openBorder && { borderWidth: 1, borderColor: "#fff" },
      ]}
    >
      <View style={styles.treeContainer}>
        <Image
          source={require("../../../../assets/garden/tree3-phase4.png")}
          style={styles.tree}
        />
      </View>
    </ImageBackground>
  );
};

const NormalTree = ({ openBorder }) => {
  return (
    <ImageBackground
      source={require("../../../../assets/garden/grass.png")}
      style={[
        styles.image,
        openBorder && { borderWidth: 1, borderColor: "#fff" },
      ]}
    >
      <View style={styles.treeContainer}>
        <Image
          source={require("../../../../assets/garden/tree.png")}
          style={styles.tree}
        />
      </View>
    </ImageBackground>
  );
};

const LeftLand = () => {
  return (
    <ImageBackground
      source={require("../../../../assets/garden/left.png")}
      style={styles.image}
    />
  );
};

const RightLand = () => {
  return (
    <ImageBackground
      source={require("../../../../assets/garden/right.png")}
      style={styles.image}
    />
  );
};

const MiddleLand = () => {
  return (
    <ImageBackground
      source={require("../../../../assets/garden/middle.png")}
      style={styles.image}
    />
  );
};

const LeftCornerLand = () => {
  return (
    <ImageBackground
      source={require(".../../../../assets/garden/left-corner.png")}
      style={styles.image}
    />
  );
};

const RightCornerLand = () => {
  return (
    <ImageBackground
      source={require("../../../../assets/garden/right-corner.png")}
      style={styles.image}
    />
  );
};

const TreeBox = ({ toggleBottomSheet }) => {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.5} onPress={toggleBottomSheet}>
        <Image
          source={require("../../../../assets/garden/box.png")}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const Shovel = ({ handleShovelPress }) => {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.5} onPress={handleShovelPress}>
        <ImageBackground
          source={require("../../../../assets/garden/shovel.png")}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const Loupe = ({ handleLoupePress }) => {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.5} onPress={handleLoupePress}>
        {/* <ImageBackground
          source={require("../../../../assets/garden/loupe.png")}
          style={styles.image}
        /> */}
      </TouchableOpacity>
    </View>
  );
};

const TreeAvatar = ({ treeStatus, value, handleAvatarPress }) => {
  switch (treeStatus) {
    case "normal":
      return (
        <Avatar
          size={60}
          rounded
          source={require("../../../../assets/garden/tree.png")}
          containerStyle={{ backgroundColor: "grey" }}
          onPress={handleAvatarPress}
        >
          <Badge
            status="success"
            value={value}
            containerStyle={{
              position: "absolute",
              top: 65,
              left: 16,
              zIndex: 100,
            }}
          />
        </Avatar>
      );
  }
};

const styles = StyleSheet.create({
  image: {
    width: 36,
    height: 36,
    resizeMode: "contain",
    borderWidth: 0,
    borderColor: "#fff",
  },
  treeContainer: {
    transform: [
      { rotateX: "0deg" },
      { rotateZ: "-45deg" },
      { rotateY: "10deg" },
    ],
    justifyContent: "center",
    alignItems: "center",
  },
  tree: {
    width: "50%",
    height: "50%",
  },
  cell: {
    backgroundColor: "transparent",
    width: cellSize,
    height: cellSize,
    overflow: "visible",
    // borderColor: "black", // Border color
    // borderWidth: 0.5, // Border width,
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },


});

export {
  Grass,
  NormalTree,
  RightLand,
  MiddleLand,
  LeftLand,
  LeftCornerLand,
  RightCornerLand,
  TreeBox,
  Shovel,
  Loupe,
  TreeAvatar,
  TreePhase1,
  TreePhase2,
  TreePhase3,
  TreePhase4,
  CellComponent,
};
