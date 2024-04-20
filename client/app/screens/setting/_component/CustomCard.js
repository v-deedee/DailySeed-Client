import { Card, Switch } from '@rneui/themed';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";

export default function CustomCard() {
    return (
        <View>
            <Text style={styles.title}>Customization</Text>
            <Card containerStyle={styles.cardContainer}>
                <View style={styles.row}>
                    <View style={styles.row}>
                        <View>
                            <MaterialIcons name="notifications-on" size={25} color='#b2b2b2' />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <Text>Daily reminder ON/OFF</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <Switch color='#50AA75' />
                    </View>
                </View>

                {/* <Card.Divider style={styles.divider} />

                <View style={styles.row}>
                    <View style={styles.row}>
                        <View>
                  
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <Text>Dark Theme / Light Theme</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <Switch />
                    </View>
                </View> */}
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
        borderRadius: 20,
        borderWidth: 0,
        shadowColor: 'rgba(0,0,0, 0.0)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
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