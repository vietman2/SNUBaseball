export type CollegeType = {
  id: number;
  name: string;
  short_name: string;
  departments: MajorType[];
};

export type MajorType = {
  id: number;
  name: string;
  short_name: string;
  college: string;
  college_id: number;
};
