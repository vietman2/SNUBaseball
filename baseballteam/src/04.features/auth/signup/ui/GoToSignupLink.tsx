import { useColors } from "@shared/lib/styles";
import { ElevatedLink } from "@shared/ui/Buttons";

export function GoToSignupLink() {
  const { colors } = useColors();

  return (
    <ElevatedLink
      to="/signup"
      $backgroundColor={colors.gray300}
      $color={colors.gray700}
    >
      회원가입
    </ElevatedLink>
  );
}
