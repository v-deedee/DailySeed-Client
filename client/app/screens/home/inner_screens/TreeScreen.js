import { StyleSheet, Image, View, Text } from "react-native";
import { Button } from "@rneui/themed";
import ProgressCircle from "../_component/ProgressCircle";

export default function TreeScreen({
  openRecord,
  progress,
  treeType,
  toggleSelectTreeModal,
}) {
  return (
    <>
      {/* Main */}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          marginBottom: 100,
        }}
      >
        {/* Instruction */}
        <View style={{ alignItems: "center" }}>
          <Text style={styles.instruction}>
            Record your day and build up garden !!!
          </Text>
        </View>

        {/* Progress: % */}
        <View style={styles.percentProgressContainer}>
          <Image
            source={require("../../../../assets/home/water.png")}
            style={{ width: 25, height: 25 }}
          />
          <Text style={{ fontWeight: 700 }}>{progress}%</Text>
        </View>

        {/* Progress: Circle */}
        <ProgressCircle
          progress={progress}
          treeType={treeType}
          selectTree={toggleSelectTreeModal}
        />

        {/* Record button */}
        <Button
          title={"Start"}
          titleStyle={{ fontWeight: 700 }}
          containerStyle={{ width: 200, margin: 20 }}
          buttonStyle={{ padding: 20 }}
          style={{}}
          radius={50}
          color={"#184D47"}
          onPress={treeType ? openRecord : toggleSelectTreeModal}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  instruction: {
    width: 200,
    marginVertical: 20,
    fontSize: 20,
    color: "#474838",
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
