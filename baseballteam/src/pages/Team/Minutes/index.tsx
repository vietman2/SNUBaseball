import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { MinutesList } from "./MinutesList/MinutesList";
import { SimpleModal } from "@components/Modals";
import { useWindowSize } from "@hooks/useWindowSize";

function MinutesLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindowSize();

  const isModalOpen =
    location.pathname.includes("/team/minutes/") &&
    location.pathname !== "/team/minutes";

  const closeModal = () => navigate("/team/minutes");

  if (width > 768) {
    return (
      <>
        <MinutesList />
        <SimpleModal
          isOpen={isModalOpen}
          onClose={closeModal}
        >
          <Outlet />
        </SimpleModal>
      </>
    );
  }

  if (isModalOpen) {
    return <Outlet />;
  }

  return <MinutesList />;
}

export { MinutesLayout };
