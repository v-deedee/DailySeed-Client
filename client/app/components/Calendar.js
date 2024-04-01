import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

const Calendar = () => {
  const [currYear, setCurrYear] = useState(new Date().getFullYear());
  const [currMonth, setCurrMonth] = useState(new Date().getMonth());
  const [days, setDays] = useState([]);
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

  useEffect(() => {
    renderCalendar();
  }, [currYear, currMonth]);

  const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(
      currYear,
      currMonth,
      lastDateofMonth,
    ).getDay();
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let daysArray = [];

    for (let i = firstDayofMonth; i > 0; i--) {
      daysArray.push({ day: lastDateofLastMonth - i + 1, active: false });
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      daysArray.push({
        day: i,
        active: true,
        current:
          i === new Date().getDate() &&
          currMonth === new Date().getMonth() &&
          currYear === new Date().getFullYear(),
      });
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      daysArray.push({ day: i - lastDayofMonth + 1, active: false });
    }

    setDays(daysArray);
  };

  const handlePrevNext = (type) => {
    if (type === "prev") {
      if (currMonth === 0) {
        setCurrMonth(11);
        setCurrYear(currYear - 1);
      } else {
        setCurrMonth(currMonth - 1);
      }
    } else if (type === "next") {
      if (currMonth === 11) {
        setCurrMonth(0);
        setCurrYear(currYear + 1);
      } else {
        setCurrMonth(currMonth + 1);
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.icons}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handlePrevNext("prev")}
          >
            <FontAwesome6 name="chevron-left" size={20} />
          </TouchableOpacity>
          <Text style={styles.currentDate}>
            {months[currMonth]} {currYear}
          </Text>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handlePrevNext("next")}
          >
            <FontAwesome6 name="chevron-right" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.calendar}>
        <View style={styles.weeks}>
          {[...Array(7).keys()].map((index) => (
            <Text key={index} style={styles.weekDay}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index]}
            </Text>
          ))}
        </View>
        <View style={styles.days}>
          {days.map((item, index) => (
            <Text
              key={index}
              style={[
                styles.day,
                item.active ? styles.activeDay : styles.inactiveDay,
                item.current ? styles.currendDay : {},
              ]}
            >
              {/* <FontAwesome6 name="circle-notch" size={20} /> */}
              <Text>{item.day}</Text>
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.12,
    shadowRadius: 40,
    elevation: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 25,
    paddingHorizontal: 30,
    // textAlign: "center",
    justifyContent: "center",
  },
  currentDate: {
    fontSize: 19,
    fontWeight: "500",
    paddingHorizontal: 10,
  },
  icons: {
    flexDirection: "row",
    // gap: "20",
  },
  icon: {
    // height: 38,
    // width: 38,
    // marginHorizontal: 10,
    paddingHorizontal: 10,
    color: "#878787",
    textAlign: "center",
    // lineHeight: 38,
    // fontSize: 19,
    borderRadius: 19,
    userSelect: "none",
    paddingTop: 3,
  },
  calendar: {
    paddingHorizontal: 20,
  },
  weeks: {
    flexDirection: "row",
    flexWrap: "wrap",
    listStyle: "none",
    textAlign: "center",
  },
  weekDay: {
    color: "#333",
    width: "14.2857%", // 100% / 7
    fontWeight: "bold",
    textAlign: "center",
    // fontSize: 15.96,
  },
  days: {
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  day: {
    zIndex: 1,
    position: "relative",
    marginTop: 30,
    width: "14.2857%", // 100% / 7
    // fontSize: 15.96,
    color: "#333",
    textAlign: "center",
  },
  inactiveDay: {
    color: "#fff",
  },
  activeDay: {
    color: "#333",
  },
  currendDay: {
    fontWeight: "bold",
    color: "#008D6A",
  },
  // activeDay: {
  //   color: "#fff",
  //   backgroundColor: "#9B59B6",
  //   borderRadius: 20,
  //   textAlign: "center",
  //   lineHeight: 40,
  // },
});

export default Calendar;

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

const getCurrentDate = () => {
  const currentDate = new Date();
  return (
    days[currentDate.getDay()] +
    ", " +
    months[currentDate.getMonth()] +
    " " +
    currentDate.getDate()
  );
};

export { getCurrentDate };
