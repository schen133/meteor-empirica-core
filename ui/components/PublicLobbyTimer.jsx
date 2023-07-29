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
    const targetTime = new Date(this.props.startTime).getTime() + this.props.lobbyConfig * 1000;
    const currentTime = new Date().getTime();
    const timeDifference = targetTime - currentTime;
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  render() {
    return <div className="mt-[1.1rem] ml-[1rem] w-[250px] flex flex-row">
    <p className="w-[44px] text-red-500 font-semibold">    {this.state.timeRemaining} 
</p>
    <p className="">Minutes till the game starts
        </p>
    
    </div>;
  }


}

