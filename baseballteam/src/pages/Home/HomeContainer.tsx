import { Navigate, Route, Routes } from "react-router-dom";

import { ComingSoon } from "@components/Fallbacks";

export function HomeContainer() {
  return (
    <Routes>
      <Route path="/" element={<ComingSoon />} />
    </Routes>
  );
}
