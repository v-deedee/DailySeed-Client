import { Card, Button } from '@rneui/themed';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/user.context';

export default function AccoutCard() {
    const {user} = useContext(UserContext)
    return (
        <View>
            <Text style={styles.title}>Accout</Text>
            <Card containerStyle={styles.cardContainer}>
                <View style={styles.row}>
                    <View style={styles.row}>
                        <View>
                            <FontAwesome name="user-circle" size={25} color='#b2b2b2' />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <Text>{user.user.username}</Text>
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
    button: {
        backgroundColor: 'transparent',
        color: 'green'
    }
});