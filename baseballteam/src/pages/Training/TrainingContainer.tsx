import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import { FeedbackLayout, FeedbackWrite } from "./Feedback";
//import { FeedbackDetail, FeedbackLayout } from "./Feedback";
//import { GuidelineDetail, GuidelineLayout, GuidelineWrite } from "./Guideline";
import { ComingSoon } from "@components/Fallbacks";

export function TrainingContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="feedback" />} />
        <Route path="feedback" element={<FeedbackLayout />}>
          <Route path="new" element={<FeedbackWrite />} />
          <Route path=":feedbackId/edit" element={<FeedbackWrite />} />
          <Route path=":feedbackId" element={<ComingSoon />} />
        </Route>
        {/*
        <Route path="guidelines" element={<GuidelineLayout />}>
          <Route path="new" element={<GuidelineWrite />} />
          <Route path=":guidelineId/edit" element={<GuidelineWrite />} />
          <Route path=":guidelineId" element={<GuidelineDetail />} />
        </Route>*/}
      </Route>
    </Routes>
  );
}
