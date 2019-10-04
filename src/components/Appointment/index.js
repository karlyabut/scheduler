import React, { Fragment } from "react";
import "components/Appointment/style.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import { useVisualMode } from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const {mode, transition, back } = useVisualMode( 
    props.interview ? SHOW : EMPTY
  );
  // const appointment = props.interview ? useVisualMode(SHOW):
  // // <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> :
  // // <Empty />;
  // useVisualMode(EMPTY)
  return (  
    <Fragment>
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={props.onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={[]}
          onSave={action("onSave")}
          onCancel={back}
        />
      )}
    </Fragment>
    )
}