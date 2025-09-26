// ------ 결과 타입 정의 ------ //
export type SinglePresignItemType = {
  url: string;
  fields: Record<string, string>;
};

export type MultiplePresignItemType = {
  index: number; // 요청한 파일의 인덱스
  url: string;
  fields: Record<string, string>;
};

type PresignErrorType = {
  index: number;
  filename: string;
  message: string;
};

export type MultiplePresignResponseType = {
  items: MultiplePresignItemType[];
  errors: PresignErrorType[];
};

// ------ 요청 타입 정의 ------ //
export type SinglePresignRequestType = {
  filename: string;
  content_type?: string;
  size: number;
};

export type MultiPresignRequestType = {
  prefix: string;
  files: SinglePresignRequestType[];
};
