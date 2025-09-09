type CommonFields = {
  id: number;
  name: string;
  back_number: number | null;
  birth_date: string | null;
  date_joined: string | null;
  num_semester: number;
};

type PlayerDetailType = {
  type: "PLAYER";
  extras: {
    position: string | null;
    bat_throw_hands: string | null;
    height: number | null;
    weight: number | null;
  };
} & CommonFields;

type ManagerDetailType = {
  type: "MANAGER";
} & CommonFields;

export type MemberDetailType = PlayerDetailType | ManagerDetailType;
