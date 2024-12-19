import { UserProfileType } from "@models/user";

export const sampleProfile: UserProfileType = {
  uuid: "1",
  name: "John Doe",
  profile_image: "https://via.placeholder.com/150",
  is_admin: false,
};

export const sampleAdmin: UserProfileType = {
  uuid: "1234",
  name: "김유안",
  profile_image: "https://via.placeholder.com/150",
  is_admin: true,
};

export const sampleAuthorProfile: UserProfileType = {
  uuid: "12",
  name: "Lorem Ipsum",
  profile_image: "https://via.placeholder.com/150",
  is_admin: false,
};
