import { StyleSheet, Image, View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useEffect, useState } from "react";
import { Button } from "@rneui/themed";
import { getCurrentDate } from "../../components/Calendar";
import { useRoute } from "@react-navigation/native";

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
      <Text style={styles.date}>{currentDate}</Text>
      <AnimatedCircularProgress
        size={200}
        width={15}
        fill={progress}
        lineCap="round"
        rotation={0}
        tintColor="#184C45"
        backgroundColor="#D8E1D0"
      >
        {() => (
          <View style={styles.treeBox}>
            <Image
              source={require("../../../assets/seed/tree1-small.png")}
              style={styles.tree}
            />
          </View>
        )}
      </AnimatedCircularProgress>

      <Button
        title={"Record your day"}
        containerStyle={{
          width: 200,
          margin: 20,
        }}
        buttonStyle={[styles.button, styles.shadowProp]}
        radius={50}
        color={"#184D47"}
        onPress={openRecord}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF5E5",
    alignItems: "center",
    justifyContent: "center",
  },
  date: {
    marginVertical: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#474838",
  },
  treeBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
    backgroundColor: "#EDEBE4",
    borderRadius: 9999,
  },
  tree: {
    width: 100,
    height: 100,
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
