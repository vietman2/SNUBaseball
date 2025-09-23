type MemberInfoType = {
  id: number;
  name: string;
  admission_year: number;
  birth_date: string;
  profile_image: string | null;
  major: string;
};

export type RosterMemberType = {
  id: number;
  member: MemberInfoType;
  role: string;
  back_number: number;
};

export type RosterMemberDetailsType = {
  id: number;
  member: MemberInfoType;
  role: string;
  position: string;
  hands: string;
  back_number: number;
  height: number;
  weight: number;
  goal: string;
};

export type RosterType = {
  code: string; // 연도-학기 코드
  managers: RosterMemberType[];
  players: RosterMemberType[];
};
