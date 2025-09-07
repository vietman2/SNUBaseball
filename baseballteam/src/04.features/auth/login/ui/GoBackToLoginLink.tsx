import { useNavigate } from "react-router";

import { useColors } from "@shared/lib/styles";
import { ElevatedTextButton } from "@shared/ui/Buttons";

export function GoBackToLoginLink() {
  const { colors } = useColors();
  const navigate = useNavigate();

  const goBack = () => {
    // 이전 페이지가 있으면 그 페이지로, 없으면 로그인 페이지로 이동
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/login");
    }
  };

  return (
    <ElevatedTextButton
      onClick={goBack}
      $backgroundColor={colors.gray300}
      $color={colors.gray700}
    >
      돌아가기
    </ElevatedTextButton>
  );
}
