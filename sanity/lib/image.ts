import { createImageUrlBuilder } from "@sanity/image-url";

import {
  sanityDataset,
  sanityProjectId,
} from "../env";

const builder = createImageUrlBuilder({
  dataset: sanityDataset,
  projectId: sanityProjectId,
});

export function getSanityImageUrl(source: unknown) {
  if (!sanityProjectId || !sanityDataset || !source) {
    return null;
  }

  return builder.image(source);
}

type ImageTransformOptions = {
  width?: number;
  height?: number;
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
};

export function resolveBlogImageUrl(
  source: unknown,
  options: ImageTransformOptions = {},
) {
  if (source && typeof source === "object" && "src" in source) {
    const value = source as { src?: unknown };

    if (typeof value.src === "string" && value.src.length > 0) {
      return value.src;
    }
  }

  const image = getSanityImageUrl(source);

  if (!image) {
    return null;
  }

  let transformed = image.auto("format");

  if (options.width) {
    transformed = transformed.width(options.width);
  }

  if (options.height) {
    transformed = transformed.height(options.height);
  }

  if (options.fit) {
    transformed = transformed.fit(options.fit);
  }

  return transformed.url();
}
