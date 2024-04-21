import { StyleSheet, Image, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { trees } from "../../../utils/utils";

export default function ProgressCircle({ progress, treeType }) {
  return (
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
                source={trees[treeType - 1][0]}
                style={{ width: 100, height: 100 }}
              />
            </View>
          );
        else if (progress <= 50)
          return (
            <View style={styles.treeBox}>
              <Image
                source={trees[treeType - 1][1]}
                style={{ width: 85, height: 109 }}
              />
            </View>
          );
        else if (progress <= 75)
          return (
            <View style={styles.treeBox}>
              <Image
                source={trees[treeType - 1][2]}
                style={{ width: 120, height: 120 }}
              />
            </View>
          );
        else
          return (
            <View style={styles.treeBox}>
              <Image
                source={trees[treeType - 1][3]}
                style={{ width: 130, height: 130 }}
              />
            </View>
          );
      }}
    </AnimatedCircularProgress>
  );
}

const styles = StyleSheet.create({
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
