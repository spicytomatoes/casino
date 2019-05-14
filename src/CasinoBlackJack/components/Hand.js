import React from "react";
import uuid from "uuid";
import Card from "./Card";
import { checkScore } from "../utils/utils";

const Hand = ({ hand }) => {
  return (
    <div>
      <div className="hand">
        {hand.length > 0
          ? hand.map(({ value, suit, isOpen }) =>
              isOpen ? (
                <Card key={uuid()} value={value} suit={suit} />
              ) : (
                <img
                  src="/images/card-back.jpg"
                  className="hand__card--back"
                  key={uuid()}
                />
              )
            )
          : ""}
      </div>
      <div>
        Score:{" "}
        {hand.length > 0
          ? hand.every(card => card.isOpen)
            ? checkScore(hand)
            : checkScore([hand[0]])
          : null}
      </div>
    </div>
  );
};

export default Hand;
