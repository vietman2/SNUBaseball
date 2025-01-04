export type PlayerInfoType = {
  id: number;
  name: string;
  position: string;
  back_number: number;
  height: number;
  weight: number;
  profile_image: string;
};

export type StaffInfoType = {
  id: number;
  name: string;
  back_number: number;
  role: string;
  profile_image: string;
};

export type TeamInfoType = {
  staff: StaffInfoType[];
  managers: StaffInfoType[];
  players: PlayerInfoType[];
};
