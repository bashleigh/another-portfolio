import React from "react";
import "./football.scss";

export const Football = () => {
  return (
    <div
      id="football"
      onClick={event => {
        console.log(event.target, event.pageX, event.pageY);
      }}
    ></div>
  );
};
