import React, { Component } from "react";
import Timer from "./components/timer";
import ShortTimer from "./components/shortTimer";
import EndWork from "./components/end";
import { Select } from "antd";
import Client from "../../modules/Client/Client";
import TopResults from "./components/topResults";
import "./math.css";

const { Option } = Select;

class Multiplication extends Component {
  constructor(props) {
    super(props);
    this.startCountingToStart = this.startCountingToStart.bind();
    this.inputResultRef = React.createRef();
    this.state = {
      game: "multiplication",
      correct: 0,
      wrong: 0,
      first: 0,
      second: 0,
      result: "",
      minutes: 1,
      seconds: 0,
      start: false,
      countDown: false,
      end: false,
      gameTimes: [
        { name: "5 min", time: 5 },
        { name: "3 min", time: 3 },
        { name: "1 min", time: 1 },
      ],
      users: [
        // { name: "Kuba", _id: "5ee13e2f7aada45bed5df5ff" },
        // { name: "Kacper", _id: "5ee13e3f7aada45bed5df600" },
        // { name: "Tata", _id: "5ee91ef6a952537aaa2e1096" },
        { name: "Kuba", _id: "5ef38941a4c7f20557132143" },
        { name: "Kacper", _id: "5ef3894ba4c7f20557132144" },
        { name: "Tata", _id: "5ef3892aa4c7f20557132142" },
        { name: "Mama", _id: "5ef38953a4c7f20557132145" },
      ],
      user: null,
    };
  }

  selectUser = (value, key) => {
    this.setState({ user: key.key });
    // console.log(key.key);
  };

  selectTime = (value, key) => {
    console.log(key.key);
    this.setState({ minutes: key.key });
  };
  startWork = () => {
    this.setState({ start: true, end: false });
    this.getRandomNumbers();
  };

  async saveResult() {
    const score = {
      game: this.state.game,
      time: this.state.minutes,
      resultGood: this.state.correct,
      resultWrong: this.state.wrong,
      user: this.state.user,
    };
    console.log("to jest score: " + JSON.stringify(score));
    try {
      const doc = await Client.Services.ScoreService.create(score);
    } catch {
      console.log("error nie udało się zapisać scora");
    }
  }

  finishWork = () => {
    if (this.state.user) {
      this.saveResult();
    }
    this.setState({
      start: false,
      countDown: false,
      end: true,
    });
  };

  startCountingToStart = () => {
    if (!this.state.user) {
      alert("wybierz GRACZA");
    } else {
      // console.log(this.state);
      this.setState({
        correct: 0,
        wrong: 0,
        first: 0,
        second: 0,
        result: "",
        start: false,
        countDown: true,
        end: false,
      });
      this.setFocutOnResult();
    }
  };

  setFocutOnResult = () => {
    this.inputResultRef.current.focus();
  };

  getRandomNumbers = () => {
    const first = Math.floor(Math.random() * 11);
    const second = Math.floor(Math.random() * 11);
    this.setState({
      first,
      second,
      countDown: false,
    });
  };

  onChange = (event) => {
    // console.log(event.target.value);
    this.setState({ result: event.target.value });
  };

  onKeyPress = (event) => {
    if (event.key === "Enter") {
      // console.log("enter");
      //   sprawdza czy wynik dobry i zlicza punkty
      if (this.state.first * this.state.second == this.state.result) {
        this.setState({ correct: this.state.correct + 1 });
      } else {
        this.setState({ wrong: this.state.wrong + 1 });
      }
      // czyści wynik
      this.setState({ result: "" });
      // losuje nowe liczny
      this.getRandomNumbers();
    }
  };

  render() {
    const users = this.state.users.map((user) => (
      <Option value={user.name} key={user._id}>
        {user.name}
      </Option>
    ));

    const gameTimes = this.state.gameTimes.map((time) => (
      <Option value={time.name} key={time.time}>
        {time.name}
      </Option>
    ));

    return (
      <>
        <div className="wrapper">
          <div className="mainarea">
            <div className="setupBar">
              <div className="choose">
                <Select
                  placeholder="Wybierz gracza"
                  onChange={(value, key) => this.selectUser(value, key)}
                >
                  {users}
                </Select>
              </div>

              <div className="choose">
                <Select
                  placeholder="Wybierz długość rozgrywki"
                  onChange={(value, key) => this.selectTime(value, key)}
                  defaultValue={"1 min"}
                >
                  {gameTimes}
                </Select>
              </div>
            </div>
            <div className="mainTitle">
              <h2>MNOŻENIE</h2>
            </div>
            <div className="mathOperation">
              {this.state.countDown ? (
                <ShortTimer
                  minutes={0}
                  seconds={3}
                  startWork={this.startWork}
                />
              ) : null}
              {this.state.end ? <EndWork /> : null}
              <div className="item firstNumb">{this.state.first}</div>
              <div className="sign">*</div>
              <div className="item secondNumb">{this.state.second}</div>
              <div className="sign">=</div>
              <div className="item result">
                <input
                  type="number"
                  onChange={(event) => this.onChange(event)}
                  onKeyPress={(e) => this.onKeyPress(e)}
                  value={this.state.result}
                  disabled={this.state.end ? true : false}
                  ref={this.inputResultRef}
                />
              </div>
            </div>
            <button
              className="btn"
              onClick={this.startCountingToStart}
              disabled={this.state.start ? true : false}
            >
              {this.state.end ? "Od Nowa" : "Graj"}
            </button>
            <div className="currentScore">
              Dobrze - <span className="correctAns">{this.state.correct}</span>
            </div>
            <div className="currentScore">
              Żle - <span className="wrongAns">{this.state.wrong}</span>
            </div>
            {this.state.start ? (
              <Timer
                minutes={this.state.minutes}
                seconds={this.state.seconds}
                finishWork={this.finishWork}
              />
            ) : null}
          </div>
          <div className="sidebar">
            <div className="sidebarTitle">
              <TopResults time={this.state.minutes} game={this.state.game} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Multiplication;
