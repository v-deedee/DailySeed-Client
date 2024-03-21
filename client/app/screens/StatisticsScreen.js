import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';

export default function StatisticsScreen() {
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

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {renderMap()}
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // transform: [{ rotateX: '45deg' }, { rotateZ: '45deg' }],
    transform: [{ rotateX: '45deg' }, { rotateY: '0deg' }, { rotateZ: '45deg' }]
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 45,
    height: 45,
    margin: 0,
    borderWidth: 1,
    borderColor: "#fff"
  },
  image: {
    width: 46,
    height: 46,
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
    width: 50,
    height: 50,
    marginTop: -35,
    marginLeft: -15,
  }
});
