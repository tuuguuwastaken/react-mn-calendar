import React, { useState } from "react";
import { format, addMonths, subMonths, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, parseISO, startOfDay, } from "date-fns";
import { mn } from "date-fns/locale";
import "../CalendarStyle.css";
const Calendar = ({ events, renderHeader, onDateClick, onEventClick }) => {
    const [currentDate, setCurrentDate] = useState(startOfDay(new Date())); // Ensure the date is set to start of day
    const [selectedDate, setSelectedDate] = useState(null);
    const renderDefaultHeader = () => {
        const dateFormat = "MMMM yyyy";
        return (React.createElement("div", { className: "header row flex-middle" },
            React.createElement("div", { className: "col col-start" },
                React.createElement("div", { className: "icon", onClick: prevMonth }, `<`)),
            React.createElement("div", { className: "col col-center" },
                React.createElement("span", { style: { fontSize: 42 } }, format(currentDate, dateFormat, { locale: mn }))),
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
        return React.createElement("div", { className: "days row" }, days);
    };
    const renderCells = () => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
        const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        while (day <= endDate) {
            const currentDay = day; // Capture the current value of day
            const eventsForDay = events.filter((event) => isSameDay(parseISO(event.date), currentDay));
            const isSelected = selectedDate && isSameDay(currentDay, selectedDate);
            days.push(React.createElement("div", { className: `col cell ${!isSameMonth(currentDay, monthStart) ? "disabled" : isSelected ? "selected" : ""}`, key: currentDay.toISOString(), onClick: () => handleDateClick(currentDay, eventsForDay) },
                React.createElement("span", { className: "number" }, format(currentDay, dateFormat)),
                React.createElement("div", { className: "events-container" }, eventsForDay.map((event) => (React.createElement("div", { key: event.id, className: "event", style: { backgroundColor: event.color ? event.color : "" }, onClick: (e) => {
                        e.stopPropagation(); // Prevent the date click handler from firing
                        handleEventClick(event);
                    } }, event.title))))));
            if (days.length === 7) {
                rows.push(React.createElement("div", { className: "row", key: currentDay.toISOString() }, days));
                days = [];
            }
            day = startOfDay(addDays(currentDay, 1)); // Update day for the next iteration
        }
        if (days.length > 0) {
            rows.push(React.createElement("div", { className: "row", key: day.toISOString() }, days));
        }
        return React.createElement("div", { className: "body" }, rows);
    };
    const handleDateClick = (day, eventsForDay) => {
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
        return format(currentDate, dateFormat, { locale: mn });
    };
    return (React.createElement("div", { className: "big-calendar" },
        renderHeader ? renderHeader(returnedCurrentDate, prevMonth, nextMonth, setCurrentDate) : renderDefaultHeader(),
        renderDays(),
        renderCells()));
};
export default Calendar;
