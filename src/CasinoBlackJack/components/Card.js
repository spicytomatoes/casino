import React from "react";
import { icon } from "../utils/utils";

const Card = ({ value, suit }) => {
  return (
    <div>
      {value} {icon(suit)}
    </div>
  );
};

export default Card;
