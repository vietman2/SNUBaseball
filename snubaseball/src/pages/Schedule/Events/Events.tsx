import { useState } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";

import { Closing } from "./Closing/Closing";
import { Homecoming } from "./Homecoming/Homecoming";
import { Graduation } from "./Graduation/Graduation";
import { SubTabs } from "@components/Tabs";

const subtabs = ["OB전", "종무식", "졸업식"];

export function Events() {
  const [selectedTab, setSelectedTab] = useState<string>("OB전");

  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);

    if (tab === "OB전") {
      navigate("/schedule/events/ob");
    } else if (tab === "종무식") {
      navigate("/schedule/events/closing");
    } else if (tab === "졸업식") {
      navigate("/schedule/events/graduation");
    } else {
      navigate("/schedule/events/ob");
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
        <Route index element={<Navigate to="/schedule/events/ob" />} />
        <Route path="/ob" element={<Homecoming />} />
        <Route path="/graduation" element={<Graduation />} />
        <Route path="/closing" element={<Closing />} />
      </Routes>
      <Outlet />
    </>
  );
}
