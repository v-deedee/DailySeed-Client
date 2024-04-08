import { useState } from 'react';
import { Grass, LeftCornerLand, LeftLand, MiddleLand, NormalTree, RightCornerLand, RightLand, Shovel, TreeAvatar, TreeBox } from './Tree';
import { StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { BottomSheet } from "@rneui/themed";

export default function Garden() {
    const [map, setMap] = useState([
        [1, 0, 0, 0, 0, 0, 10],
        [1, 0, 0, 0, 0, 0, 6],
        [1, 0, 0, 0, 0, 0, 6],
        [1, 1, 1, 1, 0, 0, 6],
        [1, 0, 0, 0, 1, 0, 6],
        [0, 0, 0, 0, 1, 0, 6],
        [9, 7, 7, 7, 7, 7, 8],
    ]);

    const [isVisible, setIsVisible] = useState(false);

    const [isDisable, setDisable] = useState(true);

    const [openBorder, setOpenBorder] = useState(false);

    const [isPlantTree, setPlantTree] = useState(false);

    const [isRemoveTree, setRemoveTree] = useState(false)

    const toggleBottomSheet = () => setIsVisible(!isVisible);

    const handleAvatarPress = () => {
        setOpenBorder(true);
        setIsVisible(false);
        setDisable(false);
        setPlantTree(true);
    };

    const handleShovelPress = () => {
        setOpenBorder(true);
        setDisable(false);
        setRemoveTree(true);
    }

    const handlePlantTree = (cell, rowIndex, cellIndex) => {
        if (cell === 0) {
            const newMap = map.map((row, i) => {
                if (i === rowIndex) {
                    return row.map((cell, j) => (j === cellIndex ? 1 : cell));
                } else {
                    return row;
                }
            });
            setMap(newMap);

        }
        setDisable(true);
        setOpenBorder(false);
        setPlantTree(false)
    }

    const handleRemoveTree = (cell, rowIndex, cellIndex) => {
        if (cell === 1 || cell === 2 || cell === 3 || cell === 4 || cell === 5) {
            const newMap = map.map((row, i) => {
                if (i === rowIndex) {
                    return row.map((cell, j) => (j === cellIndex ? 0 : cell));
                } else {
                    return row;
                }
            });
            setMap(newMap);
        }
        setDisable(true);
        setOpenBorder(false);
        setRemoveTree(false);
    }

    const handleTool = (cell, rowIndex, cellIndex) => {
        if (isPlantTree) {
            return handlePlantTree(cell, rowIndex, cellIndex);
        }
        if (isRemoveTree) {
            return handleRemoveTree(cell, rowIndex, cellIndex);
        }
    };


    const renderMap = () => {
        return map.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
                {row.map((cell, cellIndex) => (
                    <TouchableOpacity key={cellIndex} style={styles.cell} disabled={isDisable} onPress={() => handleTool(cell, rowIndex, cellIndex)}>
                        <View>
                            {cell === 0 && <Grass openBorder={openBorder} />}
                            {cell === 1 && <NormalTree openBorder={openBorder} />}
                            {cell === 6 && <RightLand />}
                            {cell === 7 && <LeftLand />}
                            {cell === 8 && <MiddleLand />}
                            {cell === 9 && <LeftCornerLand />}
                            {cell === 10 && <RightCornerLand />}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        ));
    };
    return (
        <View style={styles.gardern}>
            <View style={styles.gardenTool}>
                <TreeBox toggleBottomSheet={toggleBottomSheet} />
                <Shovel handleShovelPress={handleShovelPress} />
            </View>

            <ReactNativeZoomableView
                maxZoom={1.5}
                minZoom={0.5}
                zoomStep={0.5}
                initialZoom={0.9}
                bindToBorders={true}
                onZoomAfter={this.logOutZoomState}
                style={{ paddingBottom: 100 }}
            >
                <View style={styles.mapContainer}>
                    {renderMap()}
                </View>
            </ReactNativeZoomableView>

            <BottomSheet isVisible={isVisible} onBackdropPress={toggleBottomSheet}>
                <View style={styles.bottomSheet}>
                    <TreeAvatar treeStatus="normal" value={10} handleAvatarPress={handleAvatarPress} />
                    <TreeAvatar treeStatus="normal" value={10} />
                    <TreeAvatar treeStatus="normal" value={10} />
                    <TreeAvatar treeStatus="normal" value={12} />
                    <TreeAvatar treeStatus="normal" value={10} />
                </View>
            </BottomSheet>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    gardern: {
        flex: 3,
        // backgroundColor: '#fbf5e5',

        width: '100%',
        height: '100%'
    },
    mapContainer: {
        // transform: [{ rotate: '45deg' }]
        // transform: [{ rotateX: '45deg' }, { rotateZ: '45deg' }],
        transform: [{ rotateX: '20deg' }, { rotateY: '0deg' }, { rotateZ: '45deg' }],
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 35,
        height: 35,
        margin: 0,
        borderWidth: 0,
        borderColor: "#fff"
    },
    gardenTool: {
        backgroundColor: 'transparent',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 50,
        zIndex: 1
    },
    bottomSheet: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 40,
        paddingTop: 40,
        borderRadius: 30,
        backgroundColor: 'white'
    }
});