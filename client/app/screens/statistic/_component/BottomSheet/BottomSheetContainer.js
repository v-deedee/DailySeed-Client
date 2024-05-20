// BottomSheetContainer.js
import * as React from "react";
import { StyleSheet, View, SafeAreaView, Text } from "react-native";
import { KeyboardContext } from "../../../../components/EmojiPicker/contexts/KeyboardContext";
import { ConditionalContainer } from "../../../../components/EmojiPicker/components/ConditionalContainer";

const BottomSheetContainer = React.forwardRef(({ children, backgroundColor }, ref) => {
    const {
        disableSafeArea,
        theme,
        styles: themeStyles,
        setWidth,
    } = React.useContext(KeyboardContext);

    return (
        <View
            style={[
                styles.container,
                styles.containerShadow,
                themeStyles.container,
                { backgroundColor: backgroundColor || theme.container }, // Apply backgroundColor prop or fallback to theme
            ]}
            onLayout={(e) => {
                setWidth(e.nativeEvent.layout.width);
            }}
            ref={ref}
        >
            <ConditionalContainer
                condition={!disableSafeArea}
                container={(children) => (
                    <SafeAreaView style={[styles.flex]}>{children}</SafeAreaView>
                )}
            >
                {children}
            </ConditionalContainer>
        </View>
    );
});

const styles = StyleSheet.create({
    flex: { flex: 1 },
    container: {
        flex: 1,
        borderRadius: 30,
    },
    searchContainer: {
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    containerReverse: { flexDirection: "column-reverse" },
    containerShadow: {
        shadowColor: "black",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        elevation: 10,
    },
});

export default BottomSheetContainer;
