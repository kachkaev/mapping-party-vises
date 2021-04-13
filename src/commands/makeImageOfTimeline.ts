import { autoStartCommandIfNeeded, Command } from "@kachkaev/commands";

import { makeImage } from "../shared/images";

export const makeImageWithTimeline: Command = async ({ logger }) => {
  await makeImage({ pagePath: "timeline", logger, deviceScaleFactor: 10 });
};

autoStartCommandIfNeeded(makeImageWithTimeline, __filename);
