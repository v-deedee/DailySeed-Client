import { StyleSheet, Image, View, Text, StatusBar } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";

import SelectTreeModal from "./_component/modals/SelectTreeModal";
import { UserContext } from "../../contexts/user.context";
import { getCurrentDate } from "../../utils/utils";
import Tab from "./inner_screens/Tab";

export default function HomeScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const route = useRoute();
  const value = route.params?.progress;

  const [progress, setProgress] = useState(0);

  const [treeType, setTreeType] = useState(null);

  const [openSelectTreeModal, setOpenSelectTreeModal] = useState(false);

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
            {/* {`${user.name}'s diary`} */}
            Diary
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
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          margin: 20,
        }}
      >
        <Text style={{ color: "#787878", fontWeight: 700 }}>
          {getCurrentDate()}
        </Text>
      </View>

      <Tab
        openRecord={openRecord}
        progress={progress}
        treeType={treeType}
        toggleSelectTreeModal={toggleSelectTreeModal}
      />

      {/* Select tree modal */}
      <SelectTreeModal
        isOpen={openSelectTreeModal}
        toggle={toggleSelectTreeModal}
        treeType={treeType || 1}
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
    paddingBottom: 0,
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
});
