import chalk from "chalk";
import { format } from "date-fns";
import fs from "fs-extra";
import path from "path";
import puppeteer from "puppeteer";

export const getLocale = (): string => process.env.LOCALE ?? "en";

export const getImageDirPath = (): string => path.resolve("images");

export const generatePageUrl = (locale: string, pathname: string): string =>
  `http://localhost:3000/${locale}/${pathname}`;

export const makeImage = async ({
  logger,
  pagePath,
  deviceScaleFactor = 16,
}: {
  logger: Console;
  pagePath: string;
  deviceScaleFactor?: number;
}) => {
  const locale = getLocale();

  const imageDirPath = getImageDirPath();

  await fs.ensureDir(imageDirPath);

  const resultVersion = `v${format(new Date(), "y-MM-dd-HHmmss")}`;

  const browser = await puppeteer.launch();

  const imagePath = path.resolve(
    imageDirPath,
    `${pagePath.replace(/(\/|\\)/g, "~")}.${resultVersion}.${locale}.png`,
  );

  const page = await browser.newPage();
  await page.goto(generatePageUrl(locale, pagePath));
  await page.setViewport({
    width: 100,
    height: 100,
    deviceScaleFactor,
  });

  await page.screenshot({
    path: imagePath,
    fullPage: true,
  });
  await page.close();

  await browser.close();

  logger.log(`Done! ${chalk.magenta(imagePath)}`);
};
