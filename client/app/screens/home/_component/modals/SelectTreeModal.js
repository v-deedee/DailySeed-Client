import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Dialog, CheckBox } from "@rneui/themed";
import { useContext, useEffect, useState } from "react";
import { SeedContext } from "../../../../contexts/seed.context";
import { CLOUDINARY_BASE_URL } from "../../../../utils/constants/cloudinary.constants";
import { createTree } from "../../../../services/tree.service";
import { TreeContext } from "../../../../contexts/tree.context";
import { HabitContext } from "../../../../contexts/habit.context";

export default function SelectTreeModal({
  isOpen,
  toggle,
  treeType,
  setTreeType,
  openRecord,
}) {
  const { seeds } = useContext(SeedContext);
  const { setTree } = useContext(TreeContext);
  const { fetchHabits } = useContext(HabitContext);
  const [selectedSeed, setSelectedSeed] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!seeds) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  useEffect(() => {
    if (seeds) {
      setSelectedSeed(seeds[0]);
    }
  }, [seeds]);

  const handleSeedSelect = (seed) => {
    setSelectedSeed(seed);
  };

  const handleDone = async () => {
    setIsLoading(true);
    try {
      const newTree = await createTree(selectedSeed.id);
      console.log("Selected tree: ", newTree);
      if (newTree) {
        setTree(newTree);
        fetchHabits(newTree.tree.id);
        // console.log(112341234)
        openRecord();
      }
    } catch (error) {
      console.error("Error creating tree:", error);
    }
    setIsLoading(false);
  };

  return (
    <Dialog
      isVisible={isOpen}
      overlayStyle={{ borderRadius: 30, width: "90%" }}
      style={{ width: "100%" }}
    >
      <View style={{ alignItems: "center", paddingBottom: 20 }}>
        <Dialog.Title
          title="Which kind of tree do you want to grow?"
          titleStyle={{ textAlign: "center", width: "80%", color: "#474838" }}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
        }}
      >
        {seeds.map((seed, index) => (
          <TouchableOpacity
            key={index}
            style={
              treeType === index + 1
                ? styles.modalOptionActive
                : styles.modalOption
            }
            onPress={() => handleSeedSelect(seed)}
          >
            <Image
              source={{ uri: `${CLOUDINARY_BASE_URL}${seed.assets[0]}` }}
              style={{ width: 80, height: 80 }}
            />
            <CheckBox
              checked={treeType === index + 1}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.modalButtonGroup}>
        <TouchableOpacity
          style={[styles.modalButton, { backgroundColor: "#50AA75" }]}
          onPress={handleDone}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={{ fontWeight: "bold", color: "#fff" }}>Done</Text>
          )}
        </TouchableOpacity>
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  modalOption: {
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  modalOptionActive: {
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#2089DC",
  },
  modalButtonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
  },
  modalButton: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
  },
});
