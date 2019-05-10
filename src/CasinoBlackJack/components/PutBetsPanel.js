import React from "react";

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bet: this.props.bet,
      error: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  handleChange(e) {
    const bet = e.target.value;
    this.setState({ bet });
  }
  handleOnSubmit(e) {
    e.preventDefault();
    const bet = this.state.bet;
    if (bet > 0 && bet <= this.props.money) {
      this.setState({ error: "" });
      this.props.handleSetBet(bet);
    } else if (!bet || bet <= 0) {
      this.setState({ error: "Bets must have a valid value of more than 0" });
    } else if (bet > this.props.money) {
      this.setState({ error: "Insufficient money!" });
    } else {
      this.setState({ error: "unknown error" });
    }
  }
  render() {
    return (
      <div>
        <p>{this.state.error}</p>
        <form onSubmit={this.handleOnSubmit}>
          <input
            type="number"
            value={this.state.bet}
            onChange={this.handleChange}
            placeholder="put your bets here"
          />
          <button>Put Bets</button>
        </form>
      </div>
    );
  }
}
