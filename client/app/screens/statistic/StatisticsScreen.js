import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';

import Garden from './_component/Garden';
import Chart from './_component/Chart';

export default function StatisticsScreen() {
  return (
    <View style={styles.container}>
      <Garden />
      <Chart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbf5e5",
  },
});
