import { Route, Routes, Navigate, Outlet } from "react-router-dom";

/*import {
  DiscussionDetail,
  DiscussionLayout,
  DiscussionWrite,
} from "./Discussions";
import { NoticeDetail, NoticeLayout, NoticeWrite } from "./Notices";*/
import { ComingSoon } from "@components/Fallbacks";

export function ForumContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="notices" />} />
        <Route path="notices" element={<ComingSoon />}></Route>
      </Route>
    </Routes>
  );
}
