import path from "path";

export const getImageDirPath = (): string => path.resolve("images");

export const generatePageUrl = (pathname: string): string =>
  `http://localhost:3000/${pathname}`;
