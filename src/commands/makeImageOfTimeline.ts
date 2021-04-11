import { autoStartCommandIfNeeded, Command } from "@kachkaev/commands";

import { makeImage } from "../shared/images";

export const makeImageWithMapComparison: Command = async ({ logger }) => {
  await makeImage({ pagePath: "timeline", logger, deviceScaleFactor: 10 });
};

autoStartCommandIfNeeded(makeImageWithMapComparison, __filename);
