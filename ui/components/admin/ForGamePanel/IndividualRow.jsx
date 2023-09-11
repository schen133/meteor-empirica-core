import React from "react";



export default class IndividualRow extends React.Component {

render() {
    const { game } = this.props;


    const handleTestingClick = () => {
        console.log(game.currentStageId);
        // console.log(stagesArray);
        // console.log(stages);
    }
    


    return(
            <tr>
                <td> Chris</td>  
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
