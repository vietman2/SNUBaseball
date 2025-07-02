interface Props {
  height?: string;
  bold?: boolean;
  color?: string;
}

export function VerticalDivider({
  height = "100%",
  bold = false,
  color = "#D4D4D4",
}: Readonly<Props>) {
  return (
    <div
      style={{
        width: bold ? "2px" : "1px",
        height,
        backgroundColor: color,
      }}
    />
  );
}
