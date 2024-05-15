import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Card } from '@rneui/themed';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Chart() {
    const chartConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: (opacity = 1) => `rgba(18, 155, 18, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        barPercentage: 0.5,
        decimalPlaces: 0,
    };

    const data = {
        labels: ["1/3", "6/3", "11/3", "16/3", "21/3", "26/3", "31/3"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43, 20],
                strokeWidth: 2
            }
        ],
    };

    return (
        <View style={styles.container}>
            <Card containerStyle={styles.card}>
                <Card.Title style={styles.title}>Status Flow</Card.Title>
                <View style={styles.dividerContainer}>
                    <Card.Divider style={styles.divider} />
                </View>
                <LineChart
                    data={data}
                    width={screenWidth - 35}
                    height={screenHeight / 4}
                    chartConfig={chartConfig}
                    bezier
                />
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        marginTop: -100,
    },
    card: {
        paddingLeft: 0,
        paddingRight: 0,
        borderRadius: 20,
        paddingTop: 20,
        paddingBottom: 30
    },
    dividerContainer: {
        width: "100%",
        alignItems: 'center',
    },
    divider: {
        width: "85%",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#474838",
    }
});

