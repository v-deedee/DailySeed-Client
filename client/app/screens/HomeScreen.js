import { StyleSheet, Image, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useState } from "react";
import { Button, Dialog } from "@rneui/themed";

export default function HomeScreen() {
  const [progress, setProgress] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Watering"
        onPress={() => {
          setProgress((prev) => prev + 10);
        }}
      />
      <Button
        title={"Open modal"}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={toggleModal}
      />
      <Dialog isVisible={openModal} onBackdropPress={toggleModal}>
        <Dialog.Title title="Select Preference" />

        <Dialog.Actions>
          <Dialog.Button title="CONFIRM" onPress={toggleModal} />
          <Dialog.Button title="CANCEL" onPress={toggleModal} />
        </Dialog.Actions>
      </Dialog>
      <AnimatedCircularProgress
        size={200}
        width={15}
        fill={progress}
        lineCap="round"
        rotation={0}
        tintColor="#319684"
        backgroundColor="#B4DCAA"
      >
        {() => (
          <View style={styles.treeBox}>
            <Image
              source={require("../../assets/seed/tree1-small.png")}
              style={styles.tree}
            />
          </View>
        )}
      </AnimatedCircularProgress>
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
  treeBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
    backgroundColor: "#EDEBE4",
    // borderWidth: 15,
    // borderColor: "#8FC300",
    borderRadius: 9999,
  },
  tree: {
    width: 100,
    height: 100,
  },
});
