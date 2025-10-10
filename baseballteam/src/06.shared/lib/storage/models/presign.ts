// ------ 결과 타입 정의 ------ //
export type PresignItemType = {
  url: string;
  fields: Record<string, string>;
};

// ------ 요청 타입 정의 ------ //
export type PresignRequestType = {
  filename: string;
  content_type?: string;
  size: number;
};
