import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { Dimensions, Button } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function StatisticsScreen() {
  const [showModal, setShowModal] = useState(false);

  const [map, setMap] = useState([
    [1, 0, 0, 0, 0, 0, 6],
    [1, 0, 0, 0, 0, 0, 3],
    [1, 0, 0, 0, 0, 0, 3],
    [1, 1, 1, 1, 0, 0, 3],
    [1, 0, 0, 0, 1, 0, 3],
    [0, 0, 0, 0, 1, 0, 3],
    [5, 2, 2, 2, 2, 2, 4],
  ]);

  const handleCellClick = (rowIndex, cellIndex) => {
    const newMap = map.map((row, i) => {
      if (i === rowIndex) {
        return row.map((cell, j) => (j === cellIndex ? 1 : cell));
      } else {
        return row;
      }
    });
    setMap(newMap);
  };

  const renderMap = () => {
    return map.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, cellIndex) => (
          <TouchableOpacity key={cellIndex} style={styles.cell} disabled={cell !== 0} onPress={() => {
            if (cell === 0) {
              handleCellClick(rowIndex, cellIndex);
            }
          }}>
            <View>
              {cell === 0 && (
                <ImageBackground
                  source={require('../../assets/garden/grass.png')}
                  style={styles.image}
                />
              )}
              {cell === 1 && (
                <ImageBackground
                  source={require('../../assets/garden/grass.png')}
                  style={styles.image}
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
    color: (opacity = 1) => `rgba(80, 170, 117, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const data1 = {
    labels: ["3/1", "6/3", "11/3", "16/3", "21/3", "26/3", "31/3"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43],
        strokeWidth: 2 // optional
      }
    ],
    legend: ["😊"] // optional
  };

  const data2 = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8]
  };
  return (
    <View style={styles.container}>
      <View style={styles.gardern}>
        <View style={{ backgroundColor: 'transparent', height: 50, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 50, zIndex: 1 }}>
          <View>
            <TouchableOpacity activeOpacity={0.5} onPress={() => setShowModal(true)}>
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
          initialZoom={0.8}
          bindToBorders={true}
          onZoomAfter={this.logOutZoomState}
          style={{}}
        >
          <View style={styles.mapContainer}>
            {renderMap()}
          </View>
        </ReactNativeZoomableView>
      </View>

      <View style={{ flex: 3, backgroundColor: '#F4F2EE' }}>
        <LineChart
          data={data1}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
        />
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
    borderColor: "#fff"
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
