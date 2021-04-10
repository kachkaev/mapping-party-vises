import { autoStartCommandIfNeeded, Command } from "@kachkaev/commands";

import { makeImage } from "../shared/images";

export const makeImageWithMapComparison: Command = async ({ logger }) => {
  await makeImage({ pagePath: "map-diff", logger });
};

autoStartCommandIfNeeded(makeImageWithMapComparison, __filename);
