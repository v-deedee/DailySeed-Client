import { useContext, useEffect, useRef, useState } from "react";
import * as FileSystem from "expo-file-system";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";

import CustomImagePicker from "../_component/CustomImagePicker";
import { CLOUDINARY_BASE_URL } from ".../../../../utils/constants/cloudinary.constants";
import { updateTreeNote } from ".../../../../services/tree.service";
import { UserContext } from "../../../../contexts/user.context";
import { TreeContext } from "../../../../contexts/tree.context";

export default function NoteScreen() {
  const { tree, setTree } = useContext(TreeContext);
  const [note, setNote] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(null);

  const [showPost, setShowPost] = useState(false);

  const [timestamp, setTimestamp] = useState(null);

  const { user } = useContext(UserContext);

  const postShareRef = useRef();

  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    if (tree?.tree?.note) {
      setNote(tree?.tree?.note || "");
    }
    if (tree?.tree?.picture) {
      setImage(`${CLOUDINARY_BASE_URL}${tree.tree.picture}`);
    }
    if (tree?.tree?.picture) {
      setShowPost(true);
      setTimestamp(new Date());
    }
  }, [tree, setNote]);

  const post = async () => {
    if (note.length > 0 && image) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("note", note);

        const file = {
          uri: imageFile.uri,
          type: imageFile.mimeType,
          name:
            imageFile.fileName || `filename.${imageFile.uri.split(".").pop()}`,
        };
        formData.append("picture", file);
        const updatedTree = await updateTreeNote(tree.tree.id, formData);
        console.log("Updated tree: ", updatedTree);

        setTimestamp(new Date());
        setShowPost(true);
      } catch (error) {
        Alert.alert("Failed to update tree note");
        console.error("Failed to update tree note:", error);
      }
      setIsLoading(false);
    } else {
      Alert.alert("Please fill in all the fields.");
    }
  };

  const deletePost = async () => {
    setShowPost(false);
    setNote("");
    setImage(null);
    const newTree = [
      {
        ...tree.tree,
        note: null,
        picture: null,
      },
    ];

    // Cập nhật tree với note và image mới (null)
    // const updatedTree = await updateTree({
    //   ...tree.tree,
    //   note: null,
    //   picture: null,
    // });

    setTree({ ...tree, tree: updatedTree });
  };

  const sharePost = async () => {
    try {
      const sharedImageUri = await captureRef(postShareRef, {
        format: "png",
        quality: 1,
      });
      await Sharing.shareAsync(sharedImageUri);
    } catch (error) {
      console.log("Error in sharePost: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ width: "90%" }}>
        {!showPost ? (
          <View
            style={{
              padding: 30,
              paddingHorizontal: 30,
              backgroundColor: "#fff",
              borderRadius: 10,
            }}
          >
            <Text
              style={{ fontWeight: "600", marginBottom: 10, color: "#333" }}
            >
              Today's note
            </Text>

            <View
              style={{
                width: "100%",
                backgroundColor: "#f9f9f9",
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "#eee",
                justifyContent: "flex-start",
                // padding: 20,
                paddingHorizontal: 15,
                marginBottom: 15,
              }}
            >
              <TextInput
                multiline={true}
                numberOfLines={5}
                style={{ height: 100, fontWeight: "600", paddingVertical: 15 }}
                placeholder="Write here..."
                selectionColor="#aaa"
                value={note}
                onChangeText={(text) => setNote(text)}
              />
            </View>

            <Text
              style={{ fontWeight: "600", marginBottom: 10, color: "#333" }}
            >
              Today's picture
            </Text>
            <CustomImagePicker
              image={image}
              setImage={setImage}
              setImageFile={setImageFile}
            />

            <TouchableOpacity
              style={{
                backgroundColor: "#50AA75",
                marginTop: 30,
                padding: 12,
                alignItems: "center",
                borderRadius: 10,
              }}
              onPress={post}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={{ color: "#fff", fontWeight: "600" }}>Post</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                paddingVertical: 2,
              }}
            >
              <TouchableOpacity onPress={sharePost}>
                <MaterialIcons name="share" color="#aaa" size={20} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowPost(false)}>
                <Feather name="edit" color="#aaa" size={20} />
              </TouchableOpacity>
              <TouchableOpacity onPress={deletePost}>
                <MaterialIcons name="delete-outline" color="#aaa" size={25} />
              </TouchableOpacity>
            </View>

            <View
              ref={postShareRef}
              style={{
                width: "100%",
                padding: 20,
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  // alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <Image
                  source={{ uri: "https://picsum.photos/200" }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 999,
                    borderWidth: 2,
                    borderColor: "#ccc",
                  }}
                />
                <View
                  style={{
                    // height: "50",
                    justifyContent: "space-evenly",
                    gap: 5,
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    {user.user.username}
                  </Text>
                  <Text style={{ color: "#888" }}>
                    {timestamp.getHours().toString().padStart(2, "0") +
                      ":" +
                      timestamp.getMinutes().toString().padStart(2, "0")}
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: "400",
                    marginBottom: 10,
                    color: "#333",
                    fontSize: 16,
                  }}
                >
                  {note}
                </Text>

                <Image source={{ uri: image }} style={styles.image} />
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    aspectRatio: "1/1",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#eee",
  },
});
