export enum GroupByInterval {
  Week = 'week',
  Day = 'day',
  Month = 'month',
  Year = 'year',
}

export type DateRange = { startDate: Date; endDate: Date; key: string };
