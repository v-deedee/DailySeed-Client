import React, { useRef, useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  ActivityIndicator,
} from "react-native";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { BottomSheet } from "@rneui/themed";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import WheelPicker from "react-native-wheely";

import {
  Shovel,
  TreeAvatar,
  TreeBox,
  CellComponent,
  HitBox,
  CrossHair,
  ShareSocial,
  ViewTree,
  ViewGarden,
} from "./Tree";
import TreeDetail from "./TreeDetail";
import { MyBottomSheet } from "./BottomSheet/MyBottomSheet";
import { listTrees, updateTree } from "../../../../services/tree.service";
import { Queue } from "./Queue";
import Chart from "./Chart";

const numRows = 6;
const numColumns = 6;
const cellSize = 50;

demoinventory = {
  "Cây mùa xuân": {
    phase: {
      1: [10, 20, 30],
      2: [10, 20],
      3: [11, 21],
    },
    asset:
      "seeds/tree2/phase4.png|seeds/tree2/phase3.png|seeds/tree2/phase2.png|seeds/tree2/phase1.png",
  },
};

const Garden = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const currentYear = new Date().getFullYear();
  const options = ["2020", "2021", "2022", "2023", "2024"];
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const selectedIndex = options.indexOf(selectedYear.toString());
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [inventory, setInventory] = useState();
  const [charData, setChartData] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedTree, setSelectedTree] = useState();

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await listTrees(selectedMonth + 1, selectedYear);
        const newMap = Array(numRows)
          .fill()
          .map(() => Array(numColumns).fill(0));
        const newTreeInfo = {};

        data.garden.forEach(({ tree, seed }) => {
          if (
            tree.coordinate_x !== null &&
            tree.coordinate_y !== null &&
            tree.coordinate_x !== -1 &&
            tree.coordinate_y !== -1
          ) {
            const assetArray = seed.asset.split("|");
            const phaseImage = assetArray[assetArray.length - seed.phase];
            newMap[tree.coordinate_y][tree.coordinate_x] = seed.phase;
            newTreeInfo[`${tree.coordinate_x}_${tree.coordinate_y}`] = {
              imageURL: phaseImage,
              id: tree.id,
              phase: seed.phase,
              name: seed.name,
            };
            setTreeInfo(newTreeInfo);
          }
        });

        setMap(newMap);
        setInventory(data.inventory);
        setChartData(data.chart);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
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

  const toggleBottomSheet = (setter) => () => setter((prev) => !prev);

  const handleAvatarPress = (tree, phase, img) => {
    setOpenBorder(true);
    setPlantTree(true);
    setOpenSeedBox(false);
    setRemoveTree(false);

    const treeInfo = inventory[tree];
    let id;

    if (treeInfo.phase[phase].length > 0) {
      id = treeInfo.phase[phase].pop();
      const newTreeInfo = { imageURL: img, id: id, phase: phase, name: tree };
      console.log(treeInfo.phase[phase].length);
      setSelectedTree(newTreeInfo);
    }

    setSelectedTreePhase(phase);
  };

  const handleShovelPress = () => {
    setOpenBorder(!isOpenBorder);
    setRemoveTree(!isRemoveTree);
  };

  const handleViewPress = () => {
    setOpenBorder(!isOpenBorder);
    setViewTree(!isViewTree);
  };

  const handlePlantTree = (x, y) => {
    if (map[y][x] === 0) {
      console.log("Phase", selectedTreePhase);
      const newMap = map.map((row, i) =>
        row.map((cell, j) =>
          i === y && j === x ? parseInt(selectedTreePhase) : cell,
        ),
      );
      const newTreeInfo = { ...treeInfo, [`${x}_${y}`]: selectedTree };

      const treesToUpdate = [
        {
          id: selectedTree.id,
          coordinate_x: x,
          coordinate_y: y,
        },
      ];

      setMap(newMap);
      setTreeInfo(newTreeInfo);

      const response = updateTree(treesToUpdate);
    }
  };

  const updateInventory = (inventory, phase, id, asset, treeName) => {
    const newInventory = { ...inventory };

    const treeAssets = {
      "Autumn tree":
        "seeds/tree2/phase4.png|seeds/tree2/phase3.png|seeds/tree2/phase2.png|seeds/tree2/phase1.png",
      "Spring tree":
        "seeds/tree1/phase4.png|seeds/tree1/phase3.png|seeds/tree1/phase2.png|seeds/tree1/phase1.png",
      "Default tree":
        "seeds/tree0/phase4.png|seeds/tree0/phase3.png|seeds/tree0/phase2.png|seeds/tree0/phase1.png",
    };

    if (newInventory.hasOwnProperty(treeName)) {
      const treeData = newInventory[treeName];

      if (treeData.phase.hasOwnProperty(phase)) {
        treeData.phase[phase] = [...treeData.phase[phase], id];
      } else {
        treeData.phase[phase] = [id];
      }
    } else {
      newInventory[treeName] = {
        phase: {
          [phase]: [id],
        },
        asset: treeAssets[treeName],
      };
    }
    setInventory(newInventory);
  };

  const handleRemoveTree = (x, y) => {
    if ([1, 2, 3, 4].includes(map[y][x])) {
      const treeCoordinateKey = `${x}_${y}`;
      const treeId = treeInfo[treeCoordinateKey]?.id;

      const treesToUpdate = [
        {
          id: treeId,
          coordinate_x: null,
          coordinate_y: null,
        },
      ];

      const newMap = map.map((row, i) => {
        if (i === y) {
          return row.map((cell, j) => (j === x ? 0 : cell));
        }
        return row;
      });
      setMap(newMap);

      const newTreeInfo = { ...treeInfo };
      if (newTreeInfo.hasOwnProperty(treeCoordinateKey)) {
        updateInventory(
          inventory,
          treeInfo[treeCoordinateKey].phase,
          treeId,
          treeInfo[treeCoordinateKey].imageURL,
          treeInfo[treeCoordinateKey].name,
        );
        delete newTreeInfo[treeCoordinateKey];
      }

      setTreeInfo(newTreeInfo);

      const response = updateTree(treesToUpdate);
    }
  };

  const handleViewTree = (x, y) => {
    setOpenDetail(true);
    const treeCoordinateKey = `${x}_${y}`;
    const treeId = treeInfo[treeCoordinateKey]?.id;
    setSelectedTreeID(treeId);
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
        format: "png",
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
          <ViewGarden
            handleCalendarPress={toggleBottomSheet(setOpenMonthPicker)}
          />
        </View>
        <View style={styles.monthTextContainer}>
          <Text style={styles.monthText}>
            {monthNames[selectedMonth]}-{selectedYear}
          </Text>
        </View>
        <View style={styles.row}>
          <TreeBox
            toggleBottomSheet={() => setOpenSeedBox(true)}
            setDisable={isRemoveTree || isViewTree}
          />
          <Shovel
            handleShovelPress={handleShovelPress}
            setDisable={isPlantTree || isViewTree}
          />
          <ViewTree
            handleLoupePress={handleViewPress}
            setDisable={isPlantTree || isRemoveTree}
          />
        </View>
      </View>
      {/* 
      <Button title="treeInfo" onPress={() => console.log(JSON.stringify(treeInfo))} />
      <Button title="inventory" onPress={() => console.log(JSON.stringify(inventory))} /> */}

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
          <View
            ref={gardenShareRef}
            collapsable={false}
            style={styles.gardenBackground}
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
                      imgURL={treeInfo[`${x}_${y}`]?.imageURL || ""}
                      openBorder={isOpenBorder}
                    />
                  )),
                )}
              </View>
              <View style={styles.hitboxContainer}>
                {map.map((row, y) =>
                  row.map((cellType, x) => (
                    <HitBox
                      key={`hitbox_${x}_${y}`}
                      x={x}
                      y={y}
                      openBorder={
                        (isPlantTree && map[y][x] === 0) ||
                        (isRemoveTree && map[y][x] !== 0) ||
                        (isViewTree && map[y][x] !== 0)
                      }
                      handleTool={handleTool}
                    />
                  )),
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
          {inventory &&
            Object.entries(inventory).map(([treeId, treeInfo]) => (
              <View key={treeId}>
                {Object.entries(treeInfo.phase).map(([phase, items]) => {
                  if (items.length > 0) {
                    const assetURL =
                      treeInfo.asset.split("|")[4 - parseInt(phase)];
                    return (
                      <View key={phase} style={{ marginBottom: 10 }}>
                        <TreeAvatar
                          value={items.length}
                          imgURL={assetURL}
                          type={phase}
                          handleAvatarPress={() =>
                            handleAvatarPress(treeId, phase, assetURL)
                          }
                        />
                      </View>
                    );
                  } else {
                  }
                  return null;
                })}
              </View>
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

      <BottomSheet
        isVisible={isOpenMonthPicker}
        onBackdropPress={toggleBottomSheet(setOpenMonthPicker)}
      >
        <View style={styles.bottomSheet}>
          <ScrollView
            horizontal={false}
            contentContainerStyle={styles.centeredContent}
          >
            <ScrollView
              horizontal
              contentContainerStyle={styles.pickerContainer}
            >
              <View>
                <WheelPicker
                  containerStyle={styles.wheelPicker}
                  selectedIndex={selectedMonth}
                  options={[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ]}
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

      {charData && <Chart chartData={charData} loading={loading} />}
    </View>
  );
};

const styles = StyleSheet.create({
  garden: {
    flex: 1,
    backgroundColor: "#fbf5e5",
    width: "100%",
    height: "100%",
  },
  tool: {
    backgroundColor: "transparent",
    height: 0,
    position: "relative",
    top: 10,
    gap: 10,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
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
    backgroundColor: "#fbf5e5",
  },
  mapContainer: {
    height: numRows * cellSize,
    width: numColumns * cellSize,
    position: "relative",
    left:
      -((numColumns + 1) * cellSize) / 2 +
      Math.floor(numColumns / 2) * cellSize,
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
    alignItems: "center",
    justifyContent: "center",
  },
  pickerContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  wheelPicker: {
    width: "100%",
  },
});

export default Garden;
