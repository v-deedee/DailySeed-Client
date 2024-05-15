import { Button, Card } from '@rneui/themed';
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";

export default function ShopCard() {
    return (
        <Card containerStyle={styles.cardContainer}>
            <Card.Image source={require("../../../../assets/theme/background.png")} stryle={styles.image} >
                <View style={styles.treeImgContainer}>
                    <View style={{ justifyContent: 'flex-end' }}>
                        {/* <TreePhase phase={1} style={{ width: 40, height: 40 }} /> */}
                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <Image source={require("../../../../assets/garden/Tree2/tree2-phase2.png")} style={{ width: 60, height: 70 }} />
                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <Image source={require("../../../../assets/garden/Tree2/tree2-phase3.png")} style={{ width: 80, height: 80 }} />
                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <Image source={require("../../../../assets/garden/Tree2/tree2-phase4.png")} style={{ width: 100, height: 100 }} />
                    </View>

                </View>
            </Card.Image>

            <View style={styles.infoContainer}>
                <View>
                    <Text style={styles.title}>Spring Picic Set</Text>
                    <Text style={styles.description}>A Picnic in th spring breeze</Text>
                </View>
                <Button
                    color="#ffecb3"
                    buttonStyle={styles.button}
                    onPress={() => console.log('aye')}
                >
                    <View style={styles.coinContainer}>
                        <ImageBackground source={require('../../../../assets/shop/coin.png')} style={{ width: 30, height: 30 }} />
                        <Text style={{ fontWeight: 700 }}>10</Text>
                    </View>
                </Button>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        padding: 0,
        margin: 0,
        marginTop: 20,
        backgroundColor: 'transparent',
        borderWidth: 0,
        shadowColor: 'rgba(0,0,0, 0.0)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0
    },
    image: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    treeImgContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
    },
    treeImg: {
        width: 60,
        height: 60,
        top: 10
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#474838",
    },
    description: {
        marginTop: 3,
    },
    button: {
        borderRadius: 100,
        borderWidth: 2,
        borderWidth: 0,
        shadowColor: 'rgba(0,0,0, 0.0)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
    coinContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
})