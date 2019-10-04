export function getAppointmentsForDay(state, day) {
  const appointmentsOnDay = [];
  const appointmentDay = state.days.filter(forDay => forDay.name === day);
  for(let appointment of appointmentDay) {
    appointment.appointments.forEach(element => {
      if(appointment.appointments){
        appointmentsOnDay.push(state.appointments[element])
      } else {
        return [];
      }
    })
  }
  return appointmentsOnDay;
}

export function getInterview(state, interview) {
  if(interview) {
    return {interviewer: {...state.interviewers[interview.interviewer]}, 
      student: interview.student};
  } else {
    return null;
  }
}