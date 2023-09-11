import { Icon, Intent, Tag, Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import moment from "moment";
import React from "react";
import { HTMLTable } from "@blueprintjs/core";
import { earlyExitGameLobby } from "../../../../api/game-lobbies/methods";
import { earlyExitGame } from "../../../../api/games/methods";
import IndividualRowContainer from "../../../containers/admin/ForGamePanel/IndividualRowContainer";

export default class IndividualBatchGameDetails extends React.Component {
  handleStatusChange = (status, event) => {
    event.preventDefault();
    const { game, lobby } = this.props;
    const endReason = "adminCancelled";

    if (game !== undefined && game._id) {
      earlyExitGame.call({
        gameId: game._id,
        endReason,
        status: status
      });
      return;
    }

    earlyExitGameLobby.call({
      exitReason: endReason,
      gameLobbyId: lobby._id,
      status: status
    });
  };

    handleManualStartGame = () => {
    const { game, lobby } = this.props;
      console.log("lobby before it gets used to create game");
      // console.log(lobby);
      Meteor.call('getLobbyDocument', lobby._id, (error, result) => {
    if (error) {
      console.error('Error trying to manually start game:', error);
    } else {
      // console.log(lobby.status);
      console.log('message from meteor method', result);
    }
      console.log("lobby after it gets used to create game");
  });
}

  render() {
    const { batch, lobby, game, rounds, stages, treatment } = this.props;

    let currentRound;
    let currentStage;
    if (game) {
      currentStage = stages.find(s => s._id === game.currentStageId);
      if (currentStage) {
        currentRound = rounds.find(r => r._id === currentStage.roundId);
      }
    }

    let notReadyPlayers = [];
    let players = (game ? game : lobby).playerIds;
    let bots = [];

    if (!game) {
      notReadyPlayers = lobby.queuedPlayerIds.filter(
        p => players.indexOf(p) < 0
      );
    }

    const playerCountFactor = treatment.factor("playerCount");
    const playerCount = playerCountFactor ? playerCountFactor.value : 0;
    const botsFactor = treatment.factor("botsCount");
    const botsCount = botsFactor && botsFactor.value;
    if (botsCount) {
      players = players.slice(0, players.length - botsCount);
      for (let i = 0; i < botsCount; i++) {
        bots.push(Random.id());
      }
    }

    // _.times(23, () => bots.push(Random.id()));

    let statusMsg;
    let statusIntent;
    let statusMinimal = false;
    let showCancelButton = false;
    // let showManualStartGameButton = false;
    let showManualStartGameButton = null;
    if(lobby.playerIds.length>3){
       showManualStartGameButton = true;
    }
    
    if(game){
      // console.log(game);
      // console.log(showManualStartGameButton);
      showManualStartGameButton = false;
      
    }

    if (game && game.status === "cancelled") {
      statusIntent = Intent.DANGER;
      statusMinimal = true;
      statusMsg = "game cancelled";
    } else if (game && game.finishedAt) {
      statusIntent = Intent.SUCCESS;
      statusMinimal = true;
      statusMsg = "finished";
    } else if (lobby.timedOutAt) {
      statusIntent = Intent.DANGER;
      statusMinimal = true;
      statusMsg = "lobby timeout";
    } else if (lobby.status === "cancelled") {
      statusIntent = Intent.DANGER;
      statusMinimal = true;
      statusMsg = "lobby cancelled";
    } else if (batch.status === "cancelled") {
      statusIntent = Intent.DANGER;
      statusMinimal = true;
      statusMsg = "batch cancelled";
    } else if (batch.status === "failed") {
      statusIntent = Intent.DANGER;
      statusMinimal = true;
      statusMsg = "failed";
    } else if (batch.status === "stopped") {
      statusIntent = Intent.DANGER;
      statusMinimal = true;
      statusMsg = "batch stopped";
    } else if (game) {
      statusIntent = Intent.SUCCESS;
      statusMsg = "running";
      showCancelButton = true;
    } else {
      if (players.length === 0) {
        showCancelButton = true;
        if (notReadyPlayers.length === 0) {
          statusMsg = "empty";
          statusMinimal = true;
        } else {
          statusMsg = "pre-lobby";
          statusIntent = Intent.WARNING;
          statusMinimal = true;
        }
      } else {
        showCancelButton = true;
        statusIntent = Intent.WARNING;
        statusMsg = "lobby";
      }
    }

    if(!game){
      // console.log(game);
      // console.log(showManualStartGameButton);
    //   showManualStartGameButton = true;

    }

    

    return (
        <div className="text-md">
        {game ? (<h1 className="text-2xl">This is the status of current ongoing game</h1>) 
              : (<h1 className="text-2xl">Game did not start yet</h1>)
        }
          
        <HTMLTable condensed className="bp3-html-table-bordered batch-games-table"
> 
            <thead>
              <tr>
                <th>Player Infor</th>
                <th>Round 1</th>
                <th>Stage 1</th>
                <th>Stage 2</th>
                <th>Stage 3</th>
                <th>Round 2</th>
                <th>Stage 1</th>
                <th>Stage 2</th>
                <th>Stage 3</th>
               
              </tr>
            </thead>


            <tbody>
            {/* map out each players' information here */}
                <IndividualRowContainer game={game}/>
            </tbody>
        
        
        </HTMLTable>
            
        </div>
    );
  }
}
