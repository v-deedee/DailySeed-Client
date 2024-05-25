import React, { useRef, useState, useEffect, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text, ScrollView, Button, ActivityIndicator } from "react-native";
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
import { MyBottomSheet } from "./BottomSheet/MyBottomSheet";
import { listTrees, updateTree } from "../../../services/tree.service";


const numRows = 6;
const numColumns = 6;
const cellSize = 50;

const Garden = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const currentYear = new Date().getFullYear();
  const options = ['2020', '2021', '2022', '2023', '2024'];
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const selectedIndex = options.indexOf(selectedYear.toString());
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [inventory, setInventory] = useState();
  const [loading, setLoading] = useState(false);

  const handleYearChange = (index) => {
    setSelectedYear(parseInt(options[index], 10));
  };

  const [treeInfo, setTreeInfo] = useState({});
  const [map, setMap] = useState([
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ]);

  // const [listUpdateTree, seListtUpdateTree] = useState([])
  // useFocusEffect(
  //   useCallback(() => {
  //     console.log("Hello")

  //     return () => {
  //       console.log("DM")
  //     };
  //   }, [listUpdateTree])
  // );


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await listTrees(selectedMonth + 1, selectedYear);
        const newMap = Array(numRows).fill().map(() => Array(numColumns).fill(0));
        const newTreeInfo = {};
        data.garden.forEach(({ tree, seed }) => {
          if (tree.coordinate_x !== null && tree.coordinate_y !== null && tree.coordinate_x !== -1 && tree.coordinate_y !== -1) {
            const assetArray = seed.asset.split('|');
            const phaseImage = assetArray[assetArray.length - seed.phase];
            newMap[tree.coordinate_y][tree.coordinate_x] = seed.phase;
            newTreeInfo[`${tree.coordinate_x}_${tree.coordinate_y}`] = { imageURL: phaseImage, id: tree.id };
            setTreeInfo(newTreeInfo);

          }
        });
        setMap(newMap);
        setInventory(data.inventory);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, [selectedMonth, selectedYear]);

  const [openSeedBox, setOpenSeedBox] = useState(false);
  const [isOpenBorder, setOpenBorder] = useState(false);
  const [isPlantTree, setPlantTree] = useState(false);
  const [selectedTreePhase, setSelectedTreePhase] = useState(null);
  const [isRemoveTree, setRemoveTree] = useState(false);
  const [isOpenDetail, setOpenDetail] = useState(false);
  const [isOpenMonthPicker, setOpenMonthPicker] = useState(false);
  const [isViewTree, setViewTree] = useState(false);
  const [selectedTreeID, setSelectedTreeID] = useState();

  const zoomableViewRef = useRef(null);
  const gardenShareRef = useRef();

  const toggleBottomSheet = (setter) => () => setter(prev => !prev);

  const handleAvatarPress = (phase) => {
    setOpenBorder(true);
    setPlantTree(true);
    setOpenSeedBox(false);
    setRemoveTree(false);
    setSelectedTreePhase(phase);
  };

  const handleShovelPress = () => {
    setOpenBorder(!isOpenBorder);
    setRemoveTree(!isRemoveTree);
  };

  const handleViewPress = () => {
    setOpenBorder(!isOpenBorder);
    setViewTree(!isViewTree);
  }

  const handlePlantTree = (x, y) => {
    if (map[y][x] === 0) {
      const newMap = map.map((row, i) =>
        row.map((cell, j) => (i === y && j === x ? selectedTreePhase : cell))
      );
      const newTreeInfo = { ...treeInfo, [`${x}_${y}`]: { imageURL: "seeds/tree3/phase3.png", id: null } };
      setMap(newMap);
      setTreeInfo(newTreeInfo);
    }
  };

  const handleRemoveTree = async (x, y) => {
    if ([1, 2, 3, 4].includes(map[y][x])) {
      const treeCoordinateKey = `${x}_${y}`;
      const treeId = treeInfo[treeCoordinateKey]?.id;
      if (treeId) {
        try {
          const treesToUpdate = [{
            id: treeId,
            coordinate_x: null,
            coordinate_y: null
          }];
          const newMap = map.map((row, i) => {
            if (i === y) {
              return row.map((cell, j) => (j === x ? 0 : cell));
            }
            return row;
          });
          setMap(newMap);

          const newTreeInfo = { ...treeInfo };
          if (newTreeInfo.hasOwnProperty(treeCoordinateKey)) {
            delete newTreeInfo[treeCoordinateKey];
          }
          setTreeInfo(newTreeInfo);

          const response = await updateTree(treesToUpdate);
        } catch (error) {
          console.error('Error updating tree');
        }
      } else {
        console.error('Could not find tree ID for the given coordinates');
      }
    }
  };

  const handleViewTree = (x, y) => {
    setOpenDetail(true);
    const treeCoordinateKey = `${x}_${y}`;
    const treeId = treeInfo[treeCoordinateKey]?.id;
    setSelectedTreeID(treeId);
  }

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
      setOpenBorder(false);
      setRemoveTree(false);
    }

    if (isViewTree) {
      handleViewTree(x, y);
      setOpenBorder(false);
      setViewTree(false);
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
          <Text style={styles.monthText}>{monthNames[selectedMonth]}-{selectedYear}</Text>
        </View>
        <View style={styles.row}>
          <TreeBox toggleBottomSheet={() => setOpenSeedBox(true)} setDisable={isRemoveTree || isViewTree} />
          <Shovel handleShovelPress={handleShovelPress} setDisable={isPlantTree || isViewTree} />
          <ViewTree handleLoupePress={handleViewPress} setDisable={isPlantTree || isRemoveTree} />
        </View>
      </View>

      <Button title="Chiu" onPress={() => console.log(inventory)} />

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
        {loading ? (
          <ActivityIndicator />
        ) : (
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
                      imgURL={treeInfo[`${x}_${y}`]?.imageURL || ""}
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
                      openBorder={(isPlantTree && map[y][x] === 0) || (isRemoveTree && map[y][x] !== 0) || (isViewTree && map[y][x] !== 0)}
                      handleTool={handleTool}
                    />
                  ))
                )}
              </View>
            </View>
          </View>
        )}
      </ReactNativeZoomableView>

      <MyBottomSheet
        open={openSeedBox}
        onClose={() => {
          setOpenSeedBox(false);
        }}
        defaultHeight={150}
      >
        <View style={[styles.bottomSheet, styles.bottomSheetPlant]}>
          {Object.keys(inventory).map((treeName, index) => (
            <TreeAvatar
              key={index}
              treeStatus={treeName}
              value={inventory[treeName][1].count} // Assuming phase 1 is always available
              handleAvatarPress={() => handleAvatarPress(treeName)}
            />
          ))}
        </View>
      </MyBottomSheet>

      <MyBottomSheet
        open={isOpenDetail}
        onClose={() => {
          setOpenDetail(false);
        }}
        defaultHeight={280}
        backgroundColor={"#6d4100"}
      >
        <View>
          <TreeDetail treeID={selectedTreeID} />
        </View>
      </MyBottomSheet>


      {/* <MyBottomSheet
        open={isOpenMonthPicker}
        onClose={() => {
          setOpenMonthPicker(false)
        }}
        defaultHeight={280}
        backgroundColor={"white"}
      >
        <View style={styles.bottomSheet}>
          <ScrollView horizontal={false} contentContainerStyle={styles.centeredContent}>
            <ScrollView horizontal contentContainerStyle={styles.pickerContainer} nestedScrollEnabled>
              <View>
                <WheelPicker
                  containerStyle={styles.wheelPicker}
                  selectedIndex={selectedMonth}
                  options={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
                  onChange={setSelectedMonth}
                />
              </View>


              <View>
                <WheelPicker
                  containerStyle={styles.wheelPicker}
                  selectedIndex={selectedIndex}
                  options={options}
                  onChange={handleYearChange}
                />
              </View>
            </ScrollView>
          </ScrollView>
        </View>
      </MyBottomSheet> */}
      <BottomSheet isVisible={isOpenMonthPicker} onBackdropPress={toggleBottomSheet(setOpenMonthPicker)}>
        <View style={styles.bottomSheet}>
          <ScrollView horizontal={false} contentContainerStyle={styles.centeredContent}>
            <ScrollView horizontal contentContainerStyle={styles.pickerContainer}>
              <View>
                <WheelPicker
                  containerStyle={styles.wheelPicker}
                  selectedIndex={selectedMonth}
                  options={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
                  onChange={setSelectedMonth}
                />
              </View>


              <View>
                <WheelPicker
                  containerStyle={styles.wheelPicker}
                  selectedIndex={selectedIndex}
                  options={options}
                  onChange={handleYearChange}
                />
              </View>
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
    top: 30,
    gap: 10,
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
    fontSize: 14,
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
