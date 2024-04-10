import { View, Text, StyleSheet, Image } from "react-native";

export default function TreeDetail() {
    return (
        <View style={styles.row}>
            <View>
                <Image
                    source={require('../../../../assets/garden/tree.png')}
                    style={{
                        width: 100, height: 100,
                        borderWidth: 3,
                        borderRadius: 20
                    }}
                />
            </View>
            <View style={{ width: 150, height: 100, marginLeft: 20 }}>
                <Text>Date: 24/11/2003</Text>
                <Text>Status: NormalTree</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    }
})