import React, { ReactNode } from "react";
import "../CalendarStyle.css";
interface Event {
    id: string;
    title: string;
    date: string;
    color?: string | null;
    data?: any;
}
interface BigCalendarProps {
    events: Event[];
    renderHeader?: (currentDate: () => string, prevMonth: () => void, nextMonth: () => void, setCurrentDate: (date: Date) => void) => ReactNode;
    onDateClick?: (day: Date) => void;
    onEventClick?: (event: Event) => void;
    mainColor?: string | null;
}
declare const Calendar: React.FC<BigCalendarProps>;
export default Calendar;
