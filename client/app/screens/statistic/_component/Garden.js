import { useRef, useState } from "react";
import { Shovel, Loupe, TreeAvatar, TreeBox, CellComponent, HitBox, CrossHair, ShareSocial } from "./Tree";
import { StyleSheet, View, TouchableOpacity, Text, ImageBackground } from "react-native";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { BottomSheet } from "@rneui/themed";
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

const numRows = 6; // Number of rows in the garden
const numColumns = 6; // Number of columns in the garden
const cellSize = 50; // Fixed size for each cell

export default function Garden() {
  const [map, setMap] = useState([
    [3, 1, 0, 4, 0, 2],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 2, 0],
    [0, 0, 3, 2, 3, 0],
    [1, 4, 0, 0, 0, 2],
    [3, 0, 0, 1, 1, 0],
  ]);

  const [isVisible, setIsVisible] = useState(false);

  const [isOpenBorder, setOpenBorder] = useState(false);

  const [isPlantTree, setPlantTree] = useState(false);

  const [selectedTreePhase, setSelectedTreePhase] = useState(null);

  const [isRemoveTree, setRemoveTree] = useState(false);

  const [isOpenDetail, setOpenDetail] = useState(false);

  const togglePlantBottomSheet = () => setIsVisible(!isVisible);

  const toggleViewBottomSheet = () => setOpenDetail(!isOpenDetail);

  const zoomableViewRef = useRef(null);

  const gardenShareRef = useRef();

  const handleAvatarPress = (phase) => {
    setOpenBorder(true);
    setPlantTree(true);
    setIsVisible(false);
    setSelectedTreePhase(phase);
  };

  const handleShovelPress = () => {
    setOpenBorder(!isOpenBorder);
    setRemoveTree(!isRemoveTree);
  };

  const handlePlantTree = (x, y) => {
    if (map[y][x] === 0) {
      const newMap = map.map((row, i) => {
        if (i === y) {
          return row.map((cell, j) => (j === x ? selectedTreePhase : cell));
        } else {
          return row;
        }
      });
      setMap(newMap);
    }
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

  const resetZoom = () => {
    zoomableViewRef.current?.zoomTo(0.9)
  }

  const shareGarden = async () => {
    try {
      const sharedImageUri = await captureRef(gardenShareRef, {
        format: 'png',
        quality: 1,
      });

      await Sharing.shareAsync(sharedImageUri);
    } catch (error) {
      console.log(error);
    }
  }

  const handleTool = (x, y) => {
    if (isPlantTree) {
      if (map[y][x] === 0) {
        handlePlantTree(x, y);
        console.log("Plant");
      } else {
        console.log("Đã có cây được đặt ở đây!!!")
      }
      setOpenBorder(false);
      setPlantTree(false);
      setSelectedTreePhase(null);
    }
    if (isRemoveTree) {
      handleRemoveTree(x, y);
      console.log("Remove")
    } else {
      console.log()
    }
  };

  return (
    <View style={styles.gardern}>
      <View style={styles.gardenTool}>
        <TreeBox toggleBottomSheet={togglePlantBottomSheet} />
        <Shovel handleShovelPress={handleShovelPress} />
      </View>

      <View style={styles.socialTool}>
        <ShareSocial handleShare={shareGarden} />
        <CrossHair resetZoom={resetZoom} />
      </View>

      <ReactNativeZoomableView
        maxZoom={1.5}
        minZoom={0.5}
        zoomStep={0.5}
        initialZoom={0.9}
        bindToBorders={true}
        contentWidth={400}
        contentHeight={400}
        doubleTapZoomToCenter={true}
        ref={zoomableViewRef}
      >
        <View ref={gardenShareRef} collapsable={false} style={{ backgroundColor: '#fbf5e5' }}>
          <View style={styles.mapContainer} >
            <View style={styles.assetContainer} >
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
                    openBorder={(isPlantTree && map[y][x] === 0) || (isRemoveTree && map[y][x] !== 0)}
                    handleTool={handleTool}
                  />
                ))
              )}
            </View>
          </View>
        </View>
      </ReactNativeZoomableView>

      <BottomSheet isVisible={isVisible} onBackdropPress={togglePlantBottomSheet}>
        <View style={[styles.bottomSheetPlant, { justifyContent: "space-around" }]}>
          <TreeAvatar treeStatus="phase1" value={10} handleAvatarPress={() => handleAvatarPress(1)} />
          <TreeAvatar treeStatus="phase2" value={10} handleAvatarPress={() => handleAvatarPress(2)} />
          <TreeAvatar treeStatus="phase3" value={12} handleAvatarPress={() => handleAvatarPress(3)} />
          <TreeAvatar treeStatus="phase4" value={10} handleAvatarPress={() => handleAvatarPress(4)} />
        </View>
      </BottomSheet>

      <BottomSheet isVisible={isOpenDetail} onBackdropPress={toggleViewBottomSheet}>
        <View style={[styles.bottomSheetDetail, { justifyContent: "space-around" }]}>
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
    left: -((numColumns + 1) * cellSize) / 2 + Math.floor(numColumns / 2) * cellSize,
    top: ((numColumns - 2) * cellSize) / 2 - (numColumns - 2) * 0.22 * cellSize,
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
    position: 'relative',
    top: 10,
    gap: 5,
    right: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 0,
    zIndex: 1,
  },
  socialTool: {
    backgroundColor: "transparent",
    height: 0,
    position: 'relative',
    top: 10,
    gap: 5,
    left: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
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
