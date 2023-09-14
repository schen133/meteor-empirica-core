import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import IndividualRow from '../../../components/admin/ForGamePanel/IndividualRow';
import { PlayerStages } from '../../../../api/player-stages/player-stages';
import { PlayerRounds } from '../../../../api/player-rounds/player-rounds';
import { GameLobbies } from "../../../../api/game-lobbies/game-lobbies";
import { Games } from "../../../../api/games/games";
import { Players } from '../../../../api/players/players';
import { Stages } from '../../../../api/stages/stages';


export default withTracker(props => {
  const { batchId, game, player_id } = props;

  const gameId = game && game._id;
  const stageId = game && game.currentStageId;
  const playerId = player_id;
  // var stagesArray="hello"

  //  Meteor.subscribe("all-stages", {
  //   stageId
  // });
  //   stagesArray = PlayerStages.find({stageId: stageId}).fetch();


  // if(stageId) {
  //   Meteor.call('PlayerStages.methods.getMatchingStages', { stageId }, (error, result) => {
  //   if (error) {
  //     console.error('Error fetching matching player stages:', error);
  //   } else {
  //     // Handle the result here
  //     console.log('Matching player stages:', result);
  //   }
  //   });
  // }

  //  const gameInforLoading = !Meteor.subscribe("admin-batch", {
  //   batchId
  // }).ready();

// subscribe to what's published in order to access data
  // const sub = Meteor.subscribe("gameCurrentRoundStage", {
  //   gameId,
  //   stageId
  // });

  const sub = Meteor.subscribe("playerIdAndGameIdStagesLookUp", {
    gameId,
    playerId
  });1
  Meteor.subscribe("admin-players", {
  })

  const stagesArray = PlayerStages.find({ stageId }).fetch();


  const players = Players.find({gameId}).fetch();

  // find all stages given playerID and gameID from player_stages.
  // var stagesArrayForPlayer = []
  var stagesArrayForPlayer = PlayerStages.find({gameId, playerId}).fetch();


  // sort all stages in order (Already in order)

  // so we just continuously check each stage object within stagesArrayForPlayer,
  // Store true or false values within an array and return as a prop.
  // So whenever PlayerStages' data changes, we will wrap the changed data for the component along with
  // updated props, ""

  // the length of following array should logically be 15, as each player has 3 stages x 5 rounds.
  var submittedExistingCheckArray = [];

  
  if(stagesArrayForPlayer.length>0){
    for(var i = 0; i<stagesArrayForPlayer.length; i++){
      if(stagesArrayForPlayer[i] && stagesArrayForPlayer[i].submittedAt){
        submittedExistingCheckArray[i] = true;
      }
      else {
        submittedExistingCheckArray[i] = false;

      }
    }

    
  }

  

  // for each column, it comes with a corresponding stageID. Render a separate <td> within the row with the
  // corresponding stageID. So now all stages status will be shwon at all time.


// Then for each 


  // var currentStageObject = null;
  // var taskSubmitted = false;
  // find the corresponding stage for player.
  // if(stagesArray){
  //   for(var i = 0; i<stagesArray.length; i++){
  //     var tempStageObject = stagesArray[i];
      
  //     if(tempStageObject.playerId === player_id){
  //       if(tempStageObject.gameId === gameId){
  //         currentStageObject = tempStageObject;
  //       }
  //     }
  //   }

  // }

  
  
// if (currentStageObject && currentStageObject.submittedAt) {
//   taskSubmitted = true;
// }



//  const stages = Stages.find({ gameId, roundId: stage.roundId }).fetch();
  
//  const stagesArray = PlayerStages.findOne({ gameId, stageId });

// const stagesArray = PlayerStages.find({ stageId: stageId }).fetch();


  // console.log("this is stages array");
  // console.log(stagesArray);


  return {
    gameLoading: stagesArray.length===0,
    stagesArray,
    submittedExistingCheckArray,
    players,
    stagesArrayForPlayer,
    ...props
  };
})(IndividualRow);