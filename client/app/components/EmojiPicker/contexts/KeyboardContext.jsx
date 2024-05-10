import * as React from "react";

export const emptyStyles = {
  container: {},
  header: {},
  category: {
    icon: {},
    container: {},
  },
  searchBar: {
    container: {},
    text: {},
  },
  knob: {},
  emoji: {
    selected: {},
  },
};
export const defaultTheme = {
  backdrop: "#00000055",
  knob: "#ffffff",
  container: "#ffffff",
  header: "#00000099",
  skinTonesContainer: "#e3dbcd",
  category: {
    icon: "#000000",
    iconActive: "#005b96",
    container: "#e3dbcd",
    containerActive: "#ffffff",
  },
  search: {
    text: "#000000cc",
    placeholder: "#00000055",
    icon: "#00000055",
    background: "#00000011",
  },
  customButton: {
    icon: "#000000",
    iconPressed: "#005b96",
    background: "#00000011",
    backgroundPressed: "#00000016",
  },
  emoji: {
    selected: "#e3dbcd",
  },
};

export const defaultKeyboardContext = {
  open: false,
  onClose: () => {},
  onEmojiSelected: (_emoji) => {},
  emojiSize: 28,
  expandable: true,
  hideHeader: false,
  defaultHeight: "40%",
  expandedHeight: "80%",
  theme: defaultTheme,
  styles: emptyStyles,
};

export const defaultKeyboardValues = {};

export const KeyboardContext = React.createContext({
  ...defaultKeyboardContext,
  ...defaultKeyboardValues,
});
