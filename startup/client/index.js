// Import client startup through a single index entry point
import { FocusStyleManager } from "@blueprintjs/core";

TimeSync.loggingEnabled = false;

import "../both/index.js";
import "./style.js";

// https://blueprintjs.com/docs/#core/accessibility.focus-management
FocusStyleManager.onlyShowFocusOnTabs();
