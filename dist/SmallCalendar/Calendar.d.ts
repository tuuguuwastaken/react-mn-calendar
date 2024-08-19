import React from 'react';
import "../CalendarStyle.css";
interface Theme {
    mainColor?: string | null;
    onClickDate: (val: Date) => void;
}
declare const DatePicker: React.FC<Theme>;
export default DatePicker;
