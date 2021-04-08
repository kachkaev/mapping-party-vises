import { autoStartCommandIfNeeded, Command } from "@kachkaev/commands";
import chalk from "chalk";
import { format } from "date-fns";
import { config } from "dotenv-flow";
import execa from "execa";
import fs from "fs-extra";
import path from "path";
import puppeteer from "puppeteer";

import { shiftDate } from "../shared/helpersForDates";
import { generatePageUrl, getImageDirPath } from "../shared/images";

export const makeImageWithMapComparison: Command = async ({ logger }) => {
  config();
  const animationVersion = `v${format(new Date(), "y-MM-dd-HHmm")}`;
  const snapshotVersion = `v4`;
  const imageDirPath = path.resolve(
    getImageDirPath(),
    `map-snapshots.${snapshotVersion}`,
  );
  await fs.ensureDir(imageDirPath);

  const browser = await puppeteer.launch();

  const firstDate = shiftDate(
    process.env.NEXT_PUBLIC_MAPPING_PARTY_DATE_START ?? "",
    -1,
  );
  const lastDate = shiftDate(
    process.env.NEXT_PUBLIC_MAPPING_PARTY_DATE_FINISH ?? "",
    1,
  );

  const convertArgs: string[] = [];

  for (let date = firstDate; date <= lastDate; date = shiftDate(date, 1)) {
    const imagePath = path.resolve(imageDirPath, `${date}.png`);

    convertArgs.push(imagePath, "-delay", date === firstDate ? "250" : "50");

    if (date === lastDate) {
      convertArgs.push("-delay", "500", imagePath);
    }

    if (await fs.pathExists(imagePath)) {
      logger.log(chalk.gray(imagePath));
      continue;
    }

    const page = await browser.newPage();
    await page.goto(generatePageUrl(`map-snapshot/${date}`));
    await page.setViewport({
      width: 100,
      height: 100,
      deviceScaleFactor: 4,
    });

    await page.screenshot({
      path: imagePath,
      fullPage: true,
    });
    await page.close();

    logger.log(chalk.magenta(imagePath));
  }

  await browser.close();

  const animationFilePath = path.resolve(
    imageDirPath,
    `animation.${animationVersion}.gif`,
  );
  convertArgs.push("-loop", "0", "-layers", "Optimize", animationFilePath);

  await execa("convert", convertArgs, { stdio: "inherit" });

  logger.log(`Готово! ${chalk.magenta(animationFilePath)}`);
};

autoStartCommandIfNeeded(makeImageWithMapComparison, __filename);
