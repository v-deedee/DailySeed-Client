import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { UserContext } from "../../contexts/user.context";

import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { statistic } from "../../services/user.service";
import { CLOUDINARY_BASE_URL } from "../../utils/constants/cloudinary.constants";

const ProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [statisticData, setStatisticData] = useState();

  const { user } = useContext(UserContext);

  useEffect(() => {
    setUsername(user.user.username);
    setEmail(user.profile.email);
    setUserId(user.profile.id);
    try {
      const fetchData = async () => {
        const statisticData = await statistic();
        setStatisticData(statisticData);
      }
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [user]);

  return (
    <ScrollView style={styles.container}>
      {/* Login information */}
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

      {/* My records */}
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
            {statisticData && <Text style={{ fontWeight: "bold" }}>{statisticData.countTree}</Text>}
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
            {statisticData && <Text style={{ fontWeight: "bold" }}>{statisticData.countPicture}</Text>}
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../../assets/profile/photos.png")}
              />
            </View>
          </View>
        </View>
      </View>

      {/* My purchases */}
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
            {statisticData && <Text style={{ fontWeight: "bold" }}>{statisticData.countTheme.length}</Text>}
            {statisticData && statisticData.countTheme.length > 0 && (
              <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 10 }}>
                {statisticData.countTheme.map((theme, index) => (
                  <Image
                    key={index}
                    style={{ width: 40, height: 40 }}
                    source={{ uri: `${CLOUDINARY_BASE_URL}${theme.split("|")[0]}` }}

                  />
                ))}
              </View>
            )}
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
            {statisticData && <Text style={{ fontWeight: "bold" }}>{statisticData.countMoney}</Text>}
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../../assets/shop/coin.png")}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
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
