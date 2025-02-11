import { InterviewType, MemoriesType } from "@models/archive";

export const sampleMemories: MemoriesType[] = [
  {
    year: "2024",
    images: [
      {
        id: 1,
        uri: "https://picsum.photos/200",
        caption: "Caption 1",
      },
      {
        id: 2,
        uri: "https://picsum.photos/201",
        caption: "Caption 2",
      },
      {
        id: 3,
        uri: "https://picsum.photos/202",
        caption: "Caption 3",
      },
      {
        id: 4,
        uri: "https://picsum.photos/203",
        caption: "Caption 4",
      },
    ],
  },
  {
    year: "2023",
    images: [
      {
        id: 1,
        uri: "https://picsum.photos/200",
        caption: "Caption 1",
      },
      {
        id: 2,
        uri: "https://picsum.photos/201",
        caption: "Caption 2",
      },
      {
        id: 3,
        uri: "https://picsum.photos/202",
        caption: "Caption 3",
      },
      {
        id: 4,
        uri: "https://picsum.photos/203",
        caption: "Caption 4",
      },
    ],
  },
];

export const sampleInterviews: InterviewType[] = [
  {
    id: 1,
    title: "[선수 인터뷰] 야구부 주장으로 살아남기 (카드뉴스 첨부)",
    member: "수학교육과 20 임준원",
    date: "2024-01-01",
    images: [
      {
        id: 1,
        uri: "https://picsum.photos/200/200?random=1",
      },
      {
        id: 2,
        uri: "https://picsum.photos/200/200?random=2",
      },
    ],
  },
  {
    id: 2,
    title: "[XX 인터뷰]",
    member: "체육교육과 13 이정호",
    date: "2024-01-01",
    images: [
      {
        id: 1,
        uri: "https://picsum.photos/200/200?random=1",
      },
      {
        id: 2,
        uri: "https://picsum.photos/200/200?random=2",
      },
    ],
  },
];
