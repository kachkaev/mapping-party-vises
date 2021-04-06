import { addDays, format, parse } from "date-fns";

export const isOnMappingParty = (date: string) =>
  date >= "2021-02-20" && date <= "2021-03-31";

export const shiftDate = (date: string, deltaInDays: number): string => {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());

  return format(addDays(parsedDate, deltaInDays), "yyyy-MM-dd");
};
