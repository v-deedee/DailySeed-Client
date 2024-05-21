import { Button, Card } from '@rneui/themed';
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { CLOUDINARY_BASE_URL } from '../../../utils/constants/cloudinary.constants';
import { Icon } from '@rneui/themed';

export default function ShopCard({ name, price, owned, assets }) {

    return (
        <Card containerStyle={styles.cardContainer}>
            <Card.Image source={require("../../../../assets/theme/background.png")} style={styles.image}>
                <View style={styles.treeImgContainer}>
                    {assets.slice().reverse().map((asset, index) => (
                        <View key={index} style={{ justifyContent: 'flex-end' }}>
                            <Image source={{ uri: `${CLOUDINARY_BASE_URL}${asset}` }} style={{ width: 60 + index * 10, height: 60 + index * 10 }} />
                        </View>
                    ))}
                </View>
            </Card.Image>

            <View style={styles.infoContainer}>
                <View>
                    <Text style={styles.title}>{name}</Text>
                </View>
                <Button
                    color="#ffecb3"
                    buttonStyle={styles.button}
                    onPress={() => console.log(`${name} purchased!`)}
                    disabled={owned}
                >
                    {owned ? (
                        <Icon
                            name='check'
                            type='material'
                            color='#41B06E'
                            size={30}
                        />
                    ) : (
                        <View style={styles.coinContainer}>
                            <ImageBackground source={require('../../../../assets/shop/coin.png')} style={{ width: 30, height: 30 }} />
                            <Text style={{ fontWeight: 700 }}>{price}</Text>
                        </View>
                    )}
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
});
