import { useState } from "react";
import { Shovel, Loupe, TreeAvatar, TreeBox, CellComponent, HitBox } from "./Tree";
import { StyleSheet, View, TouchableOpacity, ImageBackground } from "react-native";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { BottomSheet } from "@rneui/themed";
// import TreeDetail from "./TreeDetail";

const numRows = 6; // Number of rows in the garden
const numColumns = 6; // Number of columns in the garden
const cellSize = 50; // Fixed size for each cell

export default function Garden() {
  const [map, setMap] = useState([
    [0, 3, 4, 0, 0, 0],
    [0, 3, 4, 0, 0, 0],
    [0, 3, 4, 0, 1, 0],
    [0, 0, 3, 0, 1, 0],
    [0, 1, 3, 1, 1, 2],
    [0, 0, 0, 0, 2, 4],
  ]);

  const [isVisible, setIsVisible] = useState(false);

  const [isOpenBorder, setOpenBorder] = useState(false);

  const [isPlantTree, setPlantTree] = useState(false);

  const [isRemoveTree, setRemoveTree] = useState(false);

  const [isOpenDetail, setOpenDetail] = useState(false);

  const togglePlantBottomSheet = () => setIsVisible(!isVisible);

  const toggleViewBottomSheet = () => setOpenDetail(!isOpenDetail);

  const handleAvatarPress = () => {
    setOpenBorder(true);
    setPlantTree(true);
    setIsVisible(false);
  };

  const handleShovelPress = () => {
    setOpenBorder(!isOpenBorder);
    setRemoveTree(!isRemoveTree);
  };

  const handlePlantTree = (x, y) => {
    if (map[y][x] === 0) {
      const newMap = map.map((row, i) => {
        if (i === y) {
          return row.map((cell, j) => (j === x ? 3 : cell));
        } else {
          return row;
        }
      });
      setMap(newMap);
    }
    setOpenBorder(false);
    setPlantTree(false);
  };

  const handleRemoveTree = (x, y) => {
    if (map[y][x] === 1 || map[y][x] === 2 || map[y][x] === 3 || map[y][x] === 4) {
      const newMap = map.map((row, i) => {
        if (i === y) {
          return row.map((cell, j) => (j === x ? 0 : cell));
        } else {
          return row;
        }
      });
      setMap(newMap);
    }
    setOpenBorder(false);
    setRemoveTree(false);
  };

  const handleViewTree = (x, y) => {

  };

  const handleTool = (x, y) => {
    if (isPlantTree) {
      handlePlantTree(x, y);
      console.log("Plant")
    }
    if (isRemoveTree) {
      handleRemoveTree(x, y);
      console.log("Remove")
    }
  };

  return (
    <View style={styles.gardern}>
      <View style={styles.gardenTool}>
        <TreeBox toggleBottomSheet={togglePlantBottomSheet} />
        <Shovel handleShovelPress={handleShovelPress} />
        <Loupe handleLoupePress={toggleViewBottomSheet} />
      </View>

      <ReactNativeZoomableView
        maxZoom={1.5}
        minZoom={0.4}
        zoomStep={0.5}
        initialZoom={0.6}
        bindToBorders={true}
        style={{ backgroundColor: 'red' }}
        contentWidth={600}
        contentHeight={600}
      >
        <View style={styles.mapContainer}>
          <View style={styles.assetContainer}>
            {map.map((row, y) =>
              row.map((cellType, x) => (
                <CellComponent
                  key={`${x}_${y}`}
                  type={cellType}
                  x={x}
                  y={y}
                  openBorder={isOpenBorder}
                />
              ))
            )}
          </View>
          <View style={styles.hitboxContainer}>
            {map.map((row, y) =>
              row.map((cellType, x) => (
                <HitBox
                  key={`hitbox_${x}_${y}`}
                  x={x}
                  y={y}
                  openBorder={isOpenBorder}
                  handleTool={handleTool}
                />
              ))
            )}
          </View>
        </View>

      </ReactNativeZoomableView>

      <BottomSheet
        isVisible={isVisible}
        onBackdropPress={togglePlantBottomSheet}
      >
        <View
          style={[styles.bottomSheetPlant, { justifyContent: "space-around" }]}
        >
          <TreeAvatar
            treeStatus="normal"
            value={10}
            handleAvatarPress={handleAvatarPress}
          />
          <TreeAvatar treeStatus="normal" value={10} />
          <TreeAvatar treeStatus="normal" value={10} />
          <TreeAvatar treeStatus="normal" value={12} />
          <TreeAvatar treeStatus="normal" value={10} />
        </View>
      </BottomSheet>

      <BottomSheet
        isVisible={isOpenDetail}
        onBackdropPress={toggleViewBottomSheet}
      >
        <View
          style={[styles.bottomSheetDetail, { justifyContent: "space-around" }]}
        >
          {/* <TreeDetail /> */}
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  gardern: {
    flex: 3,
    backgroundColor: "#fbf5e5",
    width: "100%",
    height: "100%",
  },
  mapContainer: {
    height: numRows * cellSize,
    width: numColumns * cellSize,
    position: "relative",
    left: "-15%",
    top: "20%"
  },
  assetContainer: {
    backgroundColor: "transparent",
    flexDirection: "row", // To create a grid, use flexDirection: "row"
    flexWrap: "wrap", // Allow wrapping to create a grid
    width: numColumns * cellSize, // Set width based on number of columns
    height: numRows * cellSize, // Set height based on number of rows
    position: "absolute",
  },
  hitboxContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    flexWrap: "wrap",
    width: numColumns * cellSize,
    height: numRows * cellSize,
    position: "absolute",
    top: -cellSize * 0.2,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 35,
    height: 35,
    margin: 0,
    borderWidth: 0,
    borderColor: "#fff",
  },
  gardenTool: {
    backgroundColor: "transparent",
    height: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 0,
    zIndex: 1,
  },
  bottomSheetPlant: {
    flexDirection: "row",
    paddingBottom: 40,
    paddingTop: 40,
    borderRadius: 30,
    backgroundColor: "white",
  },
  bottomSheetDetaiL: {
    borderRadius: 30,
    backgroundColor: "white",
  },
});
