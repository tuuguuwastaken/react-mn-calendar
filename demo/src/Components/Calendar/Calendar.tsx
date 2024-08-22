import React, { useState, ReactNode } from "react"
import { format, addMonths, subMonths, startOfWeek, addDays, startOfMonth, isSameMonth, isSameDay, parseISO, startOfDay } from "date-fns"
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
  mainColor?: string | null
}

const Calendar: React.FC<BigCalendarProps> = ({ events, renderHeader, onDateClick, onEventClick, mainColor = "#007bff" }) => {
  const [currentDate, setCurrentDate] = useState(startOfDay(new Date()))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)


  const lightenColor = (hexColor: string, percent: number): string => {
    const num = parseInt(hexColor.replace("#", ""), 16)
    const amt = Math.round(2.55 * percent)
    const R = (num >> 16) + amt
    const G = ((num >> 8) & 0x00ff) + amt
    const B = (num & 0x0000ff) + amt

    return (
      "#" +
      (0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255))
        .toString(16)
        .slice(1)
    )
  }

  const getLuminance = (hexColor: string): number => {
    const r = parseInt(hexColor.slice(1, 3), 16)
    const g = parseInt(hexColor.slice(3, 5), 16)
    const b = parseInt(hexColor.slice(5, 7), 16)

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b

    return luminance
  }

  const isDarkColor = (hexColor: string): boolean => {
    const luminance = getLuminance(hexColor)
    return luminance < 128
  }

  const textColors = isDarkColor(mainColor ?? "") ? "#FFFFFF" : "#000000"

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
          <span style={{ fontSize: 42 }}>{capitalizeFirstLetter(format(currentDate, dateFormat, { locale: mn }))}</span>
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

    return (
      <div className="days row" style={{ backgroundColor: mainColor ? mainColor : "", color: textColors }}>
        {days}
      </div>
    )
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

      // Determine the events to show and how many more events exist
      const eventsToShow = eventsForDay.slice(0, 3)
      const extraEventsCount = eventsForDay.length - eventsToShow.length

      days.push(
        <div
          className={`col cell ${!isSameMonth(currentDay, monthStart) ? "disabled" : isSelected ? "selected" : ""}`}
          key={currentDay.toISOString()}
          onClick={() => handleDateClick(currentDay)}
        >
          <span className="number">{format(currentDay, dateFormat)}</span>
          <div className="events-container" style={{ marginTop: 10 }}>
            {eventsToShow.map((event) => {
              const textColors = isDarkColor(event.color ?? "") ? "#FFFFFF" : "#000000"
              return (
                <div
                  key={event.id}
                  className="event"
                  style={{ backgroundColor: `${event.color ? event.color : ""}`, color: textColors }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEventClick(event)
                  }}
                >
                  {event.title}
                </div>
              )
            })}
            {extraEventsCount > 0 && (
              <div className="more-events" style={{ fontSize: 10, position: "absolute", marginTop: -88 }}>
                <strong>+{extraEventsCount}</strong>
              </div>
            )}
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

  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
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
    return capitalizeFirstLetter(format(currentDate, dateFormat, { locale: mn }))
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
