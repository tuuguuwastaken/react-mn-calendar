import React, { useState } from "react"
import { format, addMonths, subMonths, startOfYear, endOfYear, startOfMonth, endOfMonth } from "date-fns"
import { mn } from "date-fns/locale"
import "../CalendarStyle.css"

interface Theme {
  mainColor?: string | null
  onClickMonth: (val: Date) => void
}

const MonthPicker: React.FC<Theme> = ({ mainColor = "#007bff", onClickMonth }) => {
  const [currentDate, setCurrentDate] = useState(startOfMonth(new Date()))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const UpperCaseFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
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

  const textColors = isDarkColor(mainColor ?? "") ? "#FFFFFF" : "#000000"

  const renderHeader = () => {
    const dateFormat = "yyyy"
    return (
      <div className="header row flex-middle" style={{ backgroundColor: mainColor ? mainColor : "", color: textColors }}>
        <div className="col col-start">
          <div className="icon" onClick={prevYear}>
            <strong>{`<`}</strong>
          </div>
        </div>
        <div className="col col-center">
          <span><strong>{UpperCaseFirstLetter(format(currentDate, dateFormat, { locale: mn }))} он</strong></span>
        </div>
        <div className="col col-end" onClick={nextYear}>
          <div className="icon"><strong>{`>`}</strong></div>
        </div>
      </div>
    )
  }

  const renderMonths = () => {
    const rows = []
    const dateFormat = "M"
    const startDate = startOfYear(currentDate)
    let months = []

    for (let i = 0; i < 12; i++) {
      const monthDate = addMonths(startDate, i)
      const isSelected =
        selectedDate &&
        startOfMonth(monthDate).getMonth() === selectedDate.getMonth() &&
        startOfMonth(monthDate).getFullYear() === selectedDate.getFullYear()
      
      const textColors = isDarkColor(lightenColor(mainColor ?? "", 60)) ? "#FFFFFF" : "#000000"

      const monthCell = (
        <div
          className={`col cell ${isSelected ? "selected" : ""}`}
          style={{
            backgroundColor: isSelected ? lightenColor(mainColor ?? "", 60) : "",
            color:textColors,
          }}
          key={monthDate.toString()}
          onClick={() => onMonthClick(monthDate)}
        >
          <span className="number">{format(monthDate, dateFormat, { locale: mn })}</span>
        </div>
      )

      if (i % 4 === 0 && months.length > 0) {
        rows.push(
          <div className="row" key={`row-${i / 4}`}>
            {months}
          </div>
        )
        months = []
      }
      months.push(monthCell)
    }

    if (months.length > 0) {
      rows.push(
        <div className="row" key="row-last">
          {months}
        </div>
      )
    }

    return <div className="months">{rows}</div>
  }

  const onMonthClick = (month: Date) => {
    setSelectedDate(month)
    onClickMonth(month)
  }

  const nextYear = () => {
    setCurrentDate(startOfYear(addMonths(currentDate, 12)))
  }

  const prevYear = () => {
    setCurrentDate(startOfYear(subMonths(currentDate, 12)))
  }

  return (
    <div className="month-picker">
      {renderHeader()}
      {renderMonths()}
    </div>
  )
}

export default MonthPicker
