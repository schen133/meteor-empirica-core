import { withTracker } from "meteor/react-meteor-data";
import IntroTimer from "../../../components/IntroTimer";
import { Stages } from "../../../../api/stages/stages";
import { Meteor } from 'meteor/meteor';

export default withTracker((props) => {
  const { game } = props;

  if (!game) {
    return props;
  }

  const { _id: gameId } = game;
  const gameLoading = !Meteor.subscribe("admin-batch-game", {
    gameId
  }).ready();
  
  const _id = game.currentStageId;

  const currentStage = Stages.find({gameId, _id }).fetch();

  var startTime = null;

  var lobbyConfig = null;
  
  if(currentStage){
    if(currentStage[0].startTimeAt){
      startTime = currentStage[0].startTimeAt.toString();

      lobbyConfig = currentStage[0].durationInSeconds;
    }

  }

  return {
    loading: gameLoading,
    startTime,
    lobbyConfig,
    currentStage
  };

})(IntroTimer);