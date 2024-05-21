import { useState } from "react";
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

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";

export default function NoteScreen() {
  const [note, setNote] = useState("");

  const [image, setImage] = useState(null);

  const [showPost, setShowPost] = useState(false);

  const [timestamp, setTimestamp] = useState(null);

  const post = () => {
    if (note.length > 0 && image) {
      setShowPost(true);
    }
    setTimestamp(new Date());
  };

  const deletePost = () => {
    setShowPost(false);
    setNote("");
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {!showPost ? (
          <View
            style={{
              // width: "90%",
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
            <ImagePicker image={image} setImage={setImage} />

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
