import { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { UserContext } from "../../contexts/user.context";

import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const ProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");

  const { user } = useContext(UserContext);

  useEffect(() => {
    setUsername(user.user.username);
    setEmail(user.profile.email);
    setUserId(user.profile.id);
  }, [user]);

  return (
    <View style={styles.container}>
      {/* <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 20,
          paddingVertical: 10,
          borderBottomWidth: 1.5,
          borderBottomColor: "#efefef",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
          <FontAwesome6 name="arrow-left-long" color={"#333"} size={20} />
        </TouchableOpacity>

        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#474838" }}>
          My info
        </Text>

        <TouchableOpacity disabled>
          <FontAwesome6 name="arrow-left-long" color={"#fff"} size={20} />
        </TouchableOpacity>
      </View> */}

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: 600, color: "#888" }}>
          Login information
        </Text>
        <View
          style={{
            backgroundColor: "#f8f8f8",
            padding: 20,
            marginTop: 20,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 20,
            }}
          >
            <View style={{ gap: 10 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <FontAwesome6 name="user-large" size={12} color="#b2b2b2" />
                <Text style={{ fontSize: 14, color: "#888" }}>Username</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Text style={{ fontSize: 16 }}>{username}</Text>
                <Text style={{ fontSize: 16, color: "#aaa" }}>#{userId}</Text>
              </View>
            </View>
            {/* <TouchableOpacity>
              <Text style={{ fontSize: 14, color: "#888" }}>Edit</Text>
            </TouchableOpacity> */}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 20,
            }}
          >
            <View style={{ gap: 10 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <FontAwesome6 name="key" size={12} color="#b2b2b2" />
                <Text style={{ fontSize: 14, color: "#888" }}>Password</Text>
              </View>
              <Text style={{ fontSize: 16 }}>********</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Change_Password")}
            >
              <Text style={{ fontSize: 14, color: "#888" }}>
                Change password
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <View style={{ gap: 10 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <FontAwesome name="google" size={12} color="#b2b2b2" />
                <Text style={{ fontSize: 14, color: "#888" }}>
                  Connected account
                </Text>
              </View>
              <Text style={{ fontSize: 16 }}>{email}</Text>
            </View>
            {/* <TouchableOpacity>
              <Text style={{ fontSize: 14, color: "#888" }}>Edit</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: 600, color: "#888" }}>
          My records
        </Text>

        <View style={{ flexDirection: "row", gap: 15 }}>
          <View
            style={{
              backgroundColor: "#f8f8f8",
              padding: 20,
              marginTop: 20,
              borderRadius: 10,
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 14, color: "#888" }}>Recorded days</Text>
            <Text style={{ fontWeight: "bold" }}>5</Text>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../../assets/profile/watering.png")}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#f8f8f8",
              padding: 20,
              marginTop: 20,
              borderRadius: 10,
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 14, color: "#888" }}>Photos</Text>
            <Text style={{ fontWeight: "bold" }}>2</Text>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../../assets/profile/photos.png")}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: 600, color: "#888" }}>
          My purchases
        </Text>

        <View style={{ flexDirection: "row", gap: 15 }}>
          <View
            style={{
              backgroundColor: "#f8f8f8",
              padding: 20,
              paddingVertical: 15,
              marginTop: 20,
              borderRadius: 10,
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 14, color: "#888" }}>Themes</Text>
            <Text style={{ fontWeight: "bold" }}>2</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 10,
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../../assets/garden/Tree3/tree3-phase4.png")}
              />
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../../assets/garden/Tree2/tree2-phase4.png")}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#f8f8f8",
              padding: 20,
              paddingVertical: 15,
              marginTop: 20,
              borderRadius: 10,
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 14, color: "#888" }}>Coins</Text>
            <Text style={{ fontWeight: "bold" }}>0</Text>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../../assets/shop/coin.png")}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: "#fff",
  },
});

export default ProfileScreen;
