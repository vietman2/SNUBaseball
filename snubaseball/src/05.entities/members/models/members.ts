type MemberFields = {
  id: number;
  name: string;
  birth_date: string; // YYYY-MM-DD
  date_joined: string; // YYYY-MM-DD
  num_semester: number;
  admission_year: number;
  major: string;
  back_number: number | null;
  profile_image: string | null;
};

type PlayerType = {
  type: "PLAYER";
  extras: {
    [key: string]: string | number;
  };
} & MemberFields;

type ManagerType = {
  type: "MANAGER";
} & MemberFields;

export type MemberType = PlayerType | ManagerType;
