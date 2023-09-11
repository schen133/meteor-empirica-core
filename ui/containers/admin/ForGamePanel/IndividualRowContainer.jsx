import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import IndividualRow from '../../../components/admin/ForGamePanel/IndividualRow';
import { PlayerStages } from '../../../../api/player-stages/player-stages';
import { PlayerRounds } from '../../../../api/player-rounds/player-rounds';
import { GameLobbies } from "../../../../api/game-lobbies/game-lobbies";
import { Games } from "../../../../api/games/games";

import { Stages } from '../../../../api/stages/stages';


export default withTracker(props => {
  const { batchId, game } = props;

  const gameId = game && game._id;
  const stageId = game && game.currentStageId;
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

  



    const sub = Meteor.subscribe("gameCurrentRoundStage", {
    gameId,
    stageId
  });

  const stagesArray = PlayerStages.find({ stageId }).fetch();




//  const stages = Stages.find({ gameId, roundId: stage.roundId }).fetch();
  
//  const stagesArray = PlayerStages.findOne({ gameId, stageId });

// const stagesArray = PlayerStages.find({ stageId: stageId }).fetch();


  // console.log("this is stages array");
  // console.log(stagesArray);


  return {
    stagesArray,
    ...props
  };
})(IndividualRow);