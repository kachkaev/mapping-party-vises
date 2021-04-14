import { autoStartCommandIfNeeded, Command } from "@kachkaev/commands";
import chalk from "chalk";
import { format } from "date-fns";
import { config } from "dotenv-flow";
import execa from "execa";
import fs from "fs-extra";
import path from "path";
import puppeteer from "puppeteer";

import {
  getFinishDate,
  getStartDate,
  shiftDate,
} from "../shared/helpersForDates";
import { getImageDirPath } from "../shared/helpersForPaths";
import { ensureRasterScreenshot, getLocale } from "../shared/images";

export const makeAnimation: Command = async ({ logger }) => {
  config();

  const locale = getLocale();
  const frameVersion = process.env.FRAME_VERSION ?? "v0";
  const resultVersion = `v${format(new Date(), "y-MM-dd-HHmm")}`;
  const firstDate = shiftDate(getStartDate(), -1);
  const lastDate = shiftDate(getFinishDate(), 1);

  const framesDirPath = path.resolve(
    getImageDirPath(),
    "animation-frames",
    `${frameVersion}.${locale}`,
  );
  await fs.ensureDir(framesDirPath);

  const browser = await puppeteer.launch();
  const convertArgs: string[] = [];

  for (let date = firstDate; date <= lastDate; date = shiftDate(date, 1)) {
    const imagePath = path.resolve(framesDirPath, `${date}.png`);

    if (date === firstDate) {
      convertArgs.push(imagePath, "-delay", "200");
    }

    convertArgs.push(imagePath, "-delay", "50");

    if (date === lastDate) {
      convertArgs.push("-delay", "500", imagePath);
    }

    await ensureRasterScreenshot({
      browser,
      deviceScaleFactor: 1,
      imagePath,
      locale,
      logger,
      pagePath: `map-snapshot/${date}`,
    });
  }

  await browser.close();

  const animationFilePath = path.resolve(
    getImageDirPath(),
    `animation.${resultVersion}.${locale}.gif`,
  );
  convertArgs.push("-loop", "0", "-layers", "Optimize", animationFilePath);

  await execa("convert", convertArgs, { stdio: "inherit" });

  logger.log(`Done! ${chalk.magenta(animationFilePath)}`);
};

autoStartCommandIfNeeded(makeAnimation, __filename);
