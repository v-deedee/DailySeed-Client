import { useContext, useEffect, useState } from "react";
import * as FileSystem from 'expo-file-system';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import ImagePicker from "../_component/ImagePicker";
import { CLOUDINARY_BASE_URL } from "../../../utils/constants/cloudinary.constants";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import { TreeContext } from "../../../contexts/tree.context";
import { updateTreeNote } from "../../../services/tree.service";
export default function NoteScreen() {
  const {tree, setTree} = useContext(TreeContext);
  const [note, setNote] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(null);


  const [showPost, setShowPost] = useState(false);

  const [timestamp, setTimestamp] = useState(null);
  useEffect(() => {
    if(tree?.tree?.note) {
      setNote(tree?.tree?.note || "");
    }
    if(tree?.tree?.picture) {
      setImage(`${CLOUDINARY_BASE_URL}${tree.tree.picture}`);
    }
    if(tree?.tree?.picture) {
      setShowPost(true);
      setTimestamp(new Date());
  
    }

  }, [tree, setNote]);

  const post = async () => {
    if (note.length > 0 && image) {
      setShowPost(true);
      setTimestamp(new Date());
      try {
        const formData = new FormData();
        formData.append('note', note);
        
        const file = {
          uri: imageFile.uri,
          type: imageFile.type,
          name: imageFile.fileName || `filename.${imageFile.uri.split('.').pop()}`,
        };

        formData.append('picture', file);
    
    
        const updatedTree = await updateTreeNote(tree.tree.id, formData);
      } catch (error) {
        console.error('Failed to update tree note:', error);
      }
    }
}


  const deletePost = async () => {
    setShowPost(false);
    setNote("");
    setImage(null);
    const newTree = [{
      ...tree.tree,
      note: null,
      picture: null,
    }]

    console.log(newTree)
    // Cập nhật tree với note và image mới (null)
    const updatedTree = await updateTree({
      ...tree.tree,
      note: null,
      picture: null,
    });

    setTree({ ...tree, tree: updatedTree });
  };


  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "90%" }}>
        {!showPost ? (
          <View
            style={{
              // width: "100%",
              padding: 20,
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
                marginBottom: 30,
              }}
            >
              <TextInput
                multiline={true}
                numberOfLines={8}
                style={{ height: 150, fontWeight: "600" }}
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
            <ImagePicker image={image} setImage={setImage} setImageFile={setImageFile} />

            <TouchableOpacity
              style={{
                backgroundColor: "#50AA75",
                marginTop: 30,
                padding: 12,
                alignItems: "center",
                borderRadius: 10,
              }}
              onPress={post}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>Post</Text>
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
              <TouchableOpacity>
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
              style={{
                width: "100%",
                padding: 20,
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
            >
              <View>
                {/* {timestamp && (
                  <Text style={{ padding: 10 }}>
                    {timestamp.getHours()}:{timestamp.getMinutes()}
                  </Text>
                )} */}
                <Text
                  style={{
                    fontWeight: "600",
                    marginBottom: 10,
                    color: "#333",
                    paddingBottom: 5,
                    borderBottomWidth: 1,
                    borderColor: "#ddd",
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
    width: 300,
    height: 300,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#eee",
  },
});
