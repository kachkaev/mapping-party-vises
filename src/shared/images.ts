import chalk from "chalk";
import { format } from "date-fns";
import fs from "fs-extra";
import path from "path";
import puppeteer, { Browser } from "puppeteer";

export const getLocale = (): string => process.env.LOCALE ?? "en";

export const getImageDirPath = (): string => path.resolve("images");

export const generatePageUrl = (locale: string, pathname: string): string =>
  `http://localhost:3000/${locale}/${pathname}`;

export const openBrowser = async (): Promise<Browser> => {
  return await puppeteer.launch();
};

export const ensureRasterScreenshot = async ({
  browser,
  deviceScaleFactor,
  imagePath,
  locale,
  logger,
  pagePath,
  quality,
}: {
  browser: Browser;
  deviceScaleFactor: number;
  imagePath: string;
  locale: string;
  logger: Console;
  pagePath: string;
  quality?: number;
}): Promise<void> => {
  if (await fs.pathExists(imagePath)) {
    logger.log(chalk.gray(imagePath));

    return;
  }
  const page = await browser.newPage();
  await page.goto(generatePageUrl(locale, pagePath));
  await page.setViewport({
    width: 100,
    height: 100,
    deviceScaleFactor,
  });

  await page.screenshot({
    path: imagePath,
    quality,
    fullPage: true,
  });
  await page.close();

  logger.log(chalk.magenta(imagePath));
};

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

  const browser = await openBrowser();

  const imagePath = path.resolve(
    imageDirPath,
    `${pagePath.replace(/(\/|\\)/g, "~")}.${resultVersion}.${locale}.jpg`,
  );

  await ensureRasterScreenshot({
    browser,
    deviceScaleFactor,
    imagePath,
    locale,
    pagePath,
    logger,
    quality: 85,
  });

  await browser.close();

  logger.log(`Done!`);
};
