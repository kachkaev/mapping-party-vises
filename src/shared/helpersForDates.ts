import { addDays, format, parse } from "date-fns";

export const getStartDate = () =>
  process.env.NEXT_PUBLIC_MAPPING_PARTY_DATE_START ?? "";
export const getFinishDate = () =>
  process.env.NEXT_PUBLIC_MAPPING_PARTY_DATE_FINISH ?? "";
export const getTimeZone = () =>
  `UTC${process.env.NEXT_PUBLIC_MAPPING_PARTY_TIME_ZONE ?? "+00:00"}`;

export const isOnMappingParty = (date: string) =>
  date >= getStartDate() && date <= getFinishDate();

export const shiftDate = (date: string, deltaInDays: number): string => {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());

  return format(addDays(parsedDate, deltaInDays), "yyyy-MM-dd");
};

export const parseDateTime = (date: string, time: string = "00:00") =>
  parse(
    `${date} ${time} ${getTimeZone()}`,
    "yyyy-MM-dd HH:mm 'UTC'XXX",
    new Date(),
  );
