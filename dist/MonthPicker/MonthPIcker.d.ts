import React from "react";
import "../CalendarStyle.css";
interface Theme {
    mainColor?: string | null;
    onClickMonth: (val: Date) => void;
    selectAble?: boolean | null;
}
declare const MonthPicker: React.FC<Theme>;
export default MonthPicker;
