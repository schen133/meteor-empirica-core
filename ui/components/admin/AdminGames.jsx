import React from "react";
import { Icon, NonIdealState } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { AdminPageHeader } from "./AdminHeading.jsx";
// import {AdminBatchGame} from "./AdminBatchGame/.jsx"

// import {AdminBatchGames} from "./AdminBatchGames/.jsx"

export default class AdminGames extends React.Component {
  render() {
    return (
      <div className="games">
        <AdminPageHeader icon={IconNames.FLOWS}>Games</AdminPageHeader>
{/* <AdminBatchGame></AdminBatchGame> */}
        <NonIdealState icon={IconNames.BUILD} title="Under construction" />
      </div>
    );
  }
}
