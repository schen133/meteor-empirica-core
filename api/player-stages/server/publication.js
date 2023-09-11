import { PlayerRounds } from "../../player-rounds/player-rounds";
import { PlayerStages } from "../../player-stages/player-stages";
import { Players } from "../../players/players";
import { Rounds } from "../../rounds/rounds";
import { Stages } from "../../stages/stages";
import { Games } from "../games";

// Meteor.publish("game", function({ playerId }) {
//   return Games.find({ playerIds: playerId });
// });

// Meteor.publish("gameDependencies", function({ gameId }) {
//   if (!gameId) {
//     return [];
//   }

//   return [Players.find({ gameId })];
// });

// Meteor.publish("gameLobbyDependencies", function({ gameLobbyId }) {
//   if (!gameLobbyId) {
//     return [];
//   }

//   return [Players.find({ gameLobbyId })];
// });

Meteor.publish("all-stages", function({ stageId }) {
  if (!stageId) {
    return [];
  }

//   const stage = Stages.findOne(stageId);
//   const roundId = stage.roundId;

  return [
    PlayerStages.find({ stageId: stageId })
  ];
});
