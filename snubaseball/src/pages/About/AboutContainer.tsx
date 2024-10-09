import { useState } from "react";
import { Outlet, Route, Routes, useNavigate, Navigate } from "react-router-dom";

import { Players } from "./Players/Players";
import { Tabs } from "@components/Tabs";
import { SubTabType } from "@models/navigation";
import { aboutTab } from "@navigation/tabs";

const subtabs = aboutTab.submenu ? aboutTab.submenu : [];

export default function About() {
  const [selectedTab, setSelectedTab] = useState<SubTabType>(subtabs[0]);

  const navigate = useNavigate();

  const handleTabClick = (tab: SubTabType) => {
    setSelectedTab(tab);

    navigate(tab.path);
  };

  return (
    <>
      <Tabs
        tabs={subtabs}
        selectedTab={selectedTab}
        setSelectedTab={handleTabClick}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/team" replace />} />
        <Route path="/team" element={<></>} />
        <Route path="/players" element={<Players />} />
        <Route path="/managers" element={<></>} />
        <Route path="/staff" element={<></>} />
      </Routes>
      <Outlet />
    </>
  );
}
