import { Button, ButtonGroup, Classes, Intent, Tag } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import moment from "moment";
import React from "react";
import { assignmentTypes } from "../../../api/batches/batches";
import {
  duplicateBatch,
  setBatchInDebugMode,
  updateBatch,
  updateBatchStatus,
} from "../../../api/batches/methods";
import AdminBatchGamesContainer from "../../containers/admin/AdminBatchGamesContainer";
import LoadingInline from "../LoadingInline.jsx";
import { AlertToaster, SuccessToaster } from "../Toasters.jsx";
// import { GameLobbies } from "../../../api/game-lobbies/game-lobbies";

export default class AdminBatch extends React.Component {
  state = {
    newIsOpen: false,
    detailsVisible: false,
    lobbyStatus: null
  };

  toggleDetails = () => {
    this.setState({ detailsVisible: !this.state.detailsVisible });
  };

  handleArchive = () => {
    const {
      archived,
      batch: { _id }
    } = this.props;
    updateBatch.call({ _id, archived: !archived });
  };

  handleStatusChange = (status, debugMode, event) => {
    const {
      batch: { _id }
    } = this.props;
    event.preventDefault();
    if (
      (Meteor.isDevelopment || Meteor.settings.public.debug_gameDebugMode) &&
      status === "running" &&
      // mac: metaKey (command), window: ctrlKey (Ctrl)
      (event.ctrlKey || event.metaKey || debugMode)
    ) {
      setBatchInDebugMode.call({ _id });
    }
    updateBatchStatus.call({ _id, status });
  };

  handleDuplicate = event => {
    const {
      archived,
      batch: { _id }
    } = this.props;
    event.preventDefault();
    duplicateBatch.call({ _id }, err => {
      if (err) {
        AlertToaster.show({ message: `Failed duplicating Batch: ${err}` });
      } else {
        let message = "Successfully duplicated Batch.";
        if (archived) {
          message += " See Active Batches!";
        }
        SuccessToaster.show({ message });
      }
    });
  };


  handleManualStartGame = () => {
    console.log("hello");

    const gameLobbyID = this.props.batch.gameLobbyIds[0];
    console.log(gameLobbyID);

    var gameLobby = null;

    // startgame first
    Meteor.call('getLobbyDocument', gameLobbyID, (error, result) => {
    if (error) {
      console.error('Error trying to manually start game:', error);
    } else {
      gameLobby = result;
      console.log('Lobby document:', result);
      // Do something with the result
    }

    // then update lobby status state variable
    Meteor.call('lobbyStatus', this.props.batch.gameLobbyIds[0], (error, result) => {
      if (error) {
        console.error('Error fetching for lobby status:', error);
      } else {
        this.setState({ lobbyStatus: result }); // Update the state with the fetched result
        console.log('Lobby document:', result);
      }
    });


  });

// console.log(gameLobby);
//     Meteor.call('manualStartGame', gameLobby, (error, result) => {
//     if (error) {
//       console.error('Error trying to manually start game:', error);
//     } else {
//     console.log("game manually started!!");      // Do something with the result
//     }
//   });

// allGameLobbies.transform();
// console.log(allGameLobbies._transform);
// console.log(GameLobbies._collection._doc);

// console.log(GameLobbies);

// console.log(GameLobbies.find({})
//       .limit(20)
//       .map((user) => ({ ...user, _id: user._id }))
//       .toArray());

  }
  // componentDidMount() {
  //   // This function will run once when the component mounts
  //   if(this.props.batch){
  //   Meteor.call('lobbyStatus', this.props.batch.gameLobbyIds[0], (error, result) => {
  //     if (error) {
  //       console.error('Error fetching for lobby status:', error);
  //     } else {
  //       this.setState({ lobbyStatus: result }); // Update the state with the fetched result
  //       console.log('Lobby document:', result);
  //     }
  //   });
  //   }
  
  // }

