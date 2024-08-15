import { useState } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";

import { Events } from "./Events/Events";
import { Games } from "./Games/Games";
import { ScheduleMain } from "./Main/Main";
import { Training } from "./Training/Training";
import { Tabs } from "@components/Tabs";

const tabs = ["전체", "경기", "훈련", "행사"];

export default function Schedule() {
  const [selectedTab, setSelectedTab] = useState<string>("전체");

  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);

    if (tab === "전체") {
      navigate("/schedule");
    } else if (tab === "경기") {
      navigate("/schedule/games");
    } else if (tab === "훈련") {
      navigate("/schedule/training");
    } else if (tab === "행사") {
      navigate("/schedule/events");
    } else {
      navigate("/schedule");
    }
  }

  return (
    <>
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={handleTabClick}
      />
      <Routes>
        <Route index element={<ScheduleMain />} />
        <Route path="/games" element={<Games />} />
        <Route path="/training" element={<Training />} />
        <Route path="/events/*" element={<Events />} />
      </Routes>
      <Outlet />
    </>
  );
}
