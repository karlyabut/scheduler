import React, { Fragment } from "react";
import "components/Appointment/style.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import { useVisualMode } from "hooks/useVisualMode";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const {mode, transition, back } = useVisualMode( 
    props.interview ? SHOW : EMPTY
  );

  function edit() {
    transition(EDIT);  console.log("?????",props.interview.interviewer.id)
  }

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    });
    console.log("?", props.id, interview);
  }

  function deleteInterview() {
    transition(CONFIRM);
  }

  function confirmDelete() {
    transition(DELETING)
    props.deleteInterview(props.id).then(() => {
      transition(EMPTY);
    })
  }
  return (  
    <Fragment>
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && 
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        onEdit={edit}
        onDelete={deleteInterview}
        />
      }
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving"}/> }
      {mode === DELETING && <Status message={"Deleting"}/>}
      {mode === CONFIRM && 
        <Confirm 
        message={"Delete the appointment?"}
        onConfirm={confirmDelete}
        onCancel={back}
        />
      }
    </Fragment>
    )
}