import { defineCliConfig } from "sanity/cli";

import {
  sanityDataset,
  sanityProjectId,
} from "./sanity/env";

export default defineCliConfig({
  api: {
    dataset: sanityDataset || "production",
    projectId: sanityProjectId || "missing-project-id",
  },
});
