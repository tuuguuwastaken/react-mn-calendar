# Big Calendar React

`react-mn-calendar` is a customizable React calendar component library that includes two calendar components: `Calendar` and `SmallCalendar`. This library provides flexible calendar solutions with easy integration and style customization.

## Installation

To install `react-mn-calendar` in your React project, use npm or yarn:

```bash
npm install react-mn-calendar
```

or

```bash
yarn add react-mn-calendar
```

# Usage

## Importing components

You can import and use the Calendar and SmallCalendar components as follows:

```js
import React from 'react';
import { Calendar, SmallCalendar } from 'react-mn-calendar';
import 'react-mn-calendar/dist/Calendar/CalendarStyle.css'; // Import styles for Calendar
import 'react-mn-calendar/dist/SmallCalendar/CalendarStyle.css'; // Import styles for SmallCalendar

const App = () => {
  const events = [
    { id: '1', title: 'Event 1', date: '2024-08-10', color: '#ff0000' },
    { id: '2', title: 'Event 2', date: '2024-08-15', color: '#00ff00' },
    { id: '3', title: 'Event 3', date: '2024-08-15', color: '#0000ff' },
    { id: '4', title: 'Event 4', date: '2024-08-15', color: '#ffff00' }
  ];

  return (
    <div>
      <h1>My Calendar App</h1>
      <Calendar events={events} />
      <SmallCalendar events={events} />
    </div>
  );
};

export default App;

```

# Calendar Component

## The Calendar component displays a full-sized calendar view.

**Event Props:**
  - id (string): Unique identifier for the event.
  - title (string): Title of the event.
  - date (string): Event date in ISO string format.
  - color (string, optional): Background color for the event.
  - data (any, optional): add Data to your object if need be.


**Calendar Props**
 - onDateClick: return a Date object
 - onEventClick: returns a Event object as mention in the Event Props section
 - renderHeader : function to render your own header for the calendar (**only on the normal Calendar**)


**Example:**
## Custom Header example
```js

interface CustomHeaderProps {
  currentDate: Date
  prevMonth: () => void
  nextMonth: () => void
  setCurrentDate: (date: Date) => void
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ currentDate, prevMonth, nextMonth, setCurrentDate }) => {
  const UpperCaseFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  return (
    <div className="custom-header">
      <button onClick={prevMonth}>Previous</button>
      <span>{currentDate}</span>
      <button onClick={nextMonth}>Next</button>
      <button onClick={() => setCurrentDate(new Date())}>Today</button>
    </div>
  )
}


function App() {

  const events = [
    { id: "1", title: "Event 1", date: "2024-08-10", color: "#FF5733" }, // Example: red-orange
    { id: "2", title: "Event 2", date: "2024-08-15", color: "#33FF57" }, // Example: green
    { id: "3", title: "Event 3", date: "2024-08-15", color: "#3357FF" }, // Example: blue
    { id: "4", title: "Event 4", date: "2024-08-15", color: "#FF33A5" }, // Example: pink
  ]

  const handleDateClick = (day: Date) => {
    console.log("Date clicked:", day)
  }

  const handleEventClick = (event: any) => {
    console.log(event)
  }

  return (
    <div className="App">
        <BigCalendar
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
          renderHeader={(currentDate, prevMonth, nextMonth, setCurrentDate) => (
            <CustomHeader currentDate={currentDate} prevMonth={prevMonth} nextMonth={nextMonth} setCurrentDate={setCurrentDate} />
          )}
        />
    </div>
  )
}

export default App
```


# License

This project is licensed under the MIT License.

**Contributing**

Contributions are welcome! Please fork the repository and submit a pull request. Ensure that your changes adhere to the project's coding standards and include tests where applicable.

[Git repository](https://github.com/tuuguuwastaken/react-mn-calendar)

**Issues**

If you encounter any issues or have feature requests, please open an issue on the GitHub repository.

**Acknowledgements**

Thanks to all contributors and libraries that made this project possible.

- currently me