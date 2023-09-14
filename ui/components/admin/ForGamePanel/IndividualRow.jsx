import React from "react";

export default class IndividualRow extends React.Component {

render() {
    const { loading, game, players, stagesArray, playerId, submittedExistingCheckArray
 } = this.props;

    var playersIds = []

    var playersStageStatus = []

    var showSubmitted = false;
    

    if(!loading){
        for(var i=0; i<players.length; i++){
            const playerId = players[i].id;
            playersIds.push(playerId);
        }
    }

    // if game exists, the check submitted array has to be existing already
    if(game){
        showSubmitted = true;
    }


    // if(true){
    //     showSubmitted = true;
    // }


    // const handleTestingClick = () => {
    //     console.log(game.currentStageId);
    //     // console.log(stagesArray);
    //     // console.log(stages);
    //     console.log(playersIds);
    // }

    


    return(
            <tr>
                <td> {playerId}</td>  


                {/* <td> {showSubmitted ? (<>Submitted</>) : (<>In progress</>)}</td>   
                <td> Upcoming </td>       
                <td> Upcoming</td>
                <td> Upcoming</td>
                

                <td>             
                    <button onClick={handleTestingClick}>Testing button</button>
                </td> */}

          {game ? 
          (submittedExistingCheckArray.map((object) => (
            object ? 
                (<td>Submitted</td>) 
                : 
                (<td>Upcoming</td>)
            ))
           ) : 
           (<div>Game did not start yet</div>)
           }

            </tr>

        
    )
}


}
