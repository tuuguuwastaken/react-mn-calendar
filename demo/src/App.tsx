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
  const events2 = [
    {
      id: "1",
      title: "Meeting with Team",
      date: "2024-08-25T10:00:00Z",
      color: "#33FF57",
      data: {
        location: "Conference Room A",
        attendees: ["John Doe", "Jane Smith", "Michael Brown"],
        description: "Discuss the Q3 project updates and deliverables.",
      },
    },
    {
      id: "2",
      title: "Doctor's Appointment",
      date: "2024-08-26T14:30:00Z",
      color: "#33FF57",
      data: {
        location: "Downtown Clinic",
        doctor: "Dr. Emily Clark",
        notes: "Routine check-up.",
      },
    },
    {
      id: "3",
      title: "Web Development Workshop",
      date: "2024-08-28T09:00:00Z",
      color: "#3357FF",
      data: {
        location: "Tech Hub",
        speaker: "Alex Johnson",
        topics: ["React", "TypeScript", "GraphQL"],
      },
    },
    {
      id: "4",
      title: "Dinner with Friends",
      date: "2024-08-29T19:00:00Z",
      color: "#FF33A2",
      data: {
        location: "The Italian Bistro",
        reservation: "7:00 PM under Jane Doe",
        notes: "Celebrating Sarah's promotion.",
      },
    },
    {
      id: "5",
      title: "Gym Session",
      date: "2024-08-30T18:00:00Z",
      color: "#FFD700",
      data: {
        location: "Fitness Center",
        trainer: "Mike Tyson",
        routine: ["Cardio", "Strength Training"],
      },
    },
    {
      id: "5",
      title: "Gym Session",
      date: "2024-08-30T18:00:00Z",
      color: "#FFD700",
      data: {
        location: "Fitness Center",
        trainer: "Mike Tyson",
        routine: ["Cardio", "Strength Training"],
      },
    },
    {
      id: "5",
      title: "Gym Session",
      date: "2024-08-30T18:00:00Z",
      color: "#FFD700",
      data: {
        location: "Fitness Center",
        trainer: "Mike Tyson",
        routine: ["Cardio", "Strength Training"],
      },
    },
    {
      id: "5",
      title: "Gym Session",
      date: "2024-08-30T18:00:00Z",
      color: "#FFD700",
      data: {
        location: "Fitness Center",
        trainer: "Mike Tyson",
        routine: ["Cardio", "Strength Training"],
      },
    },
    {
      id: "5",
      title: "Gym Session",
      date: "2024-08-30T18:00:00Z",
      color: "#FFD700",
      data: {
        location: "Fitness Center",
        trainer: "Mike Tyson",
        routine: ["Cardio", "Strength Training"],
      },
    },
  ]

  return (
    <div style={{ width: "900px", display: "flex", flexDirection: "column", gap: 40 }}>
      <Calendar mainColor={"#389E0D"} events={events2} onDateClick={(b) => console.log(b)} onEventClick={(k) => console.log(k)}></Calendar>
      <div style={{ display: "flex", justifyContent:"space-around"}}>
        <div>
          <label htmlFor="">
            with <strong>selectAble={`{true}`}</strong> true by default
          </label>
          <MonthPicker
            mainColor={"#389E0D"}
            onClickMonth={function (val: Date): void {
              console.log(val)
            }}
          />
        </div>
        <div>
          <label htmlFor="">
            with <strong>selectAble={`{false}`}</strong>
          </label>
          <MonthPicker
            mainColor={"#389E0D"}
            selectAble={false}
            onClickMonth={function (val: Date): void {
              console.log(val)
            }}
          />
        </div>
      </div>
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
