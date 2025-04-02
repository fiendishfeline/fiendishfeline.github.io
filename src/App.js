import "./styles.css";
import { Button } from "react-bootstrap";
import { useState } from "react";

export default function App() {
  return (
    <div className="App">
      <h1>Anika's Calendar</h1>
      <Calendar />
      <Events />
    </div>
  );
}

function Calendar() {
  let dateNum = 1;
  let firstDay = new Date("2023-02-10"),
    firstWeekDay;
  let i;
  let lastDate;
  let month = [];
  let week = [];
  firstDay.setDate(1);
  lastDate = new Date(firstDay.getTime());
  lastDate.setMonth(lastDate.getMonth() + 1); // the first day of the next month
  lastDate = new Date(lastDate.getTime() - 86400000); //the first day of the next month minus 1 day
  firstWeekDay = firstDay.getDay();

  for (i = 0; i < firstWeekDay; i++) {
    week.push("");
  }
  for (i = firstWeekDay; i < 7; i++) {
    week.push(dateNum++);
  }
  month.push(week);

  while (dateNum <= lastDate.getDate()) {
    week = [];
    for (i = 0; i < 7; i++) {
      if (dateNum <= lastDate.getDate()) {
        week.push(dateNum++);
      } else {
        week.push("");
      }
    }
    month.push(week);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td
              style={{
                fontWeight: 600,
                textDecoration: "underline",
                backgroundColor: "pink",
              }}
            >
              Sun
            </td>
            <td
              style={{
                fontWeight: 600,
                textDecoration: "underline",
                backgroundColor: "lightcoral",
              }}
            >
              Mon
            </td>
            <td
              style={{
                fontWeight: 600,
                textDecoration: "underline",
                backgroundColor: "pink",
              }}
            >
              Tue
            </td>
            <td
              style={{
                fontWeight: 600,
                textDecoration: "underlin",
                backgroundColor: "lightcoral",
              }}
            >
              Wed
            </td>
            <td
              style={{
                fontWeight: 600,
                textDecoration: "underline",
                backgroundColor: "pink",
              }}
            >
              Thu
            </td>
            <td
              style={{
                fontWeight: 600,
                textDecoration: "underline",
                backgroundColor: "lightcoral",
              }}
            >
              Fri
            </td>
            <td
              style={{
                fontWeight: 600,
                textDecoration: "underline",
                backgroundColor: "pink",
              }}
            >
              Sat
            </td>
          </tr>
        </thead>
        {month.map((week) => (
          <tr>
            {week.map((day) => (
              <td id={`${day}`} style={{ backgroundColor: "#a94064" }}>
                {day}
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}

function Events() {
  let [eventName, setEventName] = useState("");
  let [eventDate, setEventDate] = useState("");
  let [eventList, setEventList] = useState([]);

  const addEvent = () => {
    const dateParts = eventDate.split("-");
    const dateObject = new Date(dateParts[2], dateParts[0], dateParts[1]);
    console.log(eventList);
    console.log("****");
    setEventList([...eventList, { date: dateObject, name: eventName }]);
    // eventList.sort(({ date1, name1 }, { date2, name2 }) => {
    //   return date2 - date1;
    // });
    console.log(eventList);
    console.log("----");

    setEventName("");
    setEventDate("");
  };

  const handleEventNameChange = (event) => {
    const value = event.target.value;
    setEventName(value);
  };

  const handleEventDateChange = (event) => {
    const value = event.target.value;
    setEventDate(value);
  };

  return (
    <div>
      <div>
        <div className="dialog">Event name </div>
        <input onChange={handleEventNameChange} value={eventName} />
        <div className="dialog">Event date(ex. mm-dd-yyyy)</div>
        <input onChange={handleEventDateChange} value={eventDate} />
      </div>
      <Button onClick={addEvent}>Add Event</Button>
      <div>
        {eventList.map(({ date, name }) => (
          <div>{`${date.getMonth()}-${date.getDate()}-${date.getFullYear()}: ${name}`}</div>
        ))}
      </div>
    </div>
  );
}
