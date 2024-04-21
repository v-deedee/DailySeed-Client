import { StyleSheet, Image, View, Text, StatusBar } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useEffect, useState } from "react";
import { Button } from "@rneui/themed";
import { getCurrentDate } from "../../components/Calendar";
import { useRoute } from "@react-navigation/native";
import UserSingleton from "../../services/user-singleton";

export default function HomeScreen({ navigation }) {
  const route = useRoute();
  const value = route.params?.progress;
  console.log(value);

  const [progress, setProgress] = useState(10);

  useEffect(() => {
    if (value != undefined) {
      setProgress(progress + value);
    } else {
      console.log("false");
    }
  }, [value]);

  const openRecord = () => {
    navigation.navigate("Record");
  };

  const currentDate = getCurrentDate();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" />

      {/* Head: name + coin */}
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#deffff",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
            flexDirection: "row",
            gap: 5,
          }}
        >
          <Image
            source={require("../../../assets/diary.png")}
            style={{ width: 25, height: 25 }}
          />
          <Text style={{ fontSize: 16, fontWeight: 700 }}>
            {`${UserSingleton.getInstance().getUserName()}'s diary`}
          </Text>
        </View>
        <View style={styles.coinContainer}>
          <Image
            source={require("../../../assets/shop/coin.png")}
            style={{ width: 25, height: 25 }}
          />
          <Text style={{ fontWeight: 700 }}>15</Text>
        </View>
      </View>

      {/* Date */}
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#787878", fontWeight: 700 }}>{currentDate}</Text>
      </View>

      {/* Main */}
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        {/* Instruction */}
        <View style={{ alignItems: "center" }}>
          <Text style={styles.instruction}>
            Record your day and build up garden !!!
          </Text>
        </View>

        <View
          style={{
            marginVertical: 10,
            marginRight: 15,
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Image
            source={require("../../../assets/water.png")}
            style={{ width: 25, height: 25 }}
          />
          <Text style={{ fontWeight: 700 }}>{progress}%</Text>
        </View>
        <AnimatedCircularProgress
          size={200}
          width={15}
          fill={progress}
          lineCap="round"
          rotation={0}
          tintColor="#184C45"
          backgroundColor="#D8E1D0"
        >
          {() => {
            if (progress <= 25)
              return (
                <View style={styles.treeBox}>
                  <Image
                    source={require("../../../assets/garden/Tree3/tree3-phase1.png")}
                    style={{ width: 100, height: 70 }}
                  />
                </View>
              );
            else if (progress <= 50)
              return (
                <View style={styles.treeBox}>
                  <Image
                    source={require("../../../assets/garden/Tree3/tree3-phase2.png")}
                    style={{ width: 80, height: 110 }}
                  />
                </View>
              );
            else if (progress <= 75)
              return (
                <View style={styles.treeBox}>
                  <Image
                    source={require("../../../assets/garden/Tree3/tree3-phase3.png")}
                    style={{ width: 80, height: 110 }}
                  />
                </View>
              );
            else
              return (
                <View style={styles.treeBox}>
                  <Image
                    source={require("../../../assets/garden/Tree3/tree3-phase4.png")}
                    style={{ width: 80, height: 125 }}
                  />
                </View>
              );
          }}
        </AnimatedCircularProgress>

        <Button
          title={"Start"}
          titleStyle={{ fontWeight: 700 }}
          containerStyle={{
            width: 200,
            margin: 20,
            marginBottom: 100,
          }}
          buttonStyle={[styles.button, styles.shadowProp]}
          style={styles.shadowProp}
          radius={50}
          color={"#184D47"}
          onPress={openRecord}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF5E5",
  },
  coinContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    flexDirection: "row",
    gap: 5,
    backgroundColor: "#ffecb3",
    alignItems: "center",
  },
  instruction: {
    width: 200,
    marginVertical: 20,
    fontSize: 20,
    // color: "#474838",
    textAlign: "center",
    lineHeight: 30,
  },
  treeBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
    backgroundColor: "#C8D5B9",
    borderRadius: 9999,
  },
  button: {
    padding: 20,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
});
