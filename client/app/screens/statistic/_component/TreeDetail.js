import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { Button, Card } from '@rneui/themed';

export default function TreeDetail({ selectedTreePosition }) {
    return (
        <View>
            <ImageBackground source={require("../../../../assets/theme/background.png")} style={styles.imgContainer} >
                <Text style={{ color: '#533718', fontWeight: 'bold' }}>Normal Tree</Text>
                <Image source={require("../../../../assets/garden/Tree2/tree2-phase1.png")} style={{ width: 50, height: 50, top: '10%' }} />
            </ImageBackground>

            <View style={styles.contentContainer}>
                <View style={styles.treeStatusContainer}>
                    <Text style={{ color: '#6d4100', fontWeight: 'bold' }}>{selectedTreePosition.x}</Text>
                    <Text style={{ color: '#6d4100', fontWeight: 'bold' }}>{selectedTreePosition.y}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={{ color: '#e0d6b3', fontWeight: 'bold' }}>24/11/2003</Text>
                    <Text style={{ color: '#e0d6b3', fontWeight: 'bold' }}>Record 3/3</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={{ color: '#e3dcc5', fontWeight: 'bold' }}>👌 DSA: 3</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={{ color: '#e3dcc5', fontWeight: 'bold' }}>💦 OOP: 3</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={{ color: '#e3dcc5', fontWeight: 'bold' }}>🆘 OOAD: 10</Text>
                </View>

                {/* <View style={styles.cardContainer}>
                    <View style={styles.row}>
                        <Text>👌</Text>
                        <Text>HomeWork:</Text>
                        <Text>3</Text>
                    </View>

                    <Image source={require("../../../../assets/garden/tag.png")} style={styles.tag} />
                </View>

                <View style={styles.cardContainer}>
                    <View style={styles.row}>
                        <Text>👌</Text>
                        <Text>HomeWork:</Text>
                        <Text>3</Text>
                    </View>

                    <Image source={require("../../../../assets/garden/tag.png")} style={styles.tag} />
                </View>

                <View style={styles.cardContainer}>
                    <View style={styles.row}>
                        <Text>👌</Text>
                        <Text>HomeWork:</Text>
                        <Text>3</Text>
                    </View>

                    <Image source={require("../../../../assets/garden/tag.png")} style={styles.tag} />
                </View> */}
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    imgContainer: {
        width: "100%",
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: "hidden",
    },
    contentContainer: {
        backgroundColor: '#6d4100',
    },
    treeStatusContainer: {
        borderRadius: 100,
        backgroundColor: '#fcf0be',
        margin: 20,
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
    },
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 20,
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row',
        gap: 4
    },
    tag: {
        width: 30,
        height: 30
    }
})