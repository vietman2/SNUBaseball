import { DailyScheduleType } from "@models/schedule";

export const sampleDailySchedule: DailyScheduleType = {
  date: "2024-09-19 (목)",
  time: "17:00 ~ 21:00",
  location: "서울대학교 야구장",
  goal: "내외야 기본기",
  coach: "남기헌 (포수코치), 박건우 (투수코치)",
  weather: "30% (20:00~)",
  timetables: [
    {
      time: "16:30 ~ 17:00",
      program: "땅 정비 및 개별 스트레칭",
      location: "야구장",
      note: "",
    },
    {
      time: "17:00 ~ 17:50",
      program: "워밍업 + 러닝",
      location: "야구장",
      note: "",
    },
    {
      time: "17:50 ~ 18:30",
      program: "캐치볼",
      location: "야구장",
      note: "",
    },
    {
      time: "18:30 ~ 19:10",
      program: "A조 내야기본기 / B조 망투 / C조 포수 캐칭",
      location: "야구장",
      note: "A조: 양서진 유찬휘 손주형 김영윤 김택원 / B조: 김영 이상현 이유용 허준서 유호성 / C조 이두희 심민수",
    },
    {
      time: "19:10 ~ 19:50",
      program: "A조 티배팅 / B조 외야기본기 / C조 망투",
      location: "야구장",
      note: "",
    },
    {
      time: "19:50 ~ 20:50",
      program: "기계 배팅 (25분씩, 나머지 조는 수비)",
      location: "야구장",
      note: "1조: 양서진 유찬휘 손주형 김영윤 유호성 이상현 / 2조: 이유용 허준서 김영 김택원 이두희 심민수",
    },
    {
      time: "20:00 ~ 20:50",
      program: "투수 훈련",
      location: "야구장",
      note: "",
    },
    {
      time: "20:50 ~ 21:00",
      program: "휴식 및 정리",
      location: "야구장",
      note: "",
    },
  ],
};
