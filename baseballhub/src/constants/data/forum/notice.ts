import { sampleAuthor } from "@data/user";
import {
  NoticeCategoryType,
  NoticeDetailType,
  NoticeSimpleType,
} from "@models/forum";

export const sampleCategories: NoticeCategoryType[] = [
  {
    label: "일반",
    color: "#253238",
    background_color: "#CFD8DC",
  },
  {
    label: "긴급",
    color: "#D84315",
    background_color: "#FFAB91",
  },
];

export const sampleNotices: NoticeSimpleType[] = [
  {
    id: 1,
    category: sampleCategories[0],
    title: "유계결석 인정 요청서",
    author: "임준원",
    num_views: 100,
    created_at: "2024-04-01",
    has_attachment: true,
  },
  {
    id: 3,
    category: sampleCategories[1],
    title: "OB전 연락 안내",
    author: "강지민",
    num_views: 100,
    created_at: "2024-10-01",
    has_attachment: false,
  },
];

export const sampleNoticeDetail: NoticeDetailType = {
  id: 1,
  category: sampleCategories[0],
  title: "유계결석 인정 요청서",
  content: "유계결석 인정 요청서입니다.",
  author: sampleAuthor,
  num_views: 100,
  created_at: "2024-04-01",
  comments: ["확인했습니다.", "감사합니다."],
  attachments: [],
};

export const sampleNoticeDetailWithAttachment: NoticeDetailType = {
  id: 1,
  category: sampleCategories[0],
  title: "유계결석 인정 요청서",
  content: "유계결석 인정 요청서입니다.",
  author: sampleAuthor,
  num_views: 100,
  created_at: "2024-04-01",
  comments: ["확인했습니다.", "감사합니다."],
  attachments: [
    {
      file: "유계결석 인정 요청서.hwp",
      name: "유계결석 인정 요청서",
      created_at: "2024-04-01",
    },
  ],
};
