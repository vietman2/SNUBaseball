import { TrainingContainer } from "./TrainingContainer";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("./Feedback", () => ({
  FeedbackDetail: () => <div>FeedbackDetail</div>,
  FeedbackLayout: () => <div>FeedbackLayout</div>,
  FeedbackWrite: () => <div>FeedbackWrite</div>,
}));
/*
jest.mock("./Guideline", () => ({
  GuidelineDetail: () => <div>GuidelineDetail</div>,
  GuidelineLayout: () => <div>GuidelineLayout</div>,
  GuidelineWrite: () => <div>GuidelineWrite</div>,
}));*/

describe("<TrainingContainer />", () => {
  it("renders", async () => {
    renderWithProviders(<TrainingContainer />);
  });
});
