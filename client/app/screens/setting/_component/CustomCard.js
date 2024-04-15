import { Card, Switch } from '@rneui/themed';
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";

export default function CustomCard() {
    return (
        <View>
            <Text style={styles.title}>Customization</Text>
            <Card containerStyle={styles.cardContainer}>
                <View style={styles.row}>
                    <View style={styles.row}>
                        <View>
                            <FontAwesome6 name="bell" size={30} />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <Text>Daily reminder ON/OFF</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <Switch />
                    </View>
                </View>

                <Card.Divider style={styles.divider} />

                <View style={styles.row}>
                    <View style={styles.row}>
                        <View>
                            <FontAwesome6 name="moon" size={30} />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <Text>Dark Theme / Light Theme</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <Switch />
                    </View>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#474838",
        marginTop: 10,
        marginBottom: 10
    },
    cardContainer: {
        padding: 15,
        margin: 0,
        backgroundColor: 'white',
        borderRadius: 10
    },
    innerCard: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 3
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'transparent',
        color: 'green'
    }
});