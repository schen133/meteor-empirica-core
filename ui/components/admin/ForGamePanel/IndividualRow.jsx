import React from "react";



export default class IndividualRow extends React.Component {

render() {
    const { loading, game, players, stagesArray, playerId } = this.props;



    var playersIds = []

    var playersStageStatus = []
    

    if(!loading){
        for(var i=0; i<players.length; i++){
            const playerId = players[i].id;
            playersIds.push(playerId);
        }
    }


    const handleTestingClick = () => {
        console.log(game.currentStageId);
        // console.log(stagesArray);
        // console.log(stages);
        console.log(playersIds);
    }

    


    return(
            <tr>
                <td> {playerId}</td>  
                <td> Submitted</td>   
                <td> Upcoming </td>       
                <td> Upcoming</td>
                <td> Upcoming</td>
                

                <td>             
                    <button onClick={handleTestingClick}>Testing button</button>
                </td>

            </tr>

        
    )
}


}
