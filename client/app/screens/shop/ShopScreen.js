import { StyleSheet, Text, View } from "react-native";
import { Tab, TabView } from '@rneui/themed';
import { useState } from "react";
import TabAll from "./_component/TabAll";
import TabTheme from "./_component/TabTheme";
import TabClover from "./_component/TabClover";

export default function ShopScreen() {
  const [index, setIndex] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Store</Text>
        <View style={styles.tabContainer}>
          <Tab value={index} onChange={(e) => setIndex(e)} indicatorStyle={styles.tabUnderline}>
            <Tab.Item title="All" titleStyle={styles.tabItem} />
            <Tab.Item title="Theme" titleStyle={styles.tabItem} />
            <Tab.Item title="Clovers" titleStyle={styles.tabItem} />
          </Tab>
        </View>
      </View>

      <TabView value={index} onChange={setIndex} disableTransition={true}>
        <TabView.Item style={styles.tabView}>
          <TabAll />
        </TabView.Item>
        <TabView.Item style={styles.tabView}>
          <TabTheme />
        </TabView.Item>
        <TabView.Item style={styles.tabView}>
          <TabClover />
        </TabView.Item>
      </TabView >
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbf5e5',
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    alignItems: 'center'
  },
  title: {
    marginVertical: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#474838",
  },
  tabContainer: {
    width: '100%'
  },
  tabUnderline: {
    backgroundColor: '#50AA75',
    height: 1,

  },
  tabItem: {
    color: '#50AA75',
  },
  tabView: {
    width: '100%',
    height: '100%'
  }
});
