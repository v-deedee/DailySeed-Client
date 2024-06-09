import {
  View,
  useWindowDimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useState } from "react";
import { TabView, SceneMap } from "react-native-tab-view";

import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import TreeScreen from "./TreeScreen";
import NoteScreen from "./NoteScreen";

export default function Tab({
  openRecord,
  progress,
  toggleSelectTreeModal,
}) {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "tree", title: "First" },
    { key: "image", title: "Second" },
  ]);

  const renderScene = SceneMap({
    tree: () =>
      TreeScreen({
        openRecord: openRecord,
        progress: progress,
        toggleSelectTreeModal: toggleSelectTreeModal,
      }),
    image: NoteScreen,
  });

  const _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 90,
            margin: 5,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              paddingVertical: 5,
              paddingHorizontal: 16,
              borderRightWidth: 2,
              borderColor: "#aaa",
            }}
            onPress={() => setIndex(inputRange[0])}
          >
            <Animated.Text style={index !== inputRange[0] && { opacity: 0.3 }}>
              <MaterialCommunityIcons
                name="watering-can"
                size={20}
                color="#333"
              />
            </Animated.Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
              paddingVertical: 5,
              paddingHorizontal: 16,
            }}
            onPress={() => setIndex(inputRange[1])}
          >
            <Animated.Text style={index !== inputRange[1] && { opacity: 0.3 }}>
              <FontAwesome6 name="image" size={16} color="#333" />
            </Animated.Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={_renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
