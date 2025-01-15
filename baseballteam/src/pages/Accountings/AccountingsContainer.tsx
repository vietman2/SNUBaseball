import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import { HistoryDetail, HistoryLayout, HistoryWrite } from "./History";
import { ComingSoon } from "@components/Fallbacks";

export function AccountingsContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<ComingSoon />} />
        <Route path="history" element={<HistoryLayout />}>
          <Route path="new" element={<HistoryWrite />} />
          <Route path=":id/edit" element={<HistoryWrite />} />
          <Route path=":id" element={<HistoryDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}
