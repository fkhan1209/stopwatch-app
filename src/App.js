import React from "react";
import "./App.css";

class Stopwatch extends React.Component {
  constructor(props, timer) {
    super(props);
    this.timer = timer;
    this.state = {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      startState: false
    };
  }

  handleStart = () => {
    this.timer = setInterval(() => {
      this.setState((prevState) => {
        return {
          millisecond: prevState.millisecond + 1,
          startState: true
        };
      });
      if (this.state.millisecond === 100) {
        this.setState((prevState) => {
          return {
            second: prevState.second + 1,
            millisecond: 0
          };
        });
      }

      if (this.state.second === 60) {
        this.setState((prevState) => {
          return {
            minute: prevState.minute + 1,
            second: 0
          };
        });
      }

      if (this.state.minute === 60) {
        this.setState((prevState) => {
          return {
            hour: prevState.hour + 1,
            minute: 0
          };
        });
      }
    }, 10);
  };

  handleStop = () => {
    clearInterval(this.timer);
    this.setState((prevState) => {
      return {
        startState: false
      };
    });
  };

  handleReset = () => {
    this.setState(() => {
      return {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        startState: false
      };
    });
  };

  render() {
    return (
      <div className="parent">
        <div className="main">
          <Header />
          <Timer time={this.state} />
          <Action
            startState={this.state.startState}
            handleStart={this.handleStart}
            handleStop={this.handleStop}
            handleReset={this.handleReset}
          />
        </div>
      </div>
    );
  }
}

const Header = () => {
  return <h1 className="Heading">STOP WATCH</h1>;
};

const Timer = (props) => {
  return (
    <div className="Timer">
      <div className="hours">{props.time.hour}</div>:
      <div className="minutes">{props.time.minute}</div>:
      <div className="seconds">{props.time.second}</div>:
      <div className="milliseconds">{props.time.millisecond}</div>
    </div>
  );
};

const Action = (props) => {
  return (
    <div className="Action">
      <button onClick={props.handleReset} id="reset">
        RESET
      </button>
      <button
        disabled={props.startState}
        onClick={props.handleStart}
        id="start"
      >
        START
      </button>
      <button onClick={props.handleStop} id="stop">
        PAUSE
      </button>
    </div>
  );
};

export default Stopwatch;
