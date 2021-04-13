import { autoStartCommandIfNeeded, Command } from "@kachkaev/commands";

import { makeImage } from "../shared/images";

export const makeImageWithTimelineExtension: Command = async ({ logger }) => {
  await makeImage({
    pagePath: "timeline-extension",
    logger,
    deviceScaleFactor: 10,
    extension: "png",
  });
};

autoStartCommandIfNeeded(makeImageWithTimelineExtension, __filename);
