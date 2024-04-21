import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Card } from "@rneui/themed";
import { StyleSheet, View } from 'react-native';


const screenWidth = Dimensions.get("window").width;

export default function Chart() {
    const chartConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: (opacity = 0) => `rgba(18, 155, 18, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        barPercentage: 0.5,
        decimalPlaces: 0,
    };

    const data = {
        labels: ["1/3", "6/3", "11/3", "16/3", "21/3", "26/3", "31/3"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43, 20],
                strokeWidth: 2 // optional
            }
        ],
    };
    return (
        <View style={{ marginTop: -100, flex: 2 }}>
            <Card containerStyle={{ paddingLeft: 0, paddingRight: 0, borderRadius: 20 }}>
                <Card.Title>Status Flow</Card.Title>
                <View style={{ width: "100%", alignItems: 'center' }}>
                    <Card.Divider style={{ width: "85%" }} />
                </View>
                <LineChart
                    data={data}
                    width={screenWidth - 35}
                    height={170}
                    chartConfig={chartConfig}
                    bezier
                />
            </Card>
        </View>
    );
}