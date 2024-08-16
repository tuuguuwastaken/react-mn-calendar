import React, { useEffect, useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  startOfDay,
} from 'date-fns';
import { mn } from 'date-fns/locale';
import "../CalendarStyle.css"

interface Theme {
  mainColor?: string | null;
  onClickDate: (val: Date) => void;
}

const DatePicker: React.FC<Theme> = ({ mainColor = '#007bff', onClickDate}) => {
  const [currentDate, setCurrentDate] = useState(startOfDay(new Date())); // Ensure the date is set to start of day
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const UpperCaseFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    console.log(currentDate);
  }, [currentDate]);

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prevMonth}>
            {`<`}
          </div>
        </div>
        <div className="col col-center">
          <span>{UpperCaseFirstLetter(format(currentDate, dateFormat, { locale: mn }))}</span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">
           {`>`}
          </div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEEEEE'; // "Да", "Мя", etc.
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1, locale: mn });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat, { locale: mn })}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
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
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? 'disabled'
                : selectedDate && isSameDay(day, selectedDate)
                ? 'selected'
                : ''
            }`}
            style={{
              backgroundColor: selectedDate && isSameDay(day, selectedDate) ? mainColor ?? '' : '',
            }}
            key={day.toString()}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
          </div>
        );
        day = startOfDay(addDays(day, 1));
      }
      rows.push(
        <div className="row" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
    onClickDate(day);
  };

  const nextMonth = () => {
    setCurrentDate(startOfDay(addMonths(currentDate, 1))); // Ensure the month change is normalized
  };

  const prevMonth = () => {
    setCurrentDate(startOfDay(subMonths(currentDate, 1))); // Ensure the month change is normalized
  };

  return (
    <div className="small-calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default DatePicker;
