import { withTracker } from "meteor/react-meteor-data";
import { Rounds } from "../../../../api/rounds/rounds";
import { Stages } from "../../../../api/stages/stages";
import AdminBatchGame from "../../../components/admin/AdminBatchGame";
import IndividualBatchGameDetails from "../../../components/admin/ForGamePanel/IndividualBatchGameDetails";
import { Players } from '../../../../api/players/players';

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

  Meteor.subscribe("admin-players", {
  })

  const rounds = Rounds.find({ gameId }).fetch();
  const stages = Stages.find({ gameId }).fetch();

  const playerObjects = Players.find({gameId}).fetch();


  return {
    loading: gameLoading,
    rounds,
    stages,
    playerObjects,
    ...props
  };
})(IndividualBatchGameDetails);
