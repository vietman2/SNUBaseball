type CommonFields = {
  id: number;
  name: string;
  back_number: number | null;
  birth_date: string | null;
  date_joined: string | null;
  num_semester: number;
};

export type PlayerDetailType = {
  type: "PLAYER";
  extras: {
    position?: string;
    bat_throw_hands?: string;
    height?: number;
    weight?: number;
  };
} & CommonFields;

type ManagerDetailType = {
  type: "MANAGER";
} & CommonFields;

export type MemberDetailType = PlayerDetailType | ManagerDetailType;
