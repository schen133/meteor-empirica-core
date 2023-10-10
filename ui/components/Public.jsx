const showOpenAdmin = Meteor.isDevelopment;
const showOpenAltPlayer =
  Meteor.isDevelopment || Meteor.settings.public.debug_resetSession;
const showReset =
  Meteor.isDevelopment || Meteor.settings.public.debug_newPlayer;
import {
  Button,
  Classes,
  Dialog,
  Icon,
  Intent,
  NavbarHeading
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import GameContainer from "../containers/GameContainer.jsx";
import { removePlayerId } from "../containers/IdentifiedContainer.jsx";
import { CoreWrapper } from "./Helpers.jsx";
import Loading from "./Loading.jsx";
import NewPlayer from "./NewPlayer.jsx";
import NoBatchOriginal from "./NoBatch.jsx";
import IntroTimer from "./IntroTimer.jsx";
// import { Log } from 'meteor/logging'

const loadDocTitle = document.title;

export default class Public extends React.Component {
  state = { isAboutOpen: false, 
    timeoutSeconds: null,
    meteorMethodCalled: false
  };

  handleToggleAbout = () =>
    this.setState({ isAboutOpen: !this.state.isAboutOpen });

  handleOpenAdmin = event => {
    event.preventDefault();

    if (!showOpenAdmin) {
      return;
    }
    window.open("/admin", "_blank");
  };

  handleReset = event => {
    event.preventDefault();

    if (!showOpenAltPlayer) {
      return;
    }
    removePlayerId();
  };

  handleOpenAltPlayer = event => {
    event.preventDefault();

    if (!showReset) {
      return;
    }

    // check to see if a playerId is required
    const { playerIdParam, playerIdParamExclusive } = Meteor.settings.public;
    const playerIdParamRequired = playerIdParam && playerIdParamExclusive;

    const randPlayerIdKey = Math.random()
      .toString(36)
      .substring(2, 15);

    // if playerId is required, add that to URL
    // otherwise, produce URL with just playerIdKey
    if (playerIdParamRequired) {
      const randId = Math.random()
        .toString(36)
        .substring(2, 15);
      window.open(
        `/?playerIdKey=${randPlayerIdKey}&${playerIdParam}=${randId}`,
        "_blank"
      );
    } else {
      window.open(`/?playerIdKey=${randPlayerIdKey}`, "_blank");
    }
  };

//     renderTimerComponent = (start, seconds) => {
//       if(seconds){
//   const { timeoutSeconds } = seconds
//     // Replace 'YourTimerComponent' with the actual component you want to render when conditions are met
//     return timeoutSeconds !== null ? <IntroTimer startTime={start.toString()} seconds={seconds}/>
//  : null;
//       }
  
//   };

  // componentDidMount(){
  //   console.log(this.props);
  //   console.log(this.state);
  // }

    //   componentDidUpdate() {
    //     if(this.props.gameLobbyy){
    //     // console.log("gameLobby exists now");
    //     // console.log("There are now somebody in Prelobby");
    //     // showTimer = true;
    //     if(this.props.gameLobbyy.timeoutStartedAt){
    //       // showTimer = true;
    //       this.setState({showTimer: true})
    //     }
    // }
    //   }


  render() {
    const {
      loading,
      renderPublic,
      playerIdKey,
      Header,
      NewPlayer: CustomNewPlayer,
      About,
      NoBatch,
      gameLobbyy,
      lobbyConfigg,
      gamee,
      ...rest
    } = this.props;
    const { player } = rest;
    // const { showTimer, timeoutSeconds } = this.state;

    var timeoutSeconds = null;
     var showTimer = false;
     var renderYet = false;

    // Timer stuff, ignore for now

    if(gameLobbyy){
        // console.log("gameLobby exists now");
        // console.log("There are now somebody in Prelobby");
        // showTimer = true;
        if(gameLobbyy.timeoutStartedAt){
          // showTimer = true;
          if(!this.props.game){
            showTimer = true;

          } else {
            showTimer= false;
          }
          // this.setState({showTimer: true})
        }
        // console.log(lobbyConfigg.timeoutInSeconds);
    }

    // if(showTimer==true){
    // Meteor.call('getTimeoutSeconds', gameLobbyy.lobbyConfigId, (error, result) => {
    //   if (error) {
    //     console.error('Error trying to fetch for lobbyConfigID', error);
    //   } else {
    //     console.log('message from meteor method', result);
    //     timeoutSeconds=result;
    //     console.log(timeoutSeconds);
    //     console.log(renderYet);
    //   }
    // });
    // }

    // if(showTimer===true && Number.isInteger(timeoutSeconds)){
    //   renderYet = true;
    //   console.log(renderYet);
    // }

//     if (timeoutSeconds !== null) {
//   // Your logic when timeoutSeconds is not null
//   console.log('timeoutSeconds is not null:', timeoutSeconds);
// } else {
//   // Your logic when timeoutSeconds is null
//   console.log('timeoutSeconds is null');
// }
  

    // const AboutComp = About || AboutOriginal;
    const AboutComp = About || null;
    const NoBatchComp = NoBatch || NoBatchOriginal;

    if (loading) {
      return <Loading />;
    }

    if (!renderPublic) {
      return <NoBatchComp />;
    }

    const adminProps = {
      showOpenAltPlayer: showOpenAltPlayer,
      onOpenAltPlayer: this.handleOpenAltPlayer,
      showReset: showReset,
      onReset: this.handleReset,
      showReset: showReset,
      about: AboutComp,
      showAbout: Boolean(AboutComp),
      onToggleAbout: this.handleToggleAbout
    };

    let content;
    if (!player) {
      content = (
        <CoreWrapper>
          <NewPlayer
            {...rest}
            {...adminProps}
            CustomNewPlayer={CustomNewPlayer}
          />
        </CoreWrapper>
      );
    } else {
      content = <GameContainer {...rest} {...adminProps} />;
    }

    let title = loadDocTitle;
    if (playerIdKey) {
      title += ` (${playerIdKey})`;
    }

    // if(gameLobbyy){
    //     // console.log("gameLobby exists now");
    //     // console.log("There are now somebody in Prelobby");
    //     // showTimer = true;
    //     if(gameLobbyy.timeoutStartedAt){
    //       showTimer = true;
    //     }
    // }
    // this.componentDidMount
   

    return (
      <div className="">
      {/* <div className="grid"> */}

        <Helmet>
          <title>{title}</title>
        </Helmet>

        {Header !== undefined ? (
          <Header {...adminProps} />
        ) : (
          <div className="navbar">
          {/* <div className="flex flex-row bg-cyan-900 py-4 text-white"> */}

            <div className="navbarGroup">
                        {/* <div className="navbarGroup"> */}

              <NavbarHeading>
                <Link
                  className={[
                    Classes.BUTTON,
                    Classes.LARGE,
                    Classes.MINIMAL,
                    Classes.BUTTON
                  ].join(" ")}
                  to="/"
                >
                  <Icon icon={IconNames.EXCHANGE} />
                  <span className={Classes.BUTTON_TEXT}>Empirica</span>
                </Link>
              </NavbarHeading>
            </div>

            <div className="flex flex-row py-[15px]">
              {showOpenAltPlayer ? (
                <Button
                  text="New Player"
                  minimal
                  icon={IconNames.PERSON}
                  onClick={this.handleOpenAltPlayer}
                />
              ) : (
                ""
              )}
              {showReset ? (
                <Button
                  text="Reset current session"
                  minimal
                  icon={IconNames.REPEAT}
                  onClick={this.handleReset}
                />
              ) : (
                ""
              )}

              {showOpenAdmin ? (
                <Button
                  text="Open Admin"
                  minimal
                  icon={IconNames.PLAY}
                  onClick={this.handleOpenAdmin}
                />
              ) : (
                ""
              )}

              {/* <div className="flex flex-row"> */}
              {showTimer ? (
                <div className="mt-[1.1rem] ml-[1rem] w-[250px] flex flex-row">                  {/* <h1> timer</h1> */}
                  {/* <IntroTimer /> */}
                  {/* <IntroTimer startTime={gameLobbyy.timeoutStartedAt.toString()} seconds={timeoutSeconds}/> */}
                  <IntroTimer startTime={gameLobbyy.timeoutStartedAt.toString()} lobbyConfig={lobbyConfigg.timeoutInSeconds}/>
                   <p className="">Minutes till the game starts</p>

                
                </div>
              ) : ("")}

        {/* {showTimer && this.renderTimerComponent(gameLobbyy.timeoutStartedAt, timeoutSeconds)} */}

              {AboutComp ? (
                <>
                  <Button
                    text="Report a problem"
                    minimal
                    icon={IconNames.info_sign}
                    onClick={this.handleToggleAbout}
                  />

                  <Dialog
                    icon={IconNames.INBOX}
                    isOpen={this.state.isAboutOpen}
                    onClose={this.handleToggleAbout}
                    title="Report a problem"
                  >
                    <div className={Classes.DIALOG_BODY}>
                      <AboutComp />
                    </div>

                    <div className={Classes.DIALOG_FOOTER}>
                      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button
                          text="Close"
                          intent={Intent.PRIMARY}
                          onClick={this.handleToggleAbout}
                        />
                      </div>
                    </div>
                  </Dialog>
                </>
              ) : null}
            </div>
          </div>
        )}
        

        <main className="">
        
        
        {content}
        
        </main>
      </div>
    );
  }
}
