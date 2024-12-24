import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { EquipmentDetail } from "./EquipmentDetail/EquipmentDetail";
import { EquipmentList } from "./EquipmentList/EquipmentList";
import { SimpleModal } from "@components/Modals";
import { useWindowSize } from "@hooks/useWindowSize";

function EquipmentLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindowSize();

  const isModalOpen =
    location.pathname.includes("/management/equipment/") &&
    location.pathname !== "/management/equipment";

  const closeModal = () => navigate("/management/equipment");

  if (width > 768) {
    return (
      <>
        <EquipmentList />
        <SimpleModal isOpen={isModalOpen} onClose={closeModal} large>
          <Outlet />
        </SimpleModal>
      </>
    );
  }

  if (isModalOpen) {
    return <Outlet />;
  }

  return <EquipmentList />;
}

export { EquipmentDetail, EquipmentLayout };
