interface Props {
  width?: string;
  bold?: boolean;
  color?: string;
}

export function Divider({
  bold = false,
  color = "#D4D4D4",
}: Readonly<Props>) {
  return (
    <div
      style={{
        alignSelf: "stretch",
        height: bold ? "2px" : "1px",
        backgroundColor: color,
      }}
    />
  );
}
