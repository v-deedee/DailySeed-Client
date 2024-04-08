import { View, Text, StyleSheet, ScrollView } from "react-native";
import ShopCard from "./ShopCard";

export default function TabAll() {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Popular</Text>
                <ShopCard />
                <ShopCard />
                <ShopCard />
                <ShopCard />
                <ShopCard />
            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#474838",
        paddingTop: 10
    },
});
