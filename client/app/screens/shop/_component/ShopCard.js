import { Button, Card } from '@rneui/themed';
import { View, Text, StyleSheet } from "react-native";

export default function ShopCard() {
    return (
        <Card containerStyle={styles.cardContainer}>
            <Card.Image source={{
                uri:
                    'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
            }} style={styles.image} />
            <View style={styles.infoContainer}>
                <View>
                    <Text style={styles.title}>Spring Picic Set</Text>
                    <Text style={styles.description}>A Picnic in th spring breeze</Text>
                </View>
                <Button
                    title="380"
                    type='outline'
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
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
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#474838",
    },
    description: {
        marginTop: 5,
    },
    buttonContainer: {
        height: 50,
        width: 80,
    },
    buttonTitle: {
        color: 'black'
    },
    button: {
        borderRadius: 100,
        borderColor: '#E8E8E8',
        borderWidth: 2
    }
})