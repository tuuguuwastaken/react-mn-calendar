import "./App.css"
import Calendar from "./Components/Calendar/Calendar"
import MonthPicker from "./Components/MonthPicker/MonthPIcker"
import SmallCalendar from "./Components/SmallCalendar/Calendar"

const App = () => {

  const events = [
    { date: new Date(2024, 7, 20), color: "#ff0000" },
    { date: new Date(2024, 7, 22), color: "#00ff00" },
    { date: new Date(2024, 7, 20), color: "#ff0000" },
    { date: new Date(2024, 7, 22), color: "#00ff00" },
    { date: new Date(2024, 7, 21) },
    { date: new Date(2024, 7, 25) },
    { date: new Date(2024, 7, 25) },
    { date: new Date(2024, 7, 25) },
    { date: new Date(2024, 7, 25) },
    { date: new Date(2024, 7, 25) },
    { date: new Date(2024, 7, 25) },
    { date: new Date(2024, 7, 22), color: "#00ff00" },
    { date: new Date(2024, 7, 22), color: "#00ff00" },
    { date: new Date(2024, 7, 22), color: "#00ff00" },
    { date: new Date(2024, 7, 22), color: "#00ff00" },

    // More events...
  ]

  return (
    <div style={{width: "900px", display: "flex", flexDirection: "column", gap: 40 }}>
      <Calendar mainColor={"#389E0D"} events={[]}></Calendar>
      <MonthPicker
        mainColor={"#389E0D"}
        onClickMonth={function (val: Date): void {
          console.log(val)
        }}
      />
      <SmallCalendar
        events={events}
        mainColor={"#389E0D"}
        onClickDate={function (val: Date): void {
          console.log(val)
        }}
      />
    </div>
  )
}

export default App
