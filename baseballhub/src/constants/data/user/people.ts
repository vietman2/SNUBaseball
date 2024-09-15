import { PersonType, UserProfileType } from "@models/user/person";

export const samplePeople: PersonType[] = [
  {
    id: 1,
    name: "John Doe",
    birth_date: "2000-01-01",
    admission_year: 2020,
    student_id: "20210001",
    major: "Computer Science",
    role: "Member",
    status: "Active",
    phone: "09123456789",
    email: "email@email.com",
    address: "123 Main St.",
    notes: "Lorem ipsum dolor sit amet",
    profile_image: "https://via.placeholder.com/150",
  },
];

export const sampleProfile: UserProfileType = {
  uuid: "1",
  name: "John Doe",
  profile_image: "https://via.placeholder.com/150",
  role: "Member",
  token: "token",
};

export const tempProfile: UserProfileType = {
  uuid: "1234",
  name: "김유안",
  profile_image:
    "https://kr.object.ncloudstorage.com/snubaseball.test/profiles/2021-12452.jpg",
  role: "주장",
  token: "abcd",
};
