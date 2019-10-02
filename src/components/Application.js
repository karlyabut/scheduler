import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import axios from "axios";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Irelia",
      interviewer: {
        id: 1,
        name: "Darius",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Master Yi",
      interviewer: {
        id: 1,
        name: "Cho'Gath",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  }
];

export default function Application(props) {
  //SAMPLEEES
  // //UPDATE an Appointment
  // axios
  // .put(`/api/appointments/2`, {
  //   id: 2,
  //   time: "1pm",
  //   interview: {
  //     student: "Archie Cohen",
  //     interviewer: 9,
  //   },
  // })
  // .then((response) => {
  //   console.log(response);
  // });
  // //ERROR handling
  // axios
  // .get("/api/appointments")
  // .then((response) => {
  //   console.log(response);
  // })
  // .catch((error) => {
  //   console.log(error.response.status);
  //   console.log(error.response.headers);
  //   console.log(error.response.data);
  // });

  const [days, setDays] = useState([]);
  const [day, setDay] = useState("Monday");

  //GET Days
  useEffect(() => {
    axios.get("/api/days").then((response) => {
      setDays(response.data)
    });
  }, [])

  const appointmentList = appointments.map(appointment => {
    return (
    <Appointment key={appointment.id} {...appointment} />
    );
  })

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={days}
          day={day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointmentList}
      </section>
    </main>
  );
}
