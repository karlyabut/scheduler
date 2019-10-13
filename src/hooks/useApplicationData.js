import { useEffect, useReducer } from 'react';
import Axios from 'axios';
import { reducer, SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, SET_SPOT } from "reducers/application"

export function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => dispatch({
    type: SET_DAY,
    value: day
  });
  
  //API CALLS
  useEffect(() => {
    Promise.all([
      Promise.resolve(
        Axios.get("/api/days")
      ),
      Promise.resolve(
        Axios.get("/api/appointments")
      ),
      Promise.resolve(
        Axios.get("/api/interviewers")
      )
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        value: all
      });
    })
    .catch(err => {
      console.error(err);
    });
  }, [])

  const getDayIndex = date => {
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    return weekDays.indexOf(date);
  }
  
  //Adding appointment
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Axios.put(`/api/appointments/${id}`, appointment)
    .then((response) => {
      if(!state.appointments[id].interview) {
        let tempD = {...state};
        tempD.days[getDayIndex(tempD.day)].spots -= 1
        dispatch({
          type: SET_SPOT,
          value: tempD.days
        })
      }
      dispatch({
        type: SET_INTERVIEW,
        value: appointments
      })
    })
  }
  
  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // setState({ ...state, appointments});
    return Axios.delete(`/api/appointments/${id}`)
    .then(response => {
      dispatch({
        type: SET_INTERVIEW,
        value: appointments
      })
      let tempD = {...state};
      tempD.days[getDayIndex(tempD.day)].spots += 1
      dispatch({
        type: SET_SPOT,
        value: tempD.days
      })
    })
  }

  return {state, setDay, bookInterview, deleteInterview}
}