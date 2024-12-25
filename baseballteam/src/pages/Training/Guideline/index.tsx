import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { GuidelineDetail } from "./GuidelineDetail/GuidelineDetail";
import { GuidelineList } from "./GuidelineList/GuidelineList";
import { GuidelineWrite } from "./GuidelineWrite/GuidelineWrite";
import { SimpleModal } from "@components/Modals";
import { useWindowSize } from "@hooks/useWindowSize";

function GuidelineLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindowSize();

  const isModalOpen =
    location.pathname.includes("/training/guidelines/") &&
    location.pathname !== "/training/guidelines";

  const isDetailPage =
    !location.pathname.includes("/new") && !location.pathname.includes("/edit");

  const closeModal = () => navigate("/training/guidelines");

  if (width > 768) {
    return (
      <>
        <GuidelineList />
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

  return <GuidelineList />;
}

export { GuidelineDetail, GuidelineLayout, GuidelineWrite };
