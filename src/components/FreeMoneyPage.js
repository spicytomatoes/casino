import React from "react";
import { connect } from "react-redux";
import { startAddMoney, startAddCounter } from "../actions/money";

const FreeMoneyPage = ({ startAddMoney, startAddCounter }) => (
  <div>
    <button
      onClick={() => {
        startAddCounter();
        startAddMoney(1000);
      }}
    >
      Click me to get $1000
    </button>
  </div>
);

const mapDispatchToProps = dispatch => ({
  startAddMoney: amount => dispatch(startAddMoney(amount)),
  startAddCounter: () => dispatch(startAddCounter())
});

export default connect(
  undefined,
  mapDispatchToProps
)(FreeMoneyPage);