  render() {
    const { loading, batch, treatments, archived } = this.props;
    const { detailsVisible } = this.state;
    const {lobbyStatus} = this.state;

    if (loading) {
      return (
        <tr>
          <td colSpan={7} style={{ textAlign: "center" }}>
            <LoadingInline />
          </td>
        </tr>
      );
    }

    const actions = [];

    if (batch.status === "init") {
      actions.push(
        <Button
          text="Start"
          intent={Intent.SUCCESS}
          icon={IconNames.PLAY}
          key="start"
          onClick={this.handleStatusChange.bind(this, "running", false)}
        />
      );
    }

    if (batch.status === "init" || batch.status === "running") {
      actions.push(
        <Button
          text="Cancel"
          icon={IconNames.STOP}
          key="cancel"
          onClick={this.handleStatusChange.bind(this, "cancelled", false)}
        />
      );
    }

    if (
      batch.status === "finished" ||
      batch.status === "cancelled" ||
      batch.status === "failed"
    ) {
      actions.push(
        <Button
          text={archived ? "Unarchive" : "Archive"}
          intent={archived ? Intent.SUCCESS : Intent.DANGER}
          minimal
          icon={IconNames.BOX}
          key="archive"
          className={Classes.SMALL}
          onClick={this.handleArchive}
        />
      );
    }

    actions.push(
      <Button
        text="Duplicate"
        icon={IconNames.DUPLICATE}
        key="duplicate"
        onClick={this.handleDuplicate}
      />
    );

    // only shows start game manually button if game lobby status is init.
    // if(lobbyStatus==="init"){
    //   actions.push(
    //   <Button
    //     text="Start Game Manually"
    //     icon={IconNames.PLAY}
    //     key="startgame"
    //     onClick={this.handleManualStartGame}
    //   />
    // );
    // }

    let config;
    switch (batch.assignment) {
      case "simple":
        config = batch.simpleConfig.treatments.map(tt => {
          const t = treatments.find(t => t._id === tt._id);
          return (
            <div key={tt._id}>{t ? t.displayName() : "Unknown treatment"}</div>
          );
        });
        break;
      case "complete":
        config = batch.completeConfig.treatments.map(tt => {
          const t = treatments.find(t => t._id === tt._id);
          return (
            <div key={tt._id}>
              {t ? t.displayName() : "Unknown treatment"}
              {" x "}
              {tt.count}
            </div>
          );
        });
        break;
      default:
        console.error(`unknown assignment: ${batch.assignment}`);
        break;
    }

    let statusIntent;
    let statusMinimal = false;
    switch (batch.status) {
      case "init":
        statusIntent = Intent.WARNING;
        // Default style
        break;
      case "running":
        statusIntent = Intent.SUCCESS;
        break;
      case "finished":
        statusIntent = Intent.SUCCESS;
        statusMinimal = true;
        break;
      case "stopped":
      case "failed":
      case "cancelled":
        statusIntent = Intent.DANGER;
        statusMinimal = true;
        break;
      default:
        statusMinimal = true;
        break;
    }

    const detailsVisibleClass = detailsVisible ? "detailsVisible" : "";
    const detailsClass = `detailsButton ${detailsVisibleClass}`;
    return (
      <>
        <tr>
          <td className="showDetailsButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 125.304 125.304"
              onClick={this.toggleDetails}
              className={detailsClass}
            >
              <path fill="#010002" d="M62.652 103.895L0 21.409h125.304z" />
            </svg>
          </td>
          <td>{batch.index}</td>
          <td>
            <Tag intent={statusIntent} minimal={statusMinimal}>
              {batch.status}
            </Tag>
          </td>
          <td className="numeric">{batch.gameCount()}</td>
          <td title={moment(batch.runningAt).format()}>
            {batch.runningAt ? moment(batch.runningAt).fromNow() : ""}
          </td>
          <td>{assignmentTypes[batch.assignment]}</td>
          <td>{config}</td>
          <td>
            <ButtonGroup minimal className={Classes.SMALL}>
              {actions}
            </ButtonGroup>
          </td>
        </tr>

        {detailsVisible ? (
          <tr>
            <AdminBatchGamesContainer
              batchId={batch._id}
              batch={batch}
              treatments={treatments}
            />
          </tr>
        ) : (
          <tr />
        )}
      </>
    );
  }
}
