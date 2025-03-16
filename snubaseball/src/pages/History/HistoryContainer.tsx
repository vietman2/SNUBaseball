import { Outlet, Route, Routes } from "react-router-dom";

import { History } from "./HistoryList/HistoryList";

export function HistoryContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<History />} />
      </Route>
    </Routes>
  );
}
