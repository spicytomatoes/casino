import React from "react";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  componentDidMount() {
    document.title = "Ian's Casino";
  }
  render() {
    return (
      <div className="content-container">
        <div className="box">
          <h1 className="box__title">Choose a game:</h1>
          <div className="box__content">
            <Link className="box__content-item" to="/casino-black-jack">
              <img
                src="images/blackjack-logo.jpg"
                className="box__content-item"
              />
              <h3 className="box_content-item--title">
                Casino-style Blackjack
              </h3>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
