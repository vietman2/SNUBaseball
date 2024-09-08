export type DailyScheduleType = {
  attendance: "O" | "X" | "△";
  time?: string;
  reason?: string;
};

export type WeeklyTimetableType = {
  index: number | "합";
  name: string;
  major: string;
  phone: string;
  year: string;
  monday: DailyScheduleType;
  tuesday: DailyScheduleType;
  wednesday: DailyScheduleType;
  thursday: DailyScheduleType;
  friday: DailyScheduleType;
  saturday: DailyScheduleType;
  sunday: DailyScheduleType;
  total: number;
};
