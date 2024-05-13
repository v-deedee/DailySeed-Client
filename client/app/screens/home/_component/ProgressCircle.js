import {
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { trees } from "../../../utils/utils";

export default function ProgressCircle({ progress, treeType, selectTree }) {
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
        if (!treeType) {
          return (
            <TouchableOpacity onPress={selectTree}>
              <Image
                source={require("../../../../assets/theme/background2.png")}
                style={{
                  width: 180,
                  height: 170,
                  borderRadius: 999,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </TouchableOpacity>
          );
        } else {
          return (
            <ImageBackground
              source={require("../../../../assets/theme/background2.png")}
              style={{
                width: 180,
                height: 170,
                borderRadius: 999,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {(function () {
                if (progress <= 25)
                  return (
                    <Image
                      source={trees[treeType - 1][0]}
                      style={{ width: 85, height: 85, marginTop: 20 }}
                    />
                  );
                else if (progress <= 50)
                  return (
                    <Image
                      source={trees[treeType - 1][1]}
                      style={{ width: 80, height: 102 }}
                    />
                  );
                else if (progress <= 75)
                  return (
                    <Image
                      source={trees[treeType - 1][2]}
                      style={{ width: 110, height: 110 }}
                    />
                  );
                else
                  return (
                    <Image
                      source={trees[treeType - 1][3]}
                      style={{ width: 120, height: 120 }}
                    />
                  );
              })()}
            </ImageBackground>
          );
        }
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
