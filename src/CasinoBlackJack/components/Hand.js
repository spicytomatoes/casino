import React from "react";
import uuid from "uuid";
import Card from "./Card";
import { checkScore } from "../utils/utils";

const Hand = ({ hand }) => {
  return (
    <div>
      {hand.length > 0
        ? hand.map(({ value, suit, isOpen }) =>
            isOpen ? (
              <Card key={uuid()} value={value} suit={suit} />
            ) : (
              "Card Back"
            )
          )
        : "empty hand"}{" "}
      <br />
      {hand.every(card => card.isOpen) && hand.length > 0
        ? checkScore(hand)
        : null}
    </div>
  );
};

export default Hand;
