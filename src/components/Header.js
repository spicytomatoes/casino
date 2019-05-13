import React from "react";
import numeral from "numeral";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { startLogout } from "../actions/auth";

export const Header = ({ startLogout, money }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/home">
          <h1>Fake Ass Casino</h1>
        </Link>
        <div className="buttons buttons--link">
          <div>Money:</div>
          <div>{money}</div>
        </div>

        <button className="buttons buttons--link" onClick={startLogout}>
          Logout
        </button>
      </div>
    </div>
  </header>
);

const mapStateToProps = state => ({
  money: numeral(state.money).format("$0,0.00")
});

const mapDispatchToProps = dispatch => ({
  startLogout: () => {
    dispatch(startLogout());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
