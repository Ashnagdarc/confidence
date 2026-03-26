import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import {
  sanityDataset,
  sanityProjectId,
  sanityStudioUrl,
} from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Confidence Molade Studio",
  basePath: sanityStudioUrl,
  projectId: sanityProjectId || "missing-project-id",
  dataset: sanityDataset || "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
