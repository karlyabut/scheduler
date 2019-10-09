import React from "react";
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
