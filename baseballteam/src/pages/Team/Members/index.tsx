import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { MemberDetail } from "./MemberDetail/MemberDetail";
import { MemberEdit } from "./MemberEdit/MemberEdit";
import { MembersList } from "./MembersList/MembersList";
import { SimpleModal } from "@components/Modals";
import { useWindowSize } from "@hooks/useWindowSize";

function MembersLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindowSize();

  const isModalOpen =
    location.pathname.includes("/team/members/") &&
    location.pathname !== "/team/members";

  const closeModal = () => navigate("/team/members");

  if (width > 768) {
    return (
      <>
        <MembersList />
        <SimpleModal isOpen={isModalOpen} onClose={closeModal}>
          <Outlet />
        </SimpleModal>
      </>
    );
  }

  if (isModalOpen) {
    return <Outlet />;
  }

  return <MembersList />;
}

export { MemberDetail, MemberEdit, MembersLayout };
