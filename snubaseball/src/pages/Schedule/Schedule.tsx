import { useState } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";

import { Events } from "./Events/Events";
import { Games } from "./Games/Games";
import { ScheduleMain } from "./Main/Main";
import { Training } from "./Training/Training";
import { Tabs } from "@components/Tabs";
import { SubTabType, tabs } from "@navigation/tabs";

const subtabs = tabs.find((tab) => tab.title === "일정")?.submenu || [];

export default function Schedule() {
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
        <Route index element={<ScheduleMain />} />
        <Route path="/games" element={<Games />} />
        <Route path="/training/*" element={<Training />} />
        <Route path="/events/*" element={<Events />} />
      </Routes>
      <Outlet />
    </>
  );
}
