import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';

import Garden from './_component/Garden';
import Chart from './_component/Chart';

export default function StatisticsScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/theme/summer2.jpg')} style={{
        flex: 1,
        width: null,
        height: null,
        justifyContent: ''
      }}>
        <Garden />
        <Chart />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
