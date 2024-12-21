import { Route, Routes, Navigate, Outlet } from "react-router-dom";

/*import {
  DiscussionDetail,
  DiscussionLayout,
  DiscussionWrite,
} from "./Discussions";*/
import { NoticeDetail, NoticeLayout, NoticeWrite } from "./Notices";

export function ForumContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="notices" />} />
        <Route path="notices" element={<NoticeLayout />}>
          <Route path="new" element={<NoticeWrite />} />
          <Route path=":noticeId/edit" element={<NoticeWrite />} />
          <Route path=":noticeId" element={<NoticeDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}
