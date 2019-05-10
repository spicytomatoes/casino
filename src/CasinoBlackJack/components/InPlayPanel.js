import React from "react";

export const InPlayPanel = ({
  handleStand,
  handleHit,
  handleDouble,
  player
}) => {
  return (
    <div>
      <button onClick={handleHit}>Hit</button>
      <button onClick={handleStand}>Stand</button>
      {player.length === 2 ? (
        <button onClick={handleDouble}>Double</button>
      ) : null}
    </div>
  );
};

export default InPlayPanel;
