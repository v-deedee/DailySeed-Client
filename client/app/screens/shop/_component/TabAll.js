import { View, Text, StyleSheet, ScrollView } from "react-native";
import ShopCard from "./ShopCard";
import { useEffect, useState } from "react";
import { listShopSeeds } from "../../../services/seed.service";
import { Skeleton } from '@rneui/themed';


export default function TabAll() {
    const [shopData, setShopData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const handleUpdateOwned = (id, owned) => {
        setShopData(prevData =>
            prevData.map(item =>
                item.id === id ? { ...item, owned: owned } : item
            )
        );
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listShopSeeds();
                setShopData(response);
                setLoading(false)
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
                {isLoading ? (
                    <>
                        <Skeleton
                            style={{ width: "100%", height: 150, borderRadius: 20, marginTop: 10 }}
                            baseColor="#E0E0E0"
                            highlightColor="#F0F0F0"
                        />

                        <Skeleton
                            style={{ width: "50%", height: 20, borderRadius: 8, marginTop: 5 }}
                            baseColor="#E0E0E0"
                            highlightColor="#F0F0F0"
                        />

                        <Skeleton
                            style={{ width: "100%", height: 150, borderRadius: 20, marginTop: 10 }}
                            baseColor="#E0E0E0"
                            highlightColor="#F0F0F0"
                        />

                        <Skeleton
                            style={{ width: "50%", height: 20, borderRadius: 8, marginTop: 5 }}
                            baseColor="#E0E0E0"
                            highlightColor="#F0F0F0"
                        />

                        <Skeleton
                            style={{ width: "100%", height: 150, borderRadius: 20, marginTop: 10 }}
                            baseColor="#E0E0E0"
                            highlightColor="#F0F0F0"
                        />

                        <Skeleton
                            style={{ width: "50%", height: 20, borderRadius: 8, marginTop: 5 }}
                            baseColor="#E0E0E0"
                            highlightColor="#F0F0F0"
                        />
                    </>
                ) : (
                    shopData.map(item => (
                        <ShopCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            initialOwned={item.owned}
                            assets={item.asset.split('|')}
                            onUpdateOwned={handleUpdateOwned}
                        />
                    ))
                )}
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
