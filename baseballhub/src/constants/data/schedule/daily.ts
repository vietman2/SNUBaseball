import { DailyScheduleType } from "@models/schedule";

const pretraining = {
  time: "16:30 ~ 17:00",
  program: "땅 정비 및 개별 스트레칭",
  location: "야구장",
  note: "",
};

const warmup = {
  time: "17:00 ~ 17:50",
  program: "워밍업 + 러닝",
  location: "야구장",
  note: "",
};

const catchball = {
  time: "17:50 ~ 18:30",
  program: "캐치볼",
  location: "야구장",
  note: "",
};

const training1 = {
  time: "18:30 ~ 19:10",
  program: "A조 내야기본기 / B조 망투 / C조 포수 캐칭",
  location: "야구장",
  note: "A조: 양서진 유찬휘 손주형 김영윤 김택원 / B조: 김영 이상현 이유용 허준서 유호성 / C조 이두희 심민수",
};

const training2 = {
  time: "19:10 ~ 19:50",
  program: "A조 티배팅 / B조 외야기본기 / C조 망투",
  location: "야구장",
  note: "",
};
const training3 = {
  time: "19:50 ~ 20:50",
  program: "기계 배팅 (25분씩, 나머지 조는 수비)",
  location: "야구장",
  note: "1조: 양서진 유찬휘 손주형 김영윤 유호성 이상현 / 2조: 이유용 허준서 김영 김택원 이두희 심민수",
};

export const sampleDailySchedule: DailyScheduleType = {
  date: "2024-09-19 (목)",
  time: "17:00 ~ 21:00",
  location: "서울대학교 야구장",
  goal: "내외야 기본기",
  coach: "남기헌 (포수코치), 박건우 (투수코치)",
  weather: "30% (20:00~)",
  timetables: [pretraining, warmup, catchball, training1, training2, training3],
};
