import React from "react";

export default class IntroTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: this.calculateTimeRemaining(),
    };
  }

  componentDidMount() {
    this.timerInterval = setInterval(() => {
      this.setState({ timeRemaining: this.calculateTimeRemaining() });
    }, 1000);
    console.log("timerComponent");
    // console.log(this.props.seconds);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  calculateTimeRemaining() {
    const targetTime = new Date(this.props.startTime).getTime() + 2 * 60 * 1000;
    const currentTime = new Date().getTime();
    const timeDifference = targetTime - currentTime;
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  render() {
    return <div>{this.state.timeRemaining}</div>;
  }


}

