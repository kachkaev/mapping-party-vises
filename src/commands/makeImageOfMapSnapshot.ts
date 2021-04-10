import { autoStartCommandIfNeeded, Command } from "@kachkaev/commands";
import { format } from "date-fns";

import { makeImage } from "../shared/images";

export const makeImageWithMapComparison: Command = async ({ logger }) => {
  const date = process.env.DATE ?? format(new Date(), "y-MM-dd");

  await makeImage({ pagePath: `map-snapshot/${date}`, logger });
};

autoStartCommandIfNeeded(makeImageWithMapComparison, __filename);
