import React, { Component } from "react";

const style = {
  finish: {
    position: "absolute",
    width: "100%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -70%)",
    fontSize: "144px",
    color: "red",
    // opacity: "0.5",
    // filter: "blur(10px)",
    backgroundColor: "white",
  },
};

class EndWork extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div style={style.finish}>koniec</div>;
  }
}

export default EndWork;
