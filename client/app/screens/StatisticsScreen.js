import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { Dimensions, Button } from "react-native";
import { Card, Avatar, Badge, BottomSheet } from "@rneui/themed";

const screenWidth = Dimensions.get("window").width;

export default function StatisticsScreen() {
  const [isVisible, setIsVisible] = useState(false);

  const [isDisable, setDisable] = useState(true);

  const [openBorder, setOpenBorder] = useState(false);

  const toggleBottomSheet = () => setIsVisible(!isVisible);

  const handleAvatarPress = () => {
    setOpenBorder(true);
    setIsVisible(false);
    setDisable(false)
  };

  const handlePlantTree = (cell, rowIndex, cellIndex) => {
    if (cell === 0) {
      const newMap = map.map((row, i) => {
        if (i === rowIndex) {
          return row.map((cell, j) => (j === cellIndex ? 1 : cell));
        } else {
          return row;
        }
      });
      setMap(newMap);

    }
    setDisable(true)
    setOpenBorder(false)
  }

  const [map, setMap] = useState([
    [1, 0, 0, 0, 0, 0, 6],
    [1, 0, 0, 0, 0, 0, 3],
    [1, 0, 0, 0, 0, 0, 3],
    [1, 1, 1, 1, 0, 0, 3],
    [1, 0, 0, 0, 1, 0, 3],
    [0, 0, 0, 0, 1, 0, 3],
    [5, 2, 2, 2, 2, 2, 4],
  ]);

  const renderMap = () => {
    return map.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, cellIndex) => (
          <TouchableOpacity key={cellIndex} style={styles.cell} disabled={isDisable} onPress={() => handlePlantTree(cell, rowIndex, cellIndex)}>
            <View>
              {cell === 0 && (
                <ImageBackground
                  source={require('../../assets/garden/grass.png')}
                  style={[styles.image, openBorder && { borderWidth: 1, borderColor: '#fff' }]}
                />
              )}
              {cell === 1 && (
                <ImageBackground
                  source={require('../../assets/garden/grass.png')}
                  style={[styles.image, openBorder && { borderWidth: 1, borderColor: '#fff' }]}
                >
                  <View style={styles.treeContainer}>
                    <Image source={require('../../assets/garden/tree.png')} style={styles.tree} />
                  </View>
                </ImageBackground>
              )}
              {cell === 2 && (
                <ImageBackground
                  source={require('../../assets/garden/left.png')}
                  style={styles.image}
                />
              )}
              {cell === 3 && (
                <ImageBackground
                  source={require('../../assets/garden/right.png')}
                  style={styles.image}
                />
              )}
              {cell === 4 && (
                <ImageBackground
                  source={require('../../assets/garden/middle.png')}
                  style={styles.image}
                />
              )}
              {cell === 5 && (
                <ImageBackground
                  source={require('../../assets/garden/left-corner.png')}
                  style={styles.image}
                />
              )}
              {cell === 6 && (
                <ImageBackground
                  source={require('../../assets/garden/right-corner.png')}
                  style={styles.image}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 0) => `rgba(18, 155, 18, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,
    decimalPlaces: 0,
  };

  const data = {
    labels: ["1/3", "6/3", "11/3", "16/3", "21/3", "26/3", "31/3"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43, 60, 25, 40, 70, 55],
        strokeWidth: 2 // optional
      }
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.gardern}>
        <View style={{ backgroundColor: 'transparent', height: 50, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 50, zIndex: 1 }}>
          <View>
            <TouchableOpacity activeOpacity={0.5} onPress={toggleBottomSheet}>
              <Image
                source={require('../../assets/garden/box.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <View>
            <ImageBackground
              source={require('../../assets/garden/move.png')}
              style={styles.image}
            />
          </View>
        </View>

        <ReactNativeZoomableView
          maxZoom={1.5}
          minZoom={0.5}
          zoomStep={0.5}
          initialZoom={0.9}
          bindToBorders={true}
          onZoomAfter={this.logOutZoomState}
          style={{ paddingBottom: 100 }}
        >
          <View style={styles.mapContainer}>
            {renderMap()}
          </View>
        </ReactNativeZoomableView>
      </View>


      <BottomSheet isVisible={isVisible} onBackdropPress={toggleBottomSheet}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingBottom: 40,
            paddingTop: 40,
            borderRadius: 30,
            backgroundColor: 'white'
          }}
        >
          <Avatar
            size={60}
            rounded
            source={require('../../assets/garden/tree.png')}
            containerStyle={{ backgroundColor: 'grey' }}
            onPress={handleAvatarPress}
          >
            <Badge
              status="success"
              value={10}
              containerStyle={{ position: 'absolute', top: 65, left: 16, zIndex: 100 }}
            />
          </Avatar>
          <Avatar
            size={60}
            rounded
            source={require('../../assets/garden/tree.png')}
            containerStyle={{ backgroundColor: 'grey' }}
          >
            <Badge
              status="success"
              value={10}
              containerStyle={{ position: 'absolute', top: 65, left: 16, zIndex: 100 }}
            />
          </Avatar>
          <Avatar
            size={60}
            rounded
            source={require('../../assets/garden/tree.png')}
            containerStyle={{ backgroundColor: 'grey' }}
          >
            <Badge
              status="success"
              value={10}
              containerStyle={{ position: 'absolute', top: 65, left: 16, zIndex: 100 }}
            />
          </Avatar>
          <Avatar
            size={60}
            rounded
            source={require('../../assets/garden/tree.png')}
            containerStyle={{ backgroundColor: 'grey' }}
          >
            <Badge
              status="success"
              value={10}
              containerStyle={{ position: 'absolute', top: 65, left: 16, zIndex: 100 }}
            />
          </Avatar>

          <Avatar
            size={60}
            rounded
            source={require('../../assets/garden/tree.png')}
            containerStyle={{ backgroundColor: 'grey' }}
          >
            <Badge
              status="success"
              value={10}
              containerStyle={{ position: 'absolute', top: 65, left: 16, zIndex: 100 }}
            />
          </Avatar>

        </View>
      </BottomSheet>

      <View style={{ marginTop: -100, flex: 2 }}>
        <Card containerStyle={{ paddingLeft: 0, paddingRight: 0, borderRadius: 20 }}>
          <Card.Title>Status Flow</Card.Title>
          <Card.Divider />
          <LineChart
            data={data}
            width={screenWidth - 35}
            height={170}
            chartConfig={chartConfig}
            bezier
          />
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  gardern: {
    flex: 3,
    backgroundColor: '#d8e1d0',
    width: '100%',
    height: '100%'
  },
  mapContainer: {
    // transform: [{ rotate: '45deg' }]
    // transform: [{ rotateX: '45deg' }, { rotateZ: '45deg' }],
    transform: [{ rotateX: '20deg' }, { rotateY: '0deg' }, { rotateZ: '45deg' }],

  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 35,
    height: 35,
    margin: 0,
    borderWidth: 0,
    borderColor: "#fff"
  },
  image: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    borderWidth: 0,
    borderColor: "#fff",
  },
  treeContainer: {
    transform: [{ rotateX: '0deg' }, { rotateZ: '-45deg' }, { rotateY: '10deg' }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  tree: {
    width: 45,
    height: 45,
    marginTop: -20,
    marginLeft: -5,
  }
});
