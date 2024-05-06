import dayjs from "dayjs";

export function generateRangeOfDates(start: string,end: string): string[]{
  const dateDiff = dayjs(end).diff(start,"day") + 1;
  return [...Array(dateDiff).keys()].map(d => {
    return dayjs(start).add(d,"days").format("YYYY-MM-DD").toString();
  })
}
