import { StyleSheet, Image, View, Text, StatusBar } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";

import SelectTreeModal from "./_component/modals/SelectTreeModal";
import { UserContext } from "../../contexts/user.context";
import { SeedContext } from "../../contexts/seed.context";
import { TreeContext } from "../../contexts/tree.context";
import { findTree } from "../../services/tree.service";
import { HabitContext } from "../../contexts/habit.context";
import { listTrackingHabits } from "../../services/habit.service";
import { getCurrentDate } from "../../utils/utils";
import Tab from "./inner_screens/Tab";

export default function HomeScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const route = useRoute();
  const value = route.params?.progress;
  const { tree, setTree } = useContext(TreeContext);
  const { habits, fetchHabits } = useContext(HabitContext);

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

  useEffect(() => {
    console.log(tree,1234132)
    if(tree) {
      setOpenSelectTreeModal(false);        
    }

  }, [tree])

  useEffect(() => {
    async function fetchDataTree() {
        const today = new Date();
        console.log(today);
        
        // Chuyển đổi đối tượng Date thành chuỗi định dạng ISO (YYYY-MM-DD)
        const dateString = today.toISOString().split('T')[0];
        
        // Phân tích cú pháp chuỗi để lấy lại ngày, tháng và năm
        const [year, month, day] = dateString.split('-').map(Number);
        const treeData = await findTree(day, month, year);
        if(treeData) {

            const modifiedSeed = {
              ...treeData.seed,
              asset: treeData.seed.asset.split('|'),
            };
            const modifiedTree = {
              ...treeData,
              seed: modifiedSeed,
            };
            console.log(modifiedTree)
            setTree(modifiedTree);
        }       
    }

    fetchDataTree();
  }, [user])

  useEffect(() => {
    async function fetchData() {
      if(tree) {
        fetchHabits(tree.tree.id);
      }
    }
    fetchData();
  }, [tree]);

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
            {`${user.user.username}'s diary`}
          </Text>
        </View>
        <View style={styles.coinContainer}>
          <Image
            source={require("../../../assets/shop/coin.png")}
            style={{ width: 25, height: 25 }}
          />
          <Text style={{ fontWeight: 700 }}>{user.profile.money}</Text>
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
        openRecord={openRecord}
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
