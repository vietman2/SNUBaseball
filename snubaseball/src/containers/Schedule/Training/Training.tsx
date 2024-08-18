import { useState } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";

import { Monthly } from "./Monthly/Monthly";
import { Summer } from "./Summer/Summer";
import { Winter } from "./Winter/Winter";
import { SubTabs } from "@components/Tabs";

const subtabs = ["월별 훈련 일정", "제주도 전지훈련", "여름 합숙훈련"]

export function Training() {
  const [selectedTab, setSelectedTab] = useState<string>("월별 훈련 일정");

  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);

    if (tab === "월별 훈련 일정") {
      navigate("/schedule/training/monthly");
    } else if (tab === "제주도 전지훈련") {
      navigate("/schedule/training/winter");
    } else if (tab === "여름 합숙훈련") {
      navigate("/schedule/training/summer");
    } else {
      navigate("/schedule/training/monthly");
    }
  };

  return (
    <>
      <SubTabs
        tabs={subtabs}
        selectedTab={selectedTab}
        setSelectedTab={handleTabClick}
      />
      <Routes>
        <Route index element={<Navigate to="/schedule/training/monthly" />} />
        <Route path="/monthly" element={<Monthly />} />
        <Route path="/winter" element={<Winter />} />
        <Route path="/summer" element={<Summer />} />
      </Routes>
      <Outlet />
    </>
  );
}
