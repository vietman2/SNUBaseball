import {
  InterviewType,
  MemoriesType,
  AlbumType,
  MediaType,
} from "@models/archive";

export const sampleMemories: MemoriesType[] = [
  {
    year: "2024",
    images: [
      {
        id: 1,
        url: "https://picsum.photos/200",
      },
      {
        id: 2,
        url: "https://picsum.photos/201",
      },
      {
        id: 3,
        url: "https://picsum.photos/202",
      },
      {
        id: 4,
        url: "https://picsum.photos/203",
      },
    ],
  },
  {
    year: "2023",
    images: [
      {
        id: 1,
        url: "https://picsum.photos/200",
      },
      {
        id: 2,
        url: "https://picsum.photos/201",
      },
      {
        id: 3,
        url: "https://picsum.photos/202",
      },
      {
        id: 4,
        url: "https://picsum.photos/203",
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
        url: "https://picsum.photos/200/200?random=1",
      },
      {
        id: 2,
        url: "https://picsum.photos/200/200?random=2",
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
        url: "https://picsum.photos/200/200?random=1",
      },
      {
        id: 2,
        url: "https://picsum.photos/200/200?random=2",
      },
    ],
  },
];

export const sampleAlbums: AlbumType[] = [
  {
    id: 1,
    title: "2024 야구부 사진",
    cover_images: [
      {
        id: 1,
        url: "https://picsum.photos/200",
      },
      {
        id: 2,
        url: "https://picsum.photos/201",
      },
    ],
    num_images: 10,
    num_videos: 0,
  },
];

export const sampleMedia: MediaType[] = [
  {
    id: 1,
    url: "https://picsum.photos/200",
    type: "이미지",
    width: 200,
    height: 200,
  },
  {
    id: 2,
    url: "https://picsum.photos/201",
    type: "비디오",
    width: 200,
    height: 200,
    length: 60,
  },
];
