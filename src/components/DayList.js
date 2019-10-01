import React from "react";
import className from "classnames/bind";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const days = props.days.map(day => {
    // console.log("asdas", props.days);
    return (
      <DayListItem 
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    )
  })
  return days;
}