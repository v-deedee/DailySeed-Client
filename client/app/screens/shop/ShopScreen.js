import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { Tab, TabView } from "@rneui/themed";
import { useContext, useEffect, useState } from "react";
import TabAll from "./_component/TabAll";
import TabCoin from "./_component/TabCoin";
import { UserContext } from "../../contexts/user.context";

export default function ShopScreen() {
  const [index, setIndex] = useState(0);
  const { user } = useContext(UserContext);
  useEffect(() => {
    console.log(user.profile.money);
    console.log(user);
  }, [user]);
  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ alignItems: "center", width: "100%" }}>
            <Text style={styles.title}>Store</Text>
          </View>
          <View style={styles.coinContainer}>
            <ImageBackground
              source={require("../../../assets/shop/coin.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text style={{ fontWeight: 700 }}>{user.profile.money}</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <Tab
            value={index}
            onChange={(e) => setIndex(e)}
            indicatorStyle={styles.tabUnderline}
          >
            <Tab.Item title="All" titleStyle={styles.tabItem} />
            <Tab.Item title="Coin" titleStyle={styles.tabItem} />
          </Tab>
        </View>
      </View>

      <TabView value={index} onChange={setIndex} disableTransition={true}>
        <TabView.Item style={styles.tabView}>
          <TabAll />
        </TabView.Item>
        <TabView.Item style={styles.tabView}>
          <TabCoin />
        </TabView.Item>
      </TabView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fbf5e5",
    paddingTop: 20,
    flex: 1,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    marginVertical: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#474838",
  },
  coinContainer: {
    padding: 10,
    borderRadius: 100,
    position: "absolute",
    right: 10,
    top: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    gap: 5,
    backgroundColor: "#ffecb3",
    alignItems: "center",
  },
  tabContainer: {
    width: "100%",
  },
  tabUnderline: {
    backgroundColor: "#50AA75",
    height: 1,
  },
  tabItem: {
    color: "#50AA75",
  },
  tabView: {
    width: "100%",
    height: "100%",
  },
});
