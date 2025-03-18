export type HomecomingResultType = {
  id: number;
  date: string;
  cover_image: string;
  result: string;
  records: {
    id: number;
    title: string;
    content: string;
  }[];
};

export type GraduateType = {
  student_id: string;
  admission_year: number;
  name: string;
  major: string;
  role: string;
  num_semesters: number;
  thoughts: string;
  profile_image: string;
};

export type GraduatesGroupType = {
  year: number;
  graduates: GraduateType[];
};
