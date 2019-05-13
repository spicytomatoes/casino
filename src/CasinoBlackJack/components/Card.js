import React from "react";
import { icon } from "../utils/utils";

const Card = ({ value, suit }) => {
  return (
    <div className="hand__card">
      <div className="hand__card--value">{value} </div>
      <div className="hand__card--suit">{icon(suit)}</div>
    </div>
  );
};

export default Card;
