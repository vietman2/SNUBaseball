import type { UserProfileType } from "./types";

export const samplePlayer: UserProfileType = {
  uuid: "1",
  name: "Player 1",
  profile_image: "image_url/1",
  is_admin: false,
  person_id: 1,
};

export const sampleCaptain: UserProfileType = {
  uuid: "2",
  name: "Captain 1",
  profile_image: "image_url/2",
  is_admin: true,
  person_id: 2,
};
