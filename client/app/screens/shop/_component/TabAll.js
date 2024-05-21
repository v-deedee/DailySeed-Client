import { View, Text, StyleSheet, ScrollView } from "react-native";
import ShopCard from "./ShopCard";
import { useEffect, useState } from "react";
import { listShopSeeds } from "../../../services/seed.service";

export default function TabAll() {
    const [shopData, setShopData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listShopSeeds();
                setShopData(response);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Popular</Text>
                {shopData.map(item => (
                    <ShopCard
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        owned={item.owned}
                        assets={item.asset.split('|')}
                    />
                ))}
            </ScrollView>
        </View>
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
