# Big Calendar React

`big-calendar-react` is a customizable React calendar component library that includes two calendar components: `Calendar` and `SmallCalendar`. This library provides flexible calendar solutions with easy integration and style customization.

## Installation

To install `big-calendar-react` in your React project, use npm or yarn:

```bash
npm install big-calendar-react
```

or

```bash
yarn add big-calendar-react
```

# Usage

## Importing components

You can import and use the Calendar and SmallCalendar components as follows:

```js
import React from 'react';
import { Calendar, SmallCalendar } from 'big-calendar-react';
import 'big-calendar-react/dist/BigCalendar/CalendarStyle.css'; // Import styles for Calendar
import 'big-calendar-react/dist/SmallCalendar/CalendarStyle.css'; // Import styles for SmallCalendar

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

**Props:**
  - events (array): An array of event objects with the following properties:
  - id (string): Unique identifier for the event.
  - title (string): Title of the event.
  - date (string): Event date in ISO string format.
  - color (string, optional): Background color for the event.

**Example:**
```js
<Calendar events={events} />
```
******CSS Styles******

To apply the default styles for the components, import the CSS files into your project:
```js
import 'big-calendar-react/dist/BigCalendar/CalendarStyle.css'; // Styles for Calendar
import 'big-calendar-react/dist/SmallCalendar/CalendarStyle.css'; // Styles for SmallCalendar

```

# License

This project is licensed under the MIT License. See the LICENSE file for details.

**Contributing**

Contributions are welcome! Please fork the repository and submit a pull request. Ensure that your changes adhere to the project's coding standards and include tests where applicable.

[Git repository](https://github.com/tuuguuwastaken/react-mn-calendar)

**Issues**

If you encounter any issues or have feature requests, please open an issue on the GitHub repository.

**Acknowledgements**

Thanks to all contributors and libraries that made this project possible.

- currently me