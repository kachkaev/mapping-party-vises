import { autoStartCommandIfNeeded, Command } from "@kachkaev/commands";
import chalk from "chalk";
import { format } from "date-fns";
import fs from "fs-extra";
import path from "path";
import puppeteer from "puppeteer";

import { generatePageUrl, getImageDirPath } from "../shared/images";

export const makeImageWithMapComparison: Command = async ({ logger }) => {
  const imageDirPath = getImageDirPath();

  await fs.ensureDir(imageDirPath);

  const version = `v${format(new Date(), "y-MM-dd-HHmm")}`;

  const browser = await puppeteer.launch();

  const imagePath = path.resolve(imageDirPath, `map-comparison.${version}.png`);

  const page = await browser.newPage();
  await page.goto(generatePageUrl(`map-comparison`));
  await page.setViewport({
    width: 100,
    height: 100,
    deviceScaleFactor: 10,
  });

  await page.screenshot({
    path: imagePath,
    fullPage: true,
  });
  await page.close();

  await browser.close();

  logger.log(`Готово! ${chalk.magenta(imagePath)}`);
};

autoStartCommandIfNeeded(makeImageWithMapComparison, __filename);
