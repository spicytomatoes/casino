import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div>
    <h3>Choose a game:</h3>
    <div>
      <Link to="/casino-black-jack">Casino-style Black Jack</Link>
    </div>
  </div>
);

export default HomePage;
