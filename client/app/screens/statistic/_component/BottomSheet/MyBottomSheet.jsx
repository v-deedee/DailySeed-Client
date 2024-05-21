// MyBottomSheet.js
import React, { useState, useRef, useLayoutEffect } from "react";
import { Animated, useWindowDimensions } from "react-native";
import { Knob } from "../../../../components/EmojiPicker/components/Knob";
import { KeyboardProvider } from "../../../../components/EmojiPicker/contexts/KeyboardProvider";
import { defaultKeyboardContext } from "../../../../components/EmojiPicker/contexts/KeyboardContext";
import { ModalWithBackdrop } from "../../../../components/EmojiPicker/components/ModalWithBackdrop";
import { getHeight } from "../../../../components/EmojiPicker/utils/getHeight";
import { useKeyboard } from "../../../../components/EmojiPicker/hooks/useKeyboard";
import BottomSheetContainer from "./BottomSheetContainer";

export const MyBottomSheet = ({
    onRequestClose,
    open,
    onClose,
    expandable = defaultKeyboardContext.expandable,
    defaultHeight = defaultKeyboardContext.defaultHeight,
    backgroundColor, // Added backgroundColor prop
    children,
    ...props
}) => {
    const { height: screenHeight } = useWindowDimensions();
    const offsetY = useRef(new Animated.Value(0)).current;
    const height = useRef(new Animated.Value(getHeight(defaultHeight, screenHeight))).current;
    const additionalHeight = useRef(new Animated.Value(0)).current;
    const { keyboardVisible, keyboardHeight } = useKeyboard(open);
    const [isExpanded, setIsExpanded] = useState(false);

    React.useEffect(() => {
        const shouldExpandHeight = keyboardVisible && !isExpanded;
        const newAdditionalHeightValue = shouldExpandHeight ? keyboardHeight : 0;
        Animated.timing(additionalHeight, {
            toValue: newAdditionalHeightValue,
            useNativeDriver: false,
            duration: 200,
        }).start();
    }, [additionalHeight, isExpanded, keyboardHeight, keyboardVisible]);

    const close = () => {
        height.setValue(getHeight(defaultHeight, screenHeight));
        offsetY.setValue(0);
        onClose();
    };

    return (
        <KeyboardProvider
            open={open}
            onClose={close}
            expandable={expandable}
            defaultHeight={defaultHeight}
            {...props}
        >
            <ModalWithBackdrop
                isOpen={open}
                backdropPress={close}
                onRequestClose={onRequestClose || close}
            >
                <>
                    {expandable && (
                        <Knob
                            height={height}
                            offsetY={offsetY}
                            onClose={onClose}
                            setIsExpanded={setIsExpanded}
                        />
                    )}
                    <Animated.View
                        style={[
                            {
                                height: Animated.add(
                                    Animated.subtract(height, offsetY),
                                    additionalHeight,
                                ),
                            },
                        ]}
                    >
                        {/* Pass backgroundColor prop to BottomSheetContainer */}
                        <BottomSheetContainer backgroundColor={backgroundColor}>{children}</BottomSheetContainer>
                    </Animated.View>
                </>
            </ModalWithBackdrop>
        </KeyboardProvider>
    );
};
