import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { HistoryDetail } from "./HistoryDetail/HistoryDetail";
import { HistoryList } from "./HistoryList/HistoryList";
import { HistoryWrite } from "./HistoryWrite/HistoryWrite";
import { SimpleModal } from "@components/Modals";
import { useWindowSize } from "@hooks/useWindowSize";

function HistoryLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindowSize();

  const isModalOpen =
    location.pathname.includes("/accountings/history/") &&
    location.pathname !== "/accountings/history";

  const closeModal = () => navigate("/accountings/history");

  if (width > 768) {
    return (
      <>
        <HistoryList />
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

  return <HistoryList />;
}

export { HistoryLayout, HistoryDetail, HistoryWrite };
