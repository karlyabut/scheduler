import React, { Fragment } from "react";
import "components/Appointment/style.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import { useVisualMode } from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const {mode, transition, back } = useVisualMode( 
    props.interview ? SHOW : EMPTY
  );
  // const appointment = props.interview ? useVisualMode(SHOW):
  // // <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> :
  // // <Empty />;
  // useVisualMode(EMPTY)
  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    // setTimeout(() => {
    // }, 1000);
    props.bookInterview(props.id, interview)
    .then((response) => {
      console.log(response)
    });
    // console.log("?", props.id, interview);
  }

  return (  
    <Fragment>
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && 
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        />
      }
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving"}/> }
    </Fragment>
    )
}