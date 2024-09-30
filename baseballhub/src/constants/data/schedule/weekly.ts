import { WeeklyTimetableType } from "@models/schedule";

const injury = {
  attendance: "X",
  reason: "부상",
};

const lesson = {
  attendance: "X",
  reason: "수업",
};

const notraining = {
  attendance: "X",
  reason: "훈련없음",
};

const present = {
  attendance: "O",
};

const late = {
  attendance: "△",
  time: "17:30~",
  reason: "수업",
};

export const sampleWeeklyData: WeeklyTimetableType[] = [
  {
    index: 1,
    name: "김유안",
    major: "건설환경공학부",
    phone: "010-5535-9226",
    year: "3",
    dailySchedules: [injury, injury, injury, injury, injury, injury],
    total: 0,
  },
  {
    index: 2,
    name: "양서진",
    major: "건설환경공학부",
    phone: "010-9822-3646",
    year: "3",
    dailySchedules: [lesson, late, notraining, present, lesson, present],
    total: 3,
  },
  {
    index: 3,
    name: "유찬휘",
    major: "수학교육과",
    phone: "010-6279-9987",
    year: "4",
    dailySchedules: [notraining, present, lesson, late, notraining, present],
    total: 3,
  },
  {
    index: 4,
    name: "이상현",
    major: "체육교육과",
    phone: "010-2685-1770",
    year: "4",
    dailySchedules: [lesson, present, lesson, present, notraining, present],
    total: 3,
  },
  {
    index: 5,
    name: "이유용",
    major: "경영학과",
    phone: "010-2754-4606",
    year: "3",
    dailySchedules: [notraining, present, lesson, present, lesson, present],
    total: 3,
  },
  {
    index: 6,
    name: "김영",
    major: "물리천문학부",
    phone: "010-3309-3289",
    year: "3",
    dailySchedules: [present, lesson, present, lesson, present, present],
    total: 4,
  },
  {
    index: 7,
    name: "손주형",
    major: "동물생명공학과",
    phone: "010-8924-1429",
    year: "3",
    dailySchedules: [lesson, present, notraining, present, notraining, present],
    total: 3,
  },
  {
    index: 8,
    name: "유호성",
    major: "경제학부",
    phone: "010-2772-1397",
    year: "2",
    dailySchedules: [present, present, notraining, present, lesson, present],
    total: 4,
  },
  {
    index: 9,
    name: "김택원",
    major: "경영학과",
    phone: "010-4078-8647",
    year: "1",
    dailySchedules: [notraining, present, present, present, lesson, present],
    total: 4,
  },
  {
    index: 10,
    name: "허준서",
    major: "경영학과",
    phone: "010-4725-7067",
    year: "1",
    dailySchedules: [present, present, notraining, present, lesson, present],
    total: 4,
  },
  {
    index: 11,
    name: "이두희",
    major: "농경제사회학부",
    phone: "010-4239-5416",
    year: "1",
    dailySchedules: [lesson, present, notraining, present, present, present],
    total: 4,
  },
  {
    index: 12,
    name: "심민수",
    major: "사회교육과",
    phone: "010-6532-8547",
    year: "1",
    dailySchedules: [present, present, present, present, notraining, present],
    total: 5,
  },
  {
    index: 13,
    name: "김영윤",
    major: "경영학과",
    phone: "010-3038-5446",
    year: "1",
    dailySchedules: [lesson, present, lesson, present, lesson, present],
    total: 3,
  },
];

export const sampleManagerWeeklyData: WeeklyTimetableType[] = [
  {
    index: 1,
    name: "강지민",
    major: "미학과",
    phone: "010-8552-6861",
    year: "1",
    dailySchedules: [lesson, present, lesson, present, lesson, present],
    total: 3,
  },
  {
    index: 2,
    name: "박영서",
    major: "기계공학부",
    phone: "010-7110-0106",
    year: "2",
    dailySchedules: [present, lesson, present, lesson, present, lesson],
    total: 3,
  },
];
