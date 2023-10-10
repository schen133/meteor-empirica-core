import { withTracker } from "meteor/react-meteor-data";
import { Rounds } from "../../../../api/rounds/rounds";
import { Stages } from "../../../../api/stages/stages";
import AdminBatchGame from "../../../components/admin/AdminBatchGame";
import IndividualBatchGame from "../../../components/admin/ForGamePanel/IndividualBatchGame";

export default withTracker(props => {
  const { game } = props;

  // if game is false so far, we return the props. If game is true, 
  if (!game) {
    return props;
  }

  const { _id: gameId } = game;
  const gameLoading = !Meteor.subscribe("admin-batch-game", {
    gameId
  }).ready();

  const rounds = Rounds.find({ gameId }).fetch();
  const stages = Stages.find({ gameId }).fetch();

  const _id = game.currentStageId;

  const currentStage = Stages.find({gameId, _id }).fetch();

  // this is the startTimeAt attribute of the stage object we f
  var stageStartTime = 0;
  var stageTimeDuration = 0;

  

  return {
    loading: gameLoading,
    rounds,
    stages,
    currentStage,
    ...props
  };
})(IndividualBatchGame);
