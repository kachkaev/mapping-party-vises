import { addDays, format, parse } from "date-fns";

export const isOnMappingParty = (date: string) =>
  date >= (process.env.NEXT_PUBLIC_MAPPING_PARTY_DATE_START ?? "") &&
  date <= (process.env.NEXT_PUBLIC_MAPPING_PARTY_DATE_FINISH ?? "");

export const shiftDate = (date: string, deltaInDays: number): string => {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());

  return format(addDays(parsedDate, deltaInDays), "yyyy-MM-dd");
};
