import React, { useEffect, useState } from "react";
import { format, addMonths, subMonths, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, startOfDay } from "date-fns";
import { mn } from "date-fns/locale";
import "../CalendarStyle.css";
const SmallCalendar = ({ mainColor = "#007bff", onClickDate, events }) => {
    const [currentDate, setCurrentDate] = useState(startOfDay(new Date()));
    const [selectedDate, setSelectedDate] = useState(null);
    const UpperCaseFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    useEffect(() => {
        console.log(currentDate);
    }, [currentDate]);
    const getLuminance = (hexColor) => {
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luminance;
    };
    const isDarkColor = (hexColor) => {
        const luminance = getLuminance(hexColor);
        return luminance < 128;
    };
    const lightenColor = (hexColor, percent) => {
        const num = parseInt(hexColor.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = ((num >> 8) & 0x00ff) + amt;
        const B = (num & 0x0000ff) + amt;
        return ("#" +
            (0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255))
                .toString(16)
                .slice(1));
    };
    const textColor = isDarkColor(mainColor !== null && mainColor !== void 0 ? mainColor : "") ? "#FFFFFF" : "#000000";
    const renderHeader = () => {
        const dateFormat = "M";
        return (React.createElement("div", { className: "header row flex-middle", style: { backgroundColor: mainColor ? mainColor : "", color: textColor, height: 30 } },
            React.createElement("div", { className: "col col-start" },
                React.createElement("div", { className: "icon", onClick: prevMonth },
                    React.createElement("strong", null, `<`))),
            React.createElement("div", { className: "col col-center" },
                React.createElement("span", { style: { width: "100px", textAlign: "center" } },
                    React.createElement("strong", null,
                        UpperCaseFirstLetter(format(currentDate, dateFormat, { locale: mn })),
                        "-\u0440 \u0441\u0430\u0440"))),
            React.createElement("div", { className: "col col-end", onClick: nextMonth },
                React.createElement("div", { className: "icon" },
                    React.createElement("strong", null, `>`)))));
    };
    const renderDays = () => {
        const days = [];
        const dateFormat = "EEEEEE"; // "Да", "Мя", etc.
        const startDate = startOfWeek(currentDate, { weekStartsOn: 1, locale: mn });
        for (let i = 0; i < 7; i++) {
            days.push(React.createElement("div", { className: "col col-center", key: i }, format(addDays(startDate, i), dateFormat, { locale: mn })));
        }
        return React.createElement("div", { className: "days row" }, days);
    };
    const renderCells = () => {
        var _a;
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
        const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = startOfDay(day);
                const textColor = isDarkColor((_a = lightenColor(mainColor !== null && mainColor !== void 0 ? mainColor : "", 60)) !== null && _a !== void 0 ? _a : "") ? "#FFFFFF" : "#000000";
                const eventsForDay = (events === null || events === void 0 ? void 0 : events.filter((event) => isSameDay(event.date, day))) || [];
                const displayedEvents = eventsForDay.slice(0, 3); // Limit to 3 events
                days.push(React.createElement("div", { className: `col cell ${!isSameMonth(day, monthStart) ? "disabled" : selectedDate && isSameDay(day, selectedDate) ? "selected" : ""}`, style: {
                        backgroundColor: selectedDate && isSameDay(day, selectedDate) ? lightenColor(mainColor !== null && mainColor !== void 0 ? mainColor : "", 60) : "",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        color: !isSameMonth(day, monthStart) ? "" : textColor,
                    }, key: day.toString(), onClick: () => onDateClick(cloneDay) },
                    React.createElement("span", { className: "number" }, formattedDate),
                    React.createElement("div", { className: "events-container", style: { display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: "5px" } }, displayedEvents.map((event, index) => {
                        var _a;
                        return (React.createElement("div", { key: index, className: "event-circle", style: {
                                backgroundColor: (_a = event.color) !== null && _a !== void 0 ? _a : "#007bff",
                                borderRadius: "50%",
                                width: "5px",
                                height: "5px",
                                margin: "2px",
                            } }));
                    })),
                    eventsForDay.length > 3 && (React.createElement("div", { className: "more-events", style: { fontSize: "10px", marginTop: "35px", position: "absolute" } },
                        "+",
                        eventsForDay.length - 3))));
                day = startOfDay(addDays(day, 1));
            }
            rows.push(React.createElement("div", { className: "row", key: day.toString() }, days));
            days = [];
        }
        return React.createElement("div", { className: "body" }, rows);
    };
    const onDateClick = (day) => {
        setSelectedDate(day);
        onClickDate(day);
    };
    const nextMonth = () => {
        setCurrentDate(startOfDay(addMonths(currentDate, 1)));
    };
    const prevMonth = () => {
        setCurrentDate(startOfDay(subMonths(currentDate, 1)));
    };
    return (React.createElement("div", { className: "small-calendar" },
        renderHeader(),
        renderDays(),
        renderCells()));
};
export default SmallCalendar;
