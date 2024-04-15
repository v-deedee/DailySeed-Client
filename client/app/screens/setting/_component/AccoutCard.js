import { Card, Button } from '@rneui/themed';
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import UserSingleton from '../../../services/user-singleton';

export default function AccoutCard() {
    return (
        <View>
            <Text style={styles.title}>Accout</Text>
            <Card containerStyle={styles.cardContainer}>
                <View style={styles.row}>
                    <View style={styles.row}>
                        <View>
                            <FontAwesome6 name="user" size={30} />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <Text>{UserSingleton.getInstance().getUserName()}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <TouchableWithoutFeedback onPress={() => { console.log("Hello") }}>
                            <View>
                                <Text style={{ color: 'green' }}>My info</Text>
                            </View>
                        </TouchableWithoutFeedback>
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
    button: {
        backgroundColor: 'transparent',
        color: 'green'
    }
});