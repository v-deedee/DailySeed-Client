import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function CustomImagePicker({ image, setImage, setImageFile, phase }) {
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });


        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setImageFile(result.assets[0]);
        }
    };

    return (
        <View style={styles.container}>
            {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
            {image ? (
                <View style={{ position: "relative" }}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <TouchableOpacity
                        style={{ position: "absolute", right: 10, top: 10 }}
                        onPress={() => {
                            setImage(null);
                        }}
                    >
                        <AntDesign
                            name="closecircle"
                            size={25}
                            color="#888"
                            style={{ backgroundColor: "#fff", borderRadius: 999 }}
                        />
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 100,
                        height: 100,
                        backgroundColor: "#f9f9f9",
                        borderWidth: 2,
                        borderColor: "#eee",
                        borderRadius: 10,
                    }}
                    onPress={pickImage}
                >
                    <View style={{ alignItems: "center" }}>
                        <MaterialIcons name="add-a-photo" size={40} color="#ccc" />
                        <Text style={{ color: "#aaa", fontWeight: "600" }}>
                            {phase}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#eee",
    },
});
