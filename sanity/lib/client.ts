import "server-only";

import { createClient } from "next-sanity";

import {
  isSanityConfigured,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from "../env";

export const sanityClient = isSanityConfigured
  ? createClient({
      apiVersion: sanityApiVersion,
      dataset: sanityDataset,
      projectId: sanityProjectId,
      useCdn: true,
      perspective: "published",
    })
  : null;
