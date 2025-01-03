import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import { ResultsDetail, ResultsList } from "./Results";

export function RecordsContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="results" />} />
        <Route path="results/:gameId" element={<ResultsDetail />} />
        <Route path="results" element={<ResultsList />} />
      </Route>
    </Routes>
  );
}
