import { WeeklyTimetableType } from "@models/schedule";

export const sampleWeeklyData: WeeklyTimetableType[] = [
  {
    index: 1,
    name: "김유안",
    major: "건설환경공학부",
    phone: "010-5535-9226",
    year: "3",
    monday: {
      attendance: "X",
      reason: "과외",
    },
    tuesday: {
      attendance: "O",
    },
    wednesday: {
      attendance: "△",
      time: "17:30~",
      reason: "수업",
    },
    thursday: {
      attendance: "O",
    },
    friday: {
      attendance: "X",
      reason: "과외",
    },
    saturday: {
      attendance: "O",
    },
    sunday: {
      attendance: "X",
      reason: "훈련없음",
    },
    total: 4,
  },
  {
    index: 2,
    name: "양서진",
    major: "건설환경공학부",
    phone: "010-9822-3646",
    year: "3",
    monday: {
      attendance: "O",
    },
    tuesday: {
      attendance: "O",
    },
    wednesday: {
      attendance: "O",
    },
    thursday: {
      attendance: "X",
      reason: "수업",
    },
    friday: {
      attendance: "O",
    },
    saturday: {
      attendance: "O",
    },
    sunday: {
      attendance: "X",
      reason: "훈련없음",
    },
    total: 5,
  },
];
