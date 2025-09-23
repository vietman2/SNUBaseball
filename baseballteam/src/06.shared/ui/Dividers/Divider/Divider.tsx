import { useColors } from "@shared/lib/styles";

interface Props {
  width?: string;
  bold?: boolean;
  color?: string;
}

export function Divider({ bold = false, color }: Readonly<Props>) {
  const { colors } = useColors();

  const dividerColor = color ?? colors.divider;

  return (
    <div
      style={{
        alignSelf: "stretch",
        height: bold ? "2px" : "1px",
        backgroundColor: dividerColor,
      }}
    />
  );
}
