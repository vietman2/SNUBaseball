import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { DiscussionDetail } from "./DiscussionDetail/DiscussionDetail";
import { DiscussionList } from "./DiscussionList/DiscussionList";
import { DiscussionWrite } from "./DiscussionWrite/DiscussionWrite";
import { SimpleModal } from "@components/Modals";
import { useWindowSize } from "@hooks/useWindowSize";

function DiscussionLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindowSize();

  const isModalOpen =
    location.pathname.includes("/forum/discussions/") &&
    location.pathname !== "/forum/discussions";

  const isDetailPage =
    !location.pathname.includes("/new") && !location.pathname.includes("/edit");

  const closeModal = () => navigate("/forum/discussions");

  if (width > 768) {
    return (
      <>
        <DiscussionList />
        <SimpleModal
          isOpen={isModalOpen}
          onClose={closeModal}
          large={isDetailPage}
        >
          <Outlet />
        </SimpleModal>
      </>
    );
  }

  if (isModalOpen) {
    return <Outlet />;
  }

  return <DiscussionList />;
}

export { DiscussionDetail, DiscussionLayout, DiscussionWrite };
