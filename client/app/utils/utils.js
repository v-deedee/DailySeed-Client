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

const colorPallette = ["#FF8B60", "#FFB246", "#FFD84C", "#A9D78C", "#6BC8A3"];

export const color = (value, maxValue) => {
  return colorPallette[Math.round((value / maxValue) * 4)];
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getCurrentDate = () => {
  const currentDate = new Date();
  return (
    days[currentDate.getDay()] +
    ", " +
    months[currentDate.getMonth()] +
    " " +
    currentDate.getDate()
  );
};
