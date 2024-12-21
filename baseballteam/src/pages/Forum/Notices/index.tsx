import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { NoticeDetail } from "./NoticeDetail/NoticeDetail";
import { NoticeList } from "./NoticeList/NoticeList";
import { NoticeWrite } from "./NoticeWrite/NoticeWrite";
import { SimpleModal } from "@components/Modals";
import { useWindowSize } from "@hooks/useWindowSize";

function NoticeLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindowSize();

  const isModalOpen =
    location.pathname.includes("/forum/notices/") &&
    location.pathname !== "/forum/notices";

  const isDetailPage =
    !location.pathname.includes("/new") && !location.pathname.includes("/edit");

  const closeModal = () => navigate("/forum/notices");

  if (width > 768) {
    return (
      <>
        <NoticeList />
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

  return <NoticeList />;
}

export { NoticeDetail, NoticeLayout, NoticeWrite };
