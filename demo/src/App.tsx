import { useState } from "react"
import "./App.css"
import Calendar from "./Components/Calendar/Calendar"

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div style={{width:"900px"}}>
      <Calendar events={[]}></Calendar>
    </div>
  )
}

export default App
