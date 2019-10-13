import React, { Fragment } from "react";
import "components/Appointment/style.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  //ERRORS
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const {mode, transition, back } = useVisualMode( 
    props.interview ? SHOW : EMPTY
  );
  
  //RENDER edit view IF clicked on edit button...
  function edit() {
    transition(EDIT);
  }
  //THEN apply save functionality
  function save(name, interviewer) {
    transition(SAVING, true);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    }).catch(error => {
      transition(ERROR_SAVE, true);
    })
  }

  //RENDER confirm view first..
  function deleteInterview() {
    transition(CONFIRM);
  }
  //THEN apply delete functionality
  function confirmDelete() {
    transition(DELETING, true);
    props.deleteInterview(props.id).then(() => {
      transition(EMPTY);
    }).catch(error => {
      transition(ERROR_DELETE, true);
    })
  }

  return (  
    <Fragment>
      <article data-testid="appointment">
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
        message={"Are you sure you would like to delete?"}
        onConfirm={confirmDelete}
        onCancel={back}
        />
      }
      {mode === ERROR_SAVE && <Error message={"Could not save appointment"} onClose={back}/>}
      {mode === ERROR_DELETE && <Error message={"Could not delete appointment"} onClose={back}/>}
      </article>
    </Fragment>
  )
}