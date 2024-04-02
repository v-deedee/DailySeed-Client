import { StyleSheet, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Avatar, Badge } from "@rneui/themed";

const Grass = ({ openBorder }) => {
    return (
        <ImageBackground
            source={require('../../../../assets/garden/grass.png')}
            style={[styles.image, openBorder && { borderWidth: 1, borderColor: '#fff' }]}
        />
    );
};

const NormalTree = ({ openBorder }) => {
    return (
        <ImageBackground
            source={require('../../../../assets/garden/grass.png')}
            style={[styles.image, openBorder && { borderWidth: 1, borderColor: '#fff' }]}
        >
            <View style={styles.treeContainer}>
                <Image source={require('../../../../assets/garden/tree.png')} style={styles.tree} />
            </View>
        </ImageBackground>
    );
};

const LeftLand = () => {
    return (
        <ImageBackground
            source={require('../../../../assets/garden/left.png')}
            style={styles.image}
        />
    );
};

const RightLand = () => {
    return (
        <ImageBackground
            source={require('../../../../assets/garden/right.png')}
            style={styles.image}
        />
    );
};

const MiddleLand = () => {
    return (
        <ImageBackground
            source={require('../../../../assets/garden/middle.png')}
            style={styles.image}
        />
    );
};

const LeftCornerLand = () => {
    return (
        <ImageBackground
            source={require('.../../../../assets/garden/left-corner.png')}
            style={styles.image}
        />
    );
};

const RightCornerLand = () => {
    return (
        <ImageBackground
            source={require('../../../../assets/garden/right-corner.png')}
            style={styles.image}
        />
    );
};

const TreeBox = ({ toggleBottomSheet }) => {
    return (
        <View>
            <TouchableOpacity activeOpacity={0.5} onPress={toggleBottomSheet}>
                <Image
                    source={require('../../../../assets/garden/box.png')}
                    style={styles.image}
                />
            </TouchableOpacity>
        </View>
    );
}

const Shovel = ({ handleShovelPress }) => {
    return (
        <View>
            <TouchableOpacity activeOpacity={0.5} onPress={handleShovelPress}>
                <ImageBackground
                    source={require('../../../../assets/garden/shovel.png')}
                    style={styles.image}
                />
            </TouchableOpacity>
        </View>
    );
}

const TreeAvatar = ({ treeStatus, value, handleAvatarPress }) => {
    switch (treeStatus) {
        case 'normal':
            return (
                <Avatar
                    size={60}
                    rounded
                    source={require('../../../../assets/garden/tree.png')}
                    containerStyle={{ backgroundColor: 'grey' }}
                    onPress={handleAvatarPress}
                >
                    <Badge
                        status="success"
                        value={value}
                        containerStyle={{ position: 'absolute', top: 65, left: 16, zIndex: 100 }}
                    />
                </Avatar>
            );
    }
}
const styles = StyleSheet.create({
    image: {
        width: 36,
        height: 36,
        resizeMode: 'contain',
        borderWidth: 0,
        borderColor: "#fff",
    },
    treeContainer: {
        transform: [{ rotateX: '0deg' }, { rotateZ: '-45deg' }, { rotateY: '10deg' }],
        justifyContent: 'center',
        alignItems: 'center',
    },
    tree: {
        width: 45,
        height: 45,
        marginTop: -20,
        marginLeft: -5,
    }
});

export { Grass, NormalTree, RightLand, MiddleLand, LeftLand, LeftCornerLand, RightCornerLand, TreeBox, Shovel, TreeAvatar };
