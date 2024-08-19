import React, { useEffect, useState } from 'react';
import { format, addMonths, subMonths, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, startOfDay, } from 'date-fns';
import { mn } from 'date-fns/locale';
import "../CalendarStyle.css";
const DatePicker = ({ mainColor = '#007bff', onClickDate }) => {
    const [currentDate, setCurrentDate] = useState(startOfDay(new Date()));
    const [selectedDate, setSelectedDate] = useState(null);
    const UpperCaseFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    useEffect(() => {
        console.log(currentDate);
    }, [currentDate]);
    const renderHeader = () => {
        const dateFormat = 'MMMM yyyy';
        return (React.createElement("div", { className: "header row flex-middle" },
            React.createElement("div", { className: "col col-start" },
                React.createElement("div", { className: "icon", onClick: prevMonth }, `<`)),
            React.createElement("div", { className: "col col-center" },
                React.createElement("span", null, UpperCaseFirstLetter(format(currentDate, dateFormat, { locale: mn })))),
            React.createElement("div", { className: "col col-end", onClick: nextMonth },
                React.createElement("div", { className: "icon" }, `>`))));
    };
    const renderDays = () => {
        const days = [];
        const dateFormat = 'EEEEEE'; // "Да", "Мя", etc.
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
        const dateFormat = 'd';
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = '';
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = startOfDay(day);
                days.push(React.createElement("div", { className: `col cell ${!isSameMonth(day, monthStart)
                        ? 'disabled'
                        : selectedDate && isSameDay(day, selectedDate)
                            ? 'selected'
                            : ''}`, style: {
                        backgroundColor: selectedDate && isSameDay(day, selectedDate) ? mainColor !== null && mainColor !== void 0 ? mainColor : '' : '',
                    }, key: day.toString(), onClick: () => onDateClick(cloneDay) },
                    React.createElement("span", { className: "number" }, formattedDate)));
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
        setCurrentDate(startOfDay(addMonths(currentDate, 1))); // Ensure the month change is normalized
    };
    const prevMonth = () => {
        setCurrentDate(startOfDay(subMonths(currentDate, 1))); // Ensure the month change is normalized
    };
    return (React.createElement("div", { className: "small-calendar" },
        renderHeader(),
        renderDays(),
        renderCells()));
};
export default DatePicker;
