interface Props {
  videoId: string;
  width?: string;
  height?: string;
}

export function IFrame({
  videoId,
  width = "100%",
  height = "24vh",
}: Readonly<Props>) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <iframe
      src={embedUrl}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ width, height }}
    />
  );
}
