import React, { useState } from "react";
import { format, addMonths, subMonths, startOfYear, startOfMonth } from "date-fns";
import { mn } from "date-fns/locale";
import "../CalendarStyle.css";
const MonthPicker = ({ mainColor = "#007bff", onClickMonth }) => {
    const [currentDate, setCurrentDate] = useState(startOfMonth(new Date()));
    const [selectedDate, setSelectedDate] = useState(null);
    const UpperCaseFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
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
    const textColors = isDarkColor(mainColor !== null && mainColor !== void 0 ? mainColor : "") ? "#FFFFFF" : "#000000";
    const renderHeader = () => {
        const dateFormat = "yyyy";
        return (React.createElement("div", { className: "header row flex-middle", style: { backgroundColor: mainColor ? mainColor : "", color: textColors } },
            React.createElement("div", { className: "col col-start" },
                React.createElement("div", { className: "icon", onClick: prevYear }, `<`)),
            React.createElement("div", { className: "col col-center" },
                React.createElement("span", null, UpperCaseFirstLetter(format(currentDate, dateFormat, { locale: mn })))),
            React.createElement("div", { className: "col col-end", onClick: nextYear },
                React.createElement("div", { className: "icon" }, `>`))));
    };
    const renderMonths = () => {
        const rows = [];
        const dateFormat = "M";
        const startDate = startOfYear(currentDate);
        let months = [];
        for (let i = 0; i < 12; i++) {
            const monthDate = addMonths(startDate, i);
            const isSelected = selectedDate &&
                startOfMonth(monthDate).getMonth() === selectedDate.getMonth() &&
                startOfMonth(monthDate).getFullYear() === selectedDate.getFullYear();
            const textColors = isDarkColor(lightenColor(mainColor !== null && mainColor !== void 0 ? mainColor : "", 60)) ? "#FFFFFF" : "#000000";
            const monthCell = (React.createElement("div", { className: `col cell ${isSelected ? "selected" : ""}`, style: {
                    backgroundColor: isSelected ? lightenColor(mainColor !== null && mainColor !== void 0 ? mainColor : "", 60) : "",
                    color: textColors,
                }, key: monthDate.toString(), onClick: () => onMonthClick(monthDate) },
                React.createElement("span", { className: "number" }, format(monthDate, dateFormat, { locale: mn }))));
            if (i % 4 === 0 && months.length > 0) {
                rows.push(React.createElement("div", { className: "row", key: `row-${i / 4}` }, months));
                months = [];
            }
            months.push(monthCell);
        }
        if (months.length > 0) {
            rows.push(React.createElement("div", { className: "row", key: "row-last" }, months));
        }
        return React.createElement("div", { className: "months" }, rows);
    };
    const onMonthClick = (month) => {
        setSelectedDate(month);
        onClickMonth(month);
    };
    const nextYear = () => {
        setCurrentDate(startOfYear(addMonths(currentDate, 12)));
    };
    const prevYear = () => {
        setCurrentDate(startOfYear(subMonths(currentDate, 12)));
    };
    return (React.createElement("div", { className: "month-picker" },
        renderHeader(),
        renderMonths()));
};
export default MonthPicker;
