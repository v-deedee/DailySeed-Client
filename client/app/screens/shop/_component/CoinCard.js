import { Button, Card } from '@rneui/themed';
import { View, Text, StyleSheet, Image } from "react-native";

export default function CoinCard({ value, vnd }) {
    const coinImage = value > 200 ? require('../../../../assets/shop/money-bag.png') : require('../../../../assets/shop/coin.png');
    return (
        <Card containerStyle={styles.cardContainer}>
            <View style={styles.infoContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={coinImage} style={{ width: 40, height: 40 }} />
                    <Text style={styles.description}>{value}</Text>
                </View>
                <Button
                    title={vnd}
                    color="#50AA75"
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonTitle}
                    onPress={() => console.log('aye')}
                />
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        padding: 0,
        margin: 0,
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        borderWidth: 0,
        shadowColor: 'rgba(0,0,0, 0.0)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#474838",
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    description: {
        marginLeft: 10
    },

    buttonTitle: {
        color: 'white'
    },
    button: {
        borderRadius: 100,
        borderColor: '#E8E8E8',
        borderWidth: 0,
        shadowColor: 'rgba(0,0,0, 0.0)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    }
})