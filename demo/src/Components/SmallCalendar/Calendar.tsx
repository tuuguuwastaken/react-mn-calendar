import React, { useEffect, useState } from "react"
import { format, addMonths, subMonths, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, startOfDay } from "date-fns"
import { mn } from "date-fns/locale"
import "../CalendarStyle.css"

interface Event {
  date: Date
  color?: string | null
}

interface Theme {
  mainColor?: string | null
  onClickDate: (val: Date) => void
  events?: Event[] | null
}

const SmallCalendar: React.FC<Theme> = ({ mainColor = "#007bff", onClickDate, events }) => {
  const [currentDate, setCurrentDate] = useState(startOfDay(new Date()))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const UpperCaseFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  useEffect(() => {
    console.log(currentDate)
  }, [currentDate])

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

  const textColor = isDarkColor(mainColor ?? "") ? "#FFFFFF" : "#000000"

  const renderHeader = () => {
    const dateFormat = "M"
    return (
      <div className="header row flex-middle" style={{ backgroundColor: mainColor ? mainColor : "", color: textColor, height: 30 }}>
        <div className="col col-start">
          <div className="icon" onClick={prevMonth}>
            <strong>{`<`}</strong>
          </div>
        </div>
        <div className="col col-center">
          <span style={{ width: "100px", textAlign: "center" }}>
            <strong>{UpperCaseFirstLetter(format(currentDate, dateFormat, { locale: mn }))}-р сар</strong>
          </span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">
            <strong>{`>`}</strong>
          </div>
        </div>
      </div>
    )
  }

  const renderDays = () => {
    const days = []
    const dateFormat = "EEEEEE" // "Да", "Мя", etc.
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
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })

    const dateFormat = "d"
    const rows = []

    let days = []
    let day = startDate
    let formattedDate = ""

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat)
        const cloneDay = startOfDay(day)

        const textColor = isDarkColor(lightenColor(mainColor ?? "", 60) ?? "") ? "#FFFFFF" : "#000000"
        const eventsForDay = events?.filter((event) => isSameDay(event.date, day)) || []
        const displayedEvents = eventsForDay.slice(0, 3) // Limit to 3 events

        days.push(
          <div
            className={`col cell ${!isSameMonth(day, monthStart) ? "disabled" : selectedDate && isSameDay(day, selectedDate) ? "selected" : ""}`}
            style={{
              backgroundColor: selectedDate && isSameDay(day, selectedDate) ? lightenColor(mainColor ?? "", 60) : "",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              color: !isSameMonth(day,monthStart) ? "" : textColor,
            }}
            key={day.toString()}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <div className="events-container" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: "5px" }}>
              {displayedEvents.map((event, index) => (
                <div
                  key={index}
                  className="event-circle"
                  style={{
                    backgroundColor: event.color ?? "#007bff",
                    borderRadius: "50%",
                    width: "5px",
                    height: "5px",
                    margin: "2px",
                  }}
                ></div>
              ))}
            </div>
            {eventsForDay.length > 3 && (
              <div className="more-events" style={{ fontSize: "10px", marginTop: "35px", position: "absolute"}}>
                +{eventsForDay.length - 3}
              </div>
            )}
          </div>
        )
        day = startOfDay(addDays(day, 1))
      }
      rows.push(
        <div className="row" key={day.toString()}>
          {days}
        </div>
      )
      days = []
    }
    return <div className="body">{rows}</div>
  }

  const onDateClick = (day: Date) => {
    setSelectedDate(day)
    onClickDate(day)
  }

  const nextMonth = () => {
    setCurrentDate(startOfDay(addMonths(currentDate, 1)))
  }

  const prevMonth = () => {
    setCurrentDate(startOfDay(subMonths(currentDate, 1)))
  }

  return (
    <div className="small-calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  )
}

export default SmallCalendar
