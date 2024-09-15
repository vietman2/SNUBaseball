import { useState } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";

import { Players } from "./Players/Players";
import { Tabs } from "@components/Tabs";
import { SubTab, tabs } from "@navigation/tabs";

const subtabs = tabs.find((tab) => tab.title === "소개")?.submenu || [];

export default function About() {
  const [selectedTab, setSelectedTab] = useState<SubTab>(subtabs[0]);

  const navigate = useNavigate();

  const handleTabClick = (tab: SubTab) => {
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
        <Route path="/" element={<></>} />
        <Route path="/team" element={<></>} />
        <Route path="/players" element={<Players />} />
        <Route path="/managers" element={<></>} />
        <Route path="/staff" element={<></>} />
      </Routes>
      <Outlet />
    </>
  );
}
