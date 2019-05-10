import React from "react";

const EndGamePanel = ({ message, handleNewRound }) => {
  return (
    <div>
      <h3>{message}</h3>
      <button onClick={handleNewRound}>Next Round</button>
    </div>
  );
};

export default EndGamePanel;
