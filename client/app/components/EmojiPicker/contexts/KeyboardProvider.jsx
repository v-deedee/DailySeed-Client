import * as React from "react";
import { useWindowDimensions } from "react-native";
import {
  KeyboardContext,
  defaultKeyboardContext,
  defaultKeyboardValues,
  defaultTheme,
  emptyStyles,
} from "./KeyboardContext";

export const KeyboardProvider = React.memo((props) => {
  const [width, setWidth] = React.useState(useWindowDimensions().width);

  const value = React.useMemo(
    () => ({
      ...defaultKeyboardContext,
      ...defaultKeyboardValues,
      ...props,
      theme: defaultTheme,
      styles: emptyStyles,
      width,
      setWidth,
    }),
    [props, width],
  );
  return (
    <KeyboardContext.Provider value={value}>
      {props.children}
    </KeyboardContext.Provider>
  );
});

KeyboardProvider.displayName = "KeyboardProvider";
