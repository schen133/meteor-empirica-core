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
    const { batch, lobby, game, rounds, stages, treatment, playerObjects } = this.props;

    let currentRound;
    let currentStage;
    if (game) {
      currentStage = stages.find(s => s._id === game.currentStageId);
      if (currentStage) {
        currentRound = rounds.find(r => r._id === currentStage.roundId);
      }
    }

 


  

  

    var playersIds = []


    if(game){

      for(var i=0; i<playerObjects.length; i++){
        const playerId = playerObjects[i].id;
        playersIds.push(playerId);
      }
      
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
                 {[...Array(15)].map((_, index) => (
                 <th key={index}>Stage {index%3+1}</th>
                 ))}
               
              </tr>
            </thead>

        <tbody>
  {/* map out each player's information here */}
  {game ? (
    <>
      {playerObjects.map((o) => (
        <IndividualRowContainer key={o.id} game={game} playerId={o.id} player_id={o._id}/>
      ))}
    </>
  ) : (
    <>Game did not start yet</>
  )}
</tbody>

            
        
        
        </HTMLTable>
            
        </div>
    );
  }
}
