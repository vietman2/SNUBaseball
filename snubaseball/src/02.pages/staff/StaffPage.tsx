import { Metadata } from "next";

import { StaffPageContainer } from "./ui/styles";
import { StaffCard, staffs } from "@entities/staffs";

export const metadata: Metadata = {
  title: "지도자 | 서울대 야구부",
  description: "",
};

export function StaffPage() {
  return (
    <StaffPageContainer>
      {staffs.map((staff) => (
        <StaffCard key={staff.name} staff={staff} />
      ))}
    </StaffPageContainer>
  );
}
