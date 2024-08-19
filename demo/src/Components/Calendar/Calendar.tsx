import React, { useState, ReactNode } from "react"
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  addDays,
  startOfMonth,
  isSameMonth,
  isSameDay,
  parseISO,
  startOfDay,
} from "date-fns"
import { mn } from "date-fns/locale"
import "../CalendarStyle.css"

interface Event {
  id: string
  title: string
  date: string // ISO string format
  color?: string | null
  data?: any
}

interface BigCalendarProps {
  events: Event[]
  renderHeader?: (currentDate: () => string, prevMonth: () => void, nextMonth: () => void, setCurrentDate: (date: Date) => void) => ReactNode
  onDateClick?: (day: Date) => void
  onEventClick?: (event: Event) => void
}

const Calendar: React.FC<BigCalendarProps> = ({ events, renderHeader, onDateClick, onEventClick }) => {
  const [currentDate, setCurrentDate] = useState(startOfDay(new Date()))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const renderDefaultHeader = () => {
    const dateFormat = "MMMM yyyy"

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prevMonth}>
            {`<`}
          </div>
        </div>
        <div className="col col-center">
          <span style={{ fontSize: 42 }}>{format(currentDate, dateFormat, { locale: mn })}</span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">{`>`}</div>
        </div>
      </div>
    )
  }

  const renderDays = () => {
    const days = []
    const dateFormat = "EEEEEE"
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1, locale: mn })

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat, { locale: mn })}
        </div>
      )
    }

    return <div className="days row">{days}</div>
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate)
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
    const endDate = addDays(startDate, 41)
    const dateFormat = "d"
    const rows = []
    let days = []
    let day = startDate

    while (day <= endDate) {
      const currentDay = day
      const eventsForDay = events.filter((event) => isSameDay(parseISO(event.date), currentDay))
      const isSelected = selectedDate && isSameDay(currentDay, selectedDate)

      days.push(
        <div
          className={`col cell ${!isSameMonth(currentDay, monthStart) ? "disabled" : isSelected ? "selected" : ""}`}
          key={currentDay.toISOString()}
          onClick={() => handleDateClick(currentDay)}
        >
          <span className="number">{format(currentDay, dateFormat)}</span>
          <div className="events-container">
            {eventsForDay.map((event) => (
              <div
                key={event.id}
                className="event"
                style={{ backgroundColor: event.color ? event.color : "" }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleEventClick(event)
                }}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      )

      if (days.length === 7) {
        rows.push(
          <div className="row" key={currentDay.toISOString()}>
            {days}
          </div>
        )
        days = []
      }

      day = startOfDay(addDays(currentDay, 1))
    }

    return <div className="body">{rows}</div>
  }

  const handleDateClick = (day: Date) => {
    setSelectedDate(day)
    if (onDateClick) {
      onDateClick(day)
    }
  }

  const handleEventClick = (event: Event) => {
    if (onEventClick) {
      onEventClick(event)
    }
  }

  const nextMonth = () => {
    setCurrentDate(startOfDay(addMonths(currentDate, 1)))
  }

  const prevMonth = () => {
    setCurrentDate(startOfDay(subMonths(currentDate, 1)))
  }

  const returnedCurrentDate = (): string => {
    const dateFormat = "MMMM yyyy"
    return format(currentDate, dateFormat, { locale: mn })
  }

  return (
    <div className="big-calendar">
      {renderHeader ? renderHeader(returnedCurrentDate, prevMonth, nextMonth, setCurrentDate) : renderDefaultHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  )
}

export default Calendar