import { StyleSheet, Image, View, Text, StatusBar } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Button } from "@rneui/themed";
import { useRoute } from "@react-navigation/native";
import { getCurrentDate } from "../../components/Calendar";
import ProgressCircle from "./_component/ProgressCircle";
import SelectTreeModal from "./_component/modals/SelectTreeModal";
import { UserContext } from "../../contexts/user.context";
import { SeedContext } from "../../contexts/seed.context";

export default function HomeScreen({ navigation }) {
  const {user} = useContext(UserContext);
  const route = useRoute();
  const value = route.params?.progress;
  const { seeds } = useContext(SeedContext);

  useEffect(() => {
    console.log(seeds);
  }, [seeds])

  const [openSelectTreeModal, setOpenSelectTreeModal] = useState(true);

  const [treeType, setTreeType] = useState(1);

  const [progress, setProgress] = useState(0);

  const currentDate = getCurrentDate();

  const toggleSelectTreeModal = () => {
    setOpenSelectTreeModal(!openSelectTreeModal);
  };

  const openRecord = () => {
    navigation.navigate("Record");
  };

  useEffect(() => {
    if (value != undefined) {
      setProgress(value);
    } else {
      console.log("Value is undefined");
    }
  }, [value]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" />

      {/* Head: name + coin */}
      <View style={styles.header}>
        <View style={styles.userNameContainer}>
          <Image
            source={require("../../../assets/home/diary.png")}
            style={{ width: 25, height: 25 }}
          />
          <Text style={{ fontSize: 16, fontWeight: 700 }}>
            {`${user.name}'s diary`}
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

        {/* Progress: % */}
        <View style={styles.percentProgressContainer}>
          <Image
            source={require("../../../assets/home/water.png")}
            style={{ width: 25, height: 25 }}
          />
          <Text style={{ fontWeight: 700 }}>{progress}%</Text>
        </View>

        {/* Progress: Circle */}
        <ProgressCircle progress={progress} treeType={treeType} />

        {/* Record button */}
        <Button
          title={"Start"}
          titleStyle={{ fontWeight: 700 }}
          containerStyle={{
            width: 200,
            margin: 20,
            marginBottom: 100,
          }}
          buttonStyle={{ padding: 20 }}
          style={{}}
          radius={50}
          color={"#184D47"}
          onPress={openRecord}
        />
      </View>

      {/* Select tree modal */}
      <SelectTreeModal
        isOpen={openSelectTreeModal}
        toggle={toggleSelectTreeModal}
        treeType={treeType}
        setTreeType={setTreeType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF5E5",
  },
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userNameContainer: {
    backgroundColor: "#deffff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    gap: 5,
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
  percentProgressContainer: {
    marginVertical: 10,
    marginRight: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
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
});
