import { autoStartCommandIfNeeded, Command } from "@kachkaev/commands";

import { makeImage } from "../shared/images";

export const makeImageWithMapComparison: Command = async ({ logger }) => {
  await makeImage({ pagePath: "timeline", logger });
};

autoStartCommandIfNeeded(makeImageWithMapComparison, __filename);
