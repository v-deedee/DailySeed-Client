import React from 'react';
import { StyleSheet, View, Text, Dimensions, ActivityIndicator } from 'react-native';
import { Card } from '@rneui/themed';
import { LineChart } from "react-native-gifted-charts";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


const customDataPoint = () => {
    return (
        <View
            style={{
                width: 13,
                height: 13,
                backgroundColor: 'white',
                borderWidth: 4,
                borderRadius: 10,
                borderColor: '#50AA75',
            }}
        />
    );
};

const data = [5, 90, 29, 72, 94, 45, 67, 51, 92, 5, 90, 29, 72, 94, 45, 67, 51, 92, 5, 90, 29, 72, 94, 45, 67, 51, 92, 5, 90, 29, 72, 94, 45, 67, 51, 92]

export default function Chart({ chartData, loading }) {
    return (
        <View style={styles.container}>
            <Card containerStyle={styles.card}>
                <Card.Title style={styles.title}>Status Flow</Card.Title>
                {loading ? (
                    <View style={{ width: screenWidth - 80, height: screenHeight / 4, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator />
                    </View>
                ) : (
                    <View>
                        <LineChart
                            areaChart
                            onlyPositive
                            curved
                            // initialSpacing={10}
                            maxValue={100}
                            rulesType="solid"
                            noOfSections={5}
                            xAxisColor="#50AA75"
                            yAxisColor="#50AA75"
                            color="#0BA5A4"
                            startFillColor="#50AA75"
                            startOpacity={0.7}
                            endFillColor="rgb(220, 239, 228)"
                            endOpacity={0.3}
                            data={chartData.data.map((item, index) => {
                                const splittedDate = chartData.date[index].split('-');
                                const day = splittedDate[2];
                                return { value: item, label: day };
                            })}
                            xAxisLabelsHeight={20}
                            width={screenWidth - 120}
                            height={screenHeight / 4}
                            customDataPoint={customDataPoint}
                        />
                    </View>
                )
                }
            </Card >
        </View >

    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: -100,
        marginBottom: 10
    },
    card: {
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        paddingTop: 20,
        paddingBottom: 30
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#474838",
    }
});
