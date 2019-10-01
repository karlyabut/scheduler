import React from "react";
import className from "classnames/bind";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  let str = "";
  const formatSpots = () => {
    if(props.spots === 0) {
      str = "no spots remaining";
    } else if(props.spots === 1) {
      str = "1 spot remaining"
    } else {
      str = `${props.spots} spots remaining`;  
    }
    return str;
  }

  const dayClass = className("day-list__item",{
    "day-list__item--selected": props.selected, 
    "day-list__item--full": props.spots === 0
  });
  return (
    <li className={ dayClass } 
    onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(str)}</h3>
    </li>
  );
}