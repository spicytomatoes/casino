import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import Hand from "./Hand";
import PutBetsPanel from "./PutBetsPanel";
import InPlayPanel from "./InPlayPanel";
import EndGamePanel from "./EndGamePanel";
import { getDeck, draw, checkScore, checkResult } from "../utils/utils";
import { startDeductMoney, startAddMoney } from "../../actions/money";

export class CasinoBlackJack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: [],
      dealer: [],
      player: [],
      stage: "BETTING",
      bet: "",
      multiplyer: 1,
      endGameMessage: ""
    };
    this.handleNewRound = this.handleNewRound.bind(this);
    this.handleSetBet = this.handleSetBet.bind(this);
    this.startGame = this.startGame.bind(this);
    this.startDeal = this.startDeal.bind(this);
    this.playerDraw = this.playerDraw.bind(this);
    this.dealerDraw = this.dealerDraw.bind(this);
    this.handleDouble = this.handleDouble.bind(this);
    this.handleStand = this.handleStand.bind(this);
    this.shouldDealerDraw = this.shouldDealerDraw.bind(this);
    this.endGame = this.endGame.bind(this);
  }
  handleNewRound() {
    this.setState({
      deck: [],
      dealer: [],
      player: [],
      multiplyer: 1,
      stage: "BETTING",
      endGameMessage: ""
    });
  }
  handleSetBet(bet) {
    this.setState({ bet, stage: "DEALING" });
    this.props.startDeductMoney(bet);
    this.startGame();
  }
  startGame() {
    this.setState({ deck: getDeck() }, () => {
      this.startDeal();
    });
  }
  startDeal() {
    setTimeout(() => {
      this.playerDraw();
    }, 500);
    setTimeout(() => {
      this.dealerDraw();
    }, 1000);
    setTimeout(() => {
      this.playerDraw();
    }, 1500);
    setTimeout(() => {
      this.dealerDraw(false);
      if (checkScore(this.state.player) === "BLACKJACK") {
        this.handleStand();
      } else {
        this.setState({ stage: "PLAYING" });
      }
    }, 2000);
  }
  playerDraw() {
    let deck = this.state.deck;
    let player = this.state.player;

    draw(player, deck, true);
    this.setState({ player, deck });

    if (checkScore(player) === "BURST") {
      this.handleStand();
    }
  }
  dealerDraw(isOpen = true) {
    let deck = this.state.deck;
    let dealer = this.state.dealer;

    draw(dealer, deck, isOpen);

    this.setState({ dealer, deck });
  }
  handleDouble() {
    this.props.startDeductMoney(this.state.bet);
    this.setState({ multiplyer: 2 }, () => {
      this.playerDraw();
      if (checkScore(this.state.player) !== "BURST") {
        this.handleStand();
      }
    });
  }
  handleStand() {
    this.setState(prevState => {
      let dealer = prevState.dealer;
      dealer[1].isOpen = true;
      return { dealer, stage: "DEALER_DRAWING" };
    });
    this.shouldDealerDraw();
  }
  shouldDealerDraw() {
    let dealerScore = checkScore(this.state.dealer);
    const playerScore = checkScore(this.state.player);
    if (dealerScore[0] === "s") {
      dealerScore = Number(dealerScore.slice(-2));
    }
    if (
      dealerScore > 16 ||
      dealerScore === "BURST" ||
      dealerScore === "BLACKJACK" ||
      playerScore === "BURST" ||
      playerScore === "BLACKJACK"
    ) {
      this.endGame();
    } else {
      setTimeout(() => {
        this.dealerDraw();
        this.shouldDealerDraw();
      }, 700);
    }
  }
  endGame() {
    const dealerScore = checkScore(this.state.dealer);
    const playerScore = checkScore(this.state.player);
    const result = checkResult(playerScore, dealerScore);
    const bet = this.state.bet * this.state.multiplyer;
    let winnings, profit, lostAmount;

    this.setState({ stage: "END_GAME" });

    switch (result) {
      case "BLACKJACK":
        winnings = bet * 2.5;
        profit = bet * 1.5;
        this.props.startAddMoney(winnings);
        this.setState({
          endGameMessage: `YOU WON ${numeral(profit).format("$0,0.00")}!`
        });
        break;
      case "WIN":
        winnings = bet * 2;
        profit = bet;
        this.props.startAddMoney(winnings);
        this.setState({
          endGameMessage: `YOU WON ${numeral(profit).format("$0,0.00")}!`
        });
        break;
      case "TIE":
        winnings = Number(bet);
        this.props.startAddMoney(winnings);
        this.setState({ endGameMessage: "TIE" });
        break;
      case "LOSE":
        lostAmount = bet;
        this.setState({
          endGameMessage: `YOU LOST ${numeral(lostAmount).format("$0,0.00")}`
        });
        break;
      default:
        console.log("error at switch at endGame");
    }
  }
  getPanel() {
    switch (this.state.stage) {
      case "BETTING":
        return (
          <PutBetsPanel
            handleSetBet={this.handleSetBet}
            money={this.props.money}
            bet={this.state.bet}
          />
        );
      case "DEALING":
        return (
          <div>
            <h3>dealing cards...</h3>
          </div>
        );
      case "PLAYING":
        console.log(this.props.money, this.state.bet);
        return (
          <InPlayPanel
            handleStand={this.handleStand}
            handleHit={this.playerDraw}
            handleDouble={this.handleDouble}
            player={this.state.player}
            canDouble={this.props.money >= this.state.bet}
          />
        );
      case "DEALER_DRAWING":
        return (
          <div>
            <h3>dealer drawing...</h3>
          </div>
        );
      case "END_GAME":
        return (
          <EndGamePanel
            message={this.state.endGameMessage}
            handleNewRound={this.handleNewRound}
          />
        );
      default:
        return <p>something is wrong.</p>;
    }
  }

  render() {
    return (
      <div className="content-container">
        <div className="box">
          <Hand hand={this.state.dealer} />
          <br />
          <Hand hand={this.state.player} />
          <div>
            Bet:{" "}
            {this.state.bet
              ? numeral(this.state.bet * this.state.multiplyer).format(
                  "$0,0.00"
                )
              : null}
          </div>
          {this.getPanel()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  money: state.money
});

const mapDispatchToProps = dispatch => ({
  startAddMoney: winnings => {
    dispatch(startAddMoney(winnings));
  },
  startDeductMoney: bet => {
    dispatch(startDeductMoney(bet));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CasinoBlackJack);
