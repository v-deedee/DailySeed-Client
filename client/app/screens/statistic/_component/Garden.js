import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { BottomSheet } from "@rneui/themed";
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import WheelPicker from 'react-native-wheely';

import {
  Shovel, TreeAvatar, TreeBox, CellComponent, HitBox,
  CrossHair, ShareSocial, ViewTree, ViewGarden
} from "./Tree";
import TreeDetail from "./TreeDetail";

const numRows = 6;
const numColumns = 6;
const cellSize = 50;

const Garden = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [map, setMap] = useState([
    [4, 1, 0, 4, 0, 2],
    [0, 2, 0, 1, 0, 0],
    [2, 0, 0, 1, 2, 4],
    [0, 0, 3, 2, 3, 0],
    [1, 4, 0, 2, 0, 1],
    [3, 0, 0, 1, 0, 0],
  ]);

  const [isVisible, setIsVisible] = useState(false);
  const [isOpenBorder, setOpenBorder] = useState(false);
  const [isPlantTree, setPlantTree] = useState(false);
  const [selectedTreePhase, setSelectedTreePhase] = useState(null);
  const [isRemoveTree, setRemoveTree] = useState(false);
  const [isOpenDetail, setOpenDetail] = useState(false);
  const [isOpenMonthPicker, setOpenMonthPicker] = useState(false);

  const zoomableViewRef = useRef(null);
  const gardenShareRef = useRef();

  const toggleBottomSheet = (setter) => () => setter(prev => !prev);

  const handleAvatarPress = (phase) => {
    setOpenBorder(true);
    setPlantTree(true);
    setIsVisible(false);
    setRemoveTree(false);
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
        }
        return row;
      });
      setMap(newMap);
    }
  };

  const handleRemoveTree = (x, y) => {
    if ([1, 2, 3, 4].includes(map[y][x])) {
      const newMap = map.map((row, i) => {
        if (i === y) {
          return row.map((cell, j) => (j === x ? 0 : cell));
        }
        return row;
      });
      setMap(newMap);
    }
    setOpenBorder(false);
    setRemoveTree(false);
  };

  const handleTool = (x, y) => {
    if (isPlantTree) {
      if (map[y][x] === 0) {
        handlePlantTree(x, y);
      } else {
        console.log("Tree already planted here.");
      }
      setOpenBorder(false);
      setPlantTree(false);
      setSelectedTreePhase(null);
    }
    if (isRemoveTree) {
      handleRemoveTree(x, y);
    }
  };

  const resetZoom = () => {
    zoomableViewRef.current?.zoomTo(0.9);
  };

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
  };

  return (
    <View style={styles.garden}>
      <View style={styles.tool}>
        <View style={styles.row}>
          <ShareSocial handleShare={shareGarden} />
          <CrossHair resetZoom={resetZoom} />
          <ViewGarden handleCalendarPress={toggleBottomSheet(setOpenMonthPicker)} />
        </View>
        <View style={styles.monthTextContainer}>
          <Text style={styles.monthText}>April, 2024</Text>
        </View>
        <View style={styles.row}>
          <TreeBox toggleBottomSheet={toggleBottomSheet(setIsVisible)} />
          <Shovel handleShovelPress={handleShovelPress} />
          <ViewTree handleLoupePress={() => setOpenDetail(true)} />
        </View>
      </View>

      <ReactNativeZoomableView
        maxZoom={1.5}
        minZoom={0.5}
        zoomStep={0.5}
        initialZoom={0.9}
        bindToBorders
        contentWidth={400}
        contentHeight={400}
        doubleTapZoomToCenter
        ref={zoomableViewRef}
      >
        <View ref={gardenShareRef} collapsable={false} style={styles.gardenBackground}>
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
                    openBorder={(isPlantTree && map[y][x] === 0) || (isRemoveTree && map[y][x] !== 0)}
                    handleTool={handleTool}
                  />
                ))
              )}
            </View>
          </View>
        </View>
      </ReactNativeZoomableView>

      <BottomSheet isVisible={isVisible} onBackdropPress={toggleBottomSheet(setIsVisible)}>
        <View style={[styles.bottomSheet, styles.bottomSheetPlant]}>
          {[1, 2, 3, 4].map(phase => (
            <TreeAvatar
              key={phase}
              treeStatus={`phase${phase}`}
              value={10}
              handleAvatarPress={() => handleAvatarPress(phase)}
            />
          ))}
        </View>
      </BottomSheet>

      <BottomSheet isVisible={isOpenDetail} onBackdropPress={toggleBottomSheet(setOpenDetail)}>
        <View style={styles.bottomSheet}>
          <TreeDetail />
        </View>
      </BottomSheet>

      <BottomSheet isVisible={isOpenMonthPicker} onBackdropPress={toggleBottomSheet(setOpenMonthPicker)}>
        <View style={styles.bottomSheet}>
          <ScrollView horizontal={false} contentContainerStyle={styles.centeredContent}>
            <ScrollView horizontal contentContainerStyle={styles.pickerContainer}>
              <WheelPicker
                containerStyle={styles.wheelPicker}
                selectedIndex={selectedMonth}
                options={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
                onChange={setSelectedMonth}
              />
            </ScrollView>
          </ScrollView>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  garden: {
    flex: 3,
    backgroundColor: "#fbf5e5",
    width: "100%",
    height: "100%",
  },
  tool: {
    backgroundColor: "transparent",
    height: 0,
    position: 'relative',
    top: 10,
    gap: 5,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingTop: 0,
    zIndex: 1,
  },
  row: {
    flexDirection: "row",
  },
  monthTextContainer: {
    height: 36,
    justifyContent: "center",
  },
  monthText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#787878",
  },
  gardenBackground: {
    backgroundColor: '#fbf5e5',
  },
  mapContainer: {
    height: numRows * cellSize,
    width: numColumns * cellSize,
    position: "relative",
    left: -((numColumns + 1) * cellSize) / 2 + Math.floor(numColumns / 2) * cellSize,
    top: ((numColumns - 2) * cellSize) / 2 - (numColumns - 2) * 0.22 * cellSize,
  },
  assetContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: numColumns * cellSize,
    height: numRows * cellSize,
    position: "absolute",
  },
  hitboxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: numColumns * cellSize,
    height: numRows * cellSize,
    position: "absolute",
    top: -cellSize * 0.2,
  },
  bottomSheet: {
    borderRadius: 30,
    backgroundColor: "white",
    padding: 20,
  },
  bottomSheetPlant: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  centeredContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelPicker: {
    width: '100%',
  },
});

export default Garden;
