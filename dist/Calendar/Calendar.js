import React, { useState } from "react";
import { format, addMonths, subMonths, startOfWeek, addDays, startOfMonth, isSameMonth, isSameDay, parseISO, startOfDay } from "date-fns";
import { mn } from "date-fns/locale";
import "../CalendarStyle.css";
const Calendar = ({ events, renderHeader, onDateClick, onEventClick, mainColor = "#007bff" }) => {
    const [currentDate, setCurrentDate] = useState(startOfDay(new Date()));
    const [selectedDate, setSelectedDate] = useState(null);
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
    const textColors = isDarkColor(mainColor !== null && mainColor !== void 0 ? mainColor : "") ? "#FFFFFF" : "#000000";
    const renderDefaultHeader = () => {
        const dateFormat = "MMMM yyyy";
        return (React.createElement("div", { className: "header row flex-middle" },
            React.createElement("div", { className: "col col-start" },
                React.createElement("div", { className: "icon", onClick: prevMonth }, `<`)),
            React.createElement("div", { className: "col col-center" },
                React.createElement("span", { style: { fontSize: 42 } }, capitalizeFirstLetter(format(currentDate, dateFormat, { locale: mn })))),
            React.createElement("div", { className: "col col-end", onClick: nextMonth },
                React.createElement("div", { className: "icon" }, `>`))));
    };
    const renderDays = () => {
        const days = [];
        const dateFormat = "EEEEEE";
        const startDate = startOfWeek(currentDate, { weekStartsOn: 1, locale: mn });
        for (let i = 0; i < 7; i++) {
            days.push(React.createElement("div", { className: "col col-center", key: i }, format(addDays(startDate, i), dateFormat, { locale: mn })));
        }
        return (React.createElement("div", { className: "days row", style: { backgroundColor: mainColor ? mainColor : "", color: textColors } }, days));
    };
    const renderCells = () => {
        const monthStart = startOfMonth(currentDate);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
        const endDate = addDays(startDate, 41);
        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        while (day <= endDate) {
            const currentDay = day;
            const eventsForDay = events.filter((event) => isSameDay(parseISO(event.date), currentDay));
            const isSelected = selectedDate && isSameDay(currentDay, selectedDate);
            // Determine the events to show and how many more events exist
            const eventsToShow = eventsForDay.slice(0, 3);
            const extraEventsCount = eventsForDay.length - eventsToShow.length;
            days.push(React.createElement("div", { className: `col cell ${!isSameMonth(currentDay, monthStart) ? "disabled" : isSelected ? "selected" : ""}`, key: currentDay.toISOString(), onClick: () => handleDateClick(currentDay) },
                React.createElement("span", { className: "number" }, format(currentDay, dateFormat)),
                React.createElement("div", { className: "events-container", style: { marginTop: 10 } },
                    eventsToShow.map((event) => {
                        var _a;
                        const textColors = isDarkColor((_a = event.color) !== null && _a !== void 0 ? _a : "") ? "#FFFFFF" : "#000000";
                        return (React.createElement("div", { key: event.id, className: "event", style: { backgroundColor: `${event.color ? event.color : ""}`, color: textColors }, onClick: (e) => {
                                e.stopPropagation();
                                handleEventClick(event);
                            } }, event.title));
                    }),
                    extraEventsCount > 0 && (React.createElement("div", { className: "more-events", style: { fontSize: 10, position: "absolute", marginTop: -88 } },
                        React.createElement("strong", null,
                            "+",
                            extraEventsCount))))));
            if (days.length === 7) {
                rows.push(React.createElement("div", { className: "row", key: currentDay.toISOString() }, days));
                days = [];
            }
            day = startOfDay(addDays(currentDay, 1));
        }
        return React.createElement("div", { className: "body" }, rows);
    };
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const handleDateClick = (day) => {
        setSelectedDate(day);
        if (onDateClick) {
            onDateClick(day);
        }
    };
    const handleEventClick = (event) => {
        if (onEventClick) {
            onEventClick(event);
        }
    };
    const nextMonth = () => {
        setCurrentDate(startOfDay(addMonths(currentDate, 1)));
    };
    const prevMonth = () => {
        setCurrentDate(startOfDay(subMonths(currentDate, 1)));
    };
    const returnedCurrentDate = () => {
        const dateFormat = "MMMM yyyy";
        return capitalizeFirstLetter(format(currentDate, dateFormat, { locale: mn }));
    };
    return (React.createElement("div", { className: "big-calendar" },
        renderHeader ? renderHeader(returnedCurrentDate, prevMonth, nextMonth, setCurrentDate) : renderDefaultHeader(),
        renderDays(),
        renderCells()));
};
export default Calendar;
