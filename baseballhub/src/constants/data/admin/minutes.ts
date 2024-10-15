import { MinutesDetailType, MinutesSimpleType } from "@models/admin";

export const sampleMinutes: MinutesSimpleType[] = [
  {
    id: 1,
    title: "9월 1차 주장단 회의",
    date: "2024-09-01",
  },
  {
    id: 2,
    title: "1차 오비전 준비 회의",
    date: "2024-09-15",
  },
  {
    id: 3,
    title: "2차 오비전 준비 회의",
    date: "2024-09-30",
  },
  {
    id: 4,
    title: "3차 오비전 준비 회의",
    date: "2024-10-10",
  },
];

export const sampleMinutesDetail: MinutesDetailType = {
  id: 4,
  title: "3차 오비전 준비 회의",
  date: "2024-10-10",
  attendees: ["김유안", "양서진", "강지민", "박영서", "이정호"],
  content: "오비전 준비를 위한 회의",
};
