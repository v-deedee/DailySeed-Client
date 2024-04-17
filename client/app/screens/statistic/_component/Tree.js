import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Pressable
} from "react-native";
import { Avatar, Badge } from "@rneui/themed";

const numRows = 6; // Number of rows in the garden
const numColumns = 6; // Number of columns in the garden
const cellSize = 50; // Fixed size for each cell

const CellComponent = ({ type, x, y, openBorder }) => {
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
    top:
      -(y * cellSize) / 2 +
      (x * cellSize) / 2 -
      (x + y) * 0.22 * cellSize,

  };
  const cellStyle = () => {
    switch (type) {
      case 1:
        return { width: "50%", height: "40%", top: '0', left: '25%', ...(openBorder ? { opacity: 0.6 } : {}) };
      case 2:
        return { width: "60%", height: "70%", top: '-40%', left: '20%', ...(openBorder ? { opacity: 0.4 } : {}) };
      case 3:
        return { width: "70%", height: "90%", top: '-55%', left: '15%', ...(openBorder ? { opacity: 0.3 } : {}) };
      case 4:
        return { width: "80%", height: "110%", top: '-75%', left: '10%', ...(openBorder ? { opacity: 0.2 } : {}) };
    }
  };

  return (
    <ImageBackground source={require("../../../../assets/garden/block.png")} style={[styles.img, positionStyle]}>
      <Image source={assets[type]} style={cellStyle()} />
    </ImageBackground>
  );
};

const HitBox = ({ x, y, openBorder, handleTool }) => {
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
    // Handle press event here
    console.log(`Cell clicked at (${x}, ${y})`);
    handleTool(x, y);
  };

  return (
    <Pressable onPress={handlePress} style={[styles.hitbox, positionStyle, openBorder && { borderWidth: 2, borderColor: "#fff" }]} />
  );
};

const TreeBox = ({ toggleBottomSheet }) => {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.5} onPress={toggleBottomSheet}>
        <Image
          source={require("../../../../assets/garden/seeds.png")}
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
    case "phase1":
      return (
        <View>
          <Avatar
            size={60}
            rounded
            source={require("../../../../assets/garden/tree3-phase1.png")}
            containerStyle={{ backgroundColor: "#fcf0be" }}
            onPress={handleAvatarPress}
          >
          </Avatar>
          <Badge
            status="success"
            value={value}
          />
        </View>
      );
    case "phase2":
      return (
        <View>
          <Avatar
            size={60}
            rounded
            source={require("../../../../assets/garden/tree3-phase2.png")}
            containerStyle={{ backgroundColor: "#fcf0be" }}
            onPress={handleAvatarPress}
          >
          </Avatar>
          <Badge
            status="success"
            value={value}
          />
        </View>
      );
    case "phase3":
      return (
        <View>
          <Avatar
            size={60}
            rounded
            source={require("../../../../assets/garden/tree3-phase3.png")}
            containerStyle={{ backgroundColor: "#fcf0be" }}
            onPress={handleAvatarPress}
          >
          </Avatar>
          <Badge
            status="success"
            value={value}
          />
        </View>
      );
    case "phase4":
      return (
        <View>
          <Avatar
            size={60}
            rounded
            source={require("../../../../assets/garden/tree3-phase4.png")}
            containerStyle={{ backgroundColor: "#fcf0be" }}
            onPress={handleAvatarPress}
          >
          </Avatar>
          <Badge
            status="success"
            value={value}
          />
        </View>
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
    // borderColor: "black", // Border color
    // borderWidth: 0.5, // Border width,
    transform: [
      { rotateX: "55deg" },
      { rotateY: "0deg" },
      { rotateZ: "45deg" },
    ],
  },

});

export {
  TreeBox,
  Shovel,
  Loupe,
  TreeAvatar,
  CellComponent,
  HitBox
};
