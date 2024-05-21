import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { getTree } from "../../../services/tree.service";
import { Skeleton } from '@rneui/themed';
import { CLOUDINARY_BASE_URL } from "../../../utils/constants/cloudinary.constants";

export default function TreeDetail({ treeID }) {
    const [treeInfo, setTreeInfo] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [imgURL, setImgUrl] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const info = await getTree(treeID);
                console.log(info)
                setTreeInfo(info);
                const assetArray = info.seed.asset.split('|');
                const phaseImage = assetArray[assetArray.length - info?.seed?.phase];
                setImgUrl(phaseImage);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [treeID]);

    const getPhaseDescription = (phase) => {
        switch (phase) {
            case 1:
                return "Cây chết";
            case 2:
                return "Cây sống";
            case 3:
                return "Cây tốt";
            case 4:
                return "Cực tốt";
            default:
                return "Không xác định";
        }
    };

    const phaseStyle = {
        1: { width: 50, height: 50, top: '5%' },
        2: { width: 60, height: 60, top: '5%' },
        3: { width: 80, height: 80, top: 0 },
        4: { width: 100, height: 100, top: 0 },
    };

    return (
        <View>
            <>
                <ImageBackground
                    source={require("../../../../assets/theme/background.png")}
                    style={styles.imgContainer}
                >

                    {isLoading ? (
                        <Skeleton
                            style={{ width: 50, height: 50, top: '15%' }}
                            baseColor="#E0E0E0"
                            highlightColor="#F0F0F0"
                        />
                    ) : (
                        <>
                            <Text style={{ color: '#533718', fontWeight: 'bold' }}>
                                {getPhaseDescription(treeInfo?.seed?.phase)}
                            </Text>

                            <Image
                                source={{ uri: `${CLOUDINARY_BASE_URL}${imgURL}` }}
                                style={[{ top: '0%' }, phaseStyle[treeInfo?.seed?.phase]]}
                            />
                        </>
                    )}
                </ImageBackground>

                <View style={styles.contentContainer}>
                    <View style={styles.treeStatusContainer}>
                        <Text style={{ color: '#6d4100', fontWeight: 'bold' }}>
                            Score: {treeInfo?.tree?.score}
                        </Text>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={{ color: '#e0d6b3', fontWeight: 'bold' }}>
                            {treeInfo?.tree?.date}
                        </Text>
                        <Text style={{ color: '#e0d6b3', fontWeight: 'bold' }}>
                            Record 3/3
                        </Text>
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
                </View>
            </>
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
    }
});
