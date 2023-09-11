import React from "react";
import { Icon, NonIdealState } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AdminPageHeader } from "../AdminHeading.jsx";
import { Button, Callout, HTMLTable } from "@blueprintjs/core";
import IndividualBatch from "./IndividualBatch.jsx";

export default class AdminGames extends React.Component {
  render() {
     const {
      loading,
      batches,
      treatments,
      factors,
      lobbyConfigs,
      archived
    } = this.props;

    return (
      <div className="games">
        <AdminPageHeader icon={IconNames.FLOWS}>Games
          {/* <Button text="New Batch"/> */}

        </AdminPageHeader>
{/* <AdminBatchGame></AdminBatchGame> */}
        {/* <NonIdealState icon={IconNames.BUILD} title="Under construction" /> */}



        <div className=""> 
          {/* <h1> Table </h1>  */}
          {batches.length === 0 ? (
          <Callout>
            {archived
              ? "No archived batches."
              : "No Games yet, create a batch first in Batches panel"}
          </Callout>
        ) : (
          <HTMLTable className="double-stripped">
            <thead>
              <tr>
                <th />
                <th>Batch #</th>
                <th>Status</th>
                <th>Game Count</th>
                <th>Lobby Started At</th>
                <th>Assignment</th>
                <th>Configuration</th>
                <th>{/* Actions */}</th>
              </tr>
            </thead>

            <tbody>
              {batches.map(batch => (
                <IndividualBatch
                  key={batch._id}
                  batch={batch}
                  treatments={treatments}
                  archived={archived}
                />
              ))}
            </tbody>
          </HTMLTable>
        )}

        </div>
      </div>
    );
  }
}



