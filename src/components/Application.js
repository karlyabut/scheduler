import React, { useState, useEffect } from "react";
import { Promise } from "q";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersByDay } from "helpers/selectors";
import { useApplicationData } from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();
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

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // })
  // const setDay = day => setState({...state, day});

  // //API CALLS
  // useEffect(() => {
  //   Promise.all([
  //     Promise.resolve(
  //       axios.get("/api/days")
  //     ),
  //     Promise.resolve(
  //       axios.get("/api/appointments")
  //     ),
  //     Promise.resolve(
  //       axios.get("/api/interviewers")
  //     )
  //   ]).then((all) => {
  //     setState(prev => ({
  //       day: "Monday",
  //       days: all[0].data,
  //       appointments: all[1].data,
  //       interviewers: all[2].data
  //     }))
  //   });
  // }, [])
  //RESET DB
  // axios.get("/api/debug/reset")

  // function bookInterview(id, interview) {
  //   console.log(id, interview);
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   // setState({ ...state, appointments});
  //   return axios.put(`/api/appointments/${id}`, {
  //     interview
  //   })
  //   .then(response => {
  //     console.log(response);
  //   })
  // }

  // function deleteInterview(id) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   // setState({ ...state, appointments});
  //   return axios.delete(`/api/appointments/${id}`)
  //   .then(response => {
  //     console.log(response);
  //   });
  // }
  // console.log()


  const interviewerIDs = getInterviewersByDay(state, state.day);
  const interviewers = interviewerIDs.map(interviewer => state.interviewers[interviewer]);

  const appointmentList = getAppointmentsForDay(state, state.day)
  .map(appointment => {
    const interview = getInterview(state, appointment.interview);
      return (
        <Appointment
          bookInterview={bookInterview}
          deleteInterview={deleteInterview}
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
        />
      );
  });

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
          days={state.days}
          day={state.day}
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
        {/* <Appointment key="last" time="5pm"/> */}
      </section>
    </main>
  );
}
