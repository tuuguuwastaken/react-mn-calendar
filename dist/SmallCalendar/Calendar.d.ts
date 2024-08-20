import React from "react";
import "../CalendarStyle.css";
interface Event {
    date: Date;
    color?: string | null;
}
interface Theme {
    mainColor?: string | null;
    onClickDate: (val: Date) => void;
    events?: Event[] | null;
}
declare const SmallCalendar: React.FC<Theme>;
export default SmallCalendar;
