import React, { Component } from "react";

const style = {
  shortTimer: {
    position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -70%)",
    hight: "100px",
    width: "100%",
    color: "red",
    // opacity: "0.5",
    width: "100%",
    backgroundColor: "white",
  },

  h1: {
    color: "green",
    lineHight: "100px",
    fontSize: "60px",
  },
};

export default class ShortTimer extends Component {
  state = {
    seconds: this.props.seconds,
  };

  startWork = () => {
    this.props.startWork();
  };

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds } = this.state;
      if (seconds === 0) {
        this.startWork();
      }
      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        clearInterval(this.myInterval);
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { seconds } = this.state;
    return (
      <div className="shortTimer" style={style.shortTimer}>
        {seconds === 0 ? (
          <h1 style={style.h1}>GO!</h1>
        ) : (
          <h1 style={style.h1}>{seconds}</h1>
        )}
      </div>
    );
  }
}
