import path from "path";

export const getVarDirPath = (): string => path.resolve("var");

export const getTimelineSummariesDirPath = (): string =>
  path.resolve(getVarDirPath(), "data", "timeline-summaries");

export const getImageDirPath = (): string =>
  path.resolve(getVarDirPath(), "images");
