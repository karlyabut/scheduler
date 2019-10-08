import { useEffect, useReducer } from 'react';
import axios from 'axios';

export function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOT = "SET_SPOT";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: action.value
        }
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.value[0].data,
          appointments: action.value[1].data,
          interviewers: action.value[2].data
        }
      case SET_INTERVIEW: {
        return {
          ...state,
          appointments: action.value
        }
      }
      case SET_SPOT: {
        return {
          ...state,
          days: action.value
        }
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }


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
        axios.get("/api/days")
      ),
      Promise.resolve(
        axios.get("/api/appointments")
      ),
      Promise.resolve(
        axios.get("/api/interviewers")
      )
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        value: all
      });
    });
  }, [])
  //RESET DB
  // axios.get("/api/debug/reset")
  const getDayIndex = date => {
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    return weekDays.indexOf(date);
  }
  
  function bookInterview(id, interview) {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // setState({ ...state, appointments});
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(response => {
      if(!state.appointments[id].interview) {
        let tempD = {...state};
        console.log(state.appointments[id].interview);
        tempD.days[getDayIndex(tempD.day)].spots -= 1
        console.log(tempD)
        dispatch({
          type: SET_SPOT,
          value: tempD.days
        })
      }
      // spots: state.days[getDayIndex(state.day)].spots - 1;
      // console.log("-->", state.appointments[0].interview)
      dispatch({
        type: SET_INTERVIEW,
        value: appointments
      })
      // console.log(response);
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
    return axios.delete(`/api/appointments/${id}`)
    .then(response => {
      dispatch({
        type: SET_INTERVIEW,
        value: appointments
      })
      let tempD = {...state};
      console.log(state.appointments[id].interview)
      tempD.days[getDayIndex(tempD.day)].spots += 1
      dispatch({
        type: SET_SPOT,
        value: tempD.days
      })
    });
  }

  return {state, setDay, bookInterview, deleteInterview}
}