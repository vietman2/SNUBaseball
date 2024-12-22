import { Outlet, useLocation, useNavigate } from "react-router-dom";

//import { FeedbackDetail } from "./FeedbackDetail/FeedbackDetail";
import { FeedbackList } from "./FeedbackList/FeedbackList";
import { SimpleModal } from "@components/Modals";
import { useWindowSize } from "@hooks/useWindowSize";

function FeedbackLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindowSize();

  const isModalOpen =
    location.pathname.includes("/training/feedback/") &&
    location.pathname !== "/training/feedback";

  const isDetailPage =
    !location.pathname.includes("/new") && !location.pathname.includes("/edit");

  const closeModal = () => navigate("/training/feedback");

  if (width > 768) {
    return (
      <>
        <FeedbackList />
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
  
    return <FeedbackList />;
}

export { FeedbackLayout };
