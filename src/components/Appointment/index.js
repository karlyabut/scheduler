import React, { Fragment } from "react";
import "components/Appointment/style.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment(props) {

  const appointment = props.interview ? 
  <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> :
  <Empty />;
  return (  
    <Fragment>
      <Header time={props.time}/>
      {appointment}
    </Fragment>
    )
}