export const trees = [
  [
    require("../../assets/garden/Tree1/tree1-phase1.png"),
    require("../../assets/garden/Tree1/tree1-phase2.png"),
    require("../../assets/garden/Tree1/tree1-phase3.png"),
    require("../../assets/garden/Tree1/tree1-phase4.png"),
  ],
  [
    require("../../assets/garden/Tree2/tree2-phase1.png"),
    require("../../assets/garden/Tree2/tree2-phase2.png"),
    require("../../assets/garden/Tree2/tree2-phase3.png"),
    require("../../assets/garden/Tree2/tree2-phase4.png"),
  ],
  [
    require("../../assets/garden/Tree3/tree3-phase1.png"),
    require("../../assets/garden/Tree3/tree3-phase2.png"),
    require("../../assets/garden/Tree3/tree3-phase3.png"),
    require("../../assets/garden/Tree3/tree3-phase4.png"),
  ],
];

const interpolate = (start, end, value, maxValue) => {
  let k = (value - 0) / maxValue;
  return Math.ceil((1 - k) * start + k * end) % 256;
};

export const color = (value, maxValue) => {
  let r = interpolate(255, 0, value, maxValue);
  let g = interpolate(0, 205, value, maxValue);
  let b = interpolate(0, 0, value, maxValue);
  return `rgb(${r},${g},${b})`;
};
