interface Props {
  videoId: string;
  width?: string;
  height?: string;
}

export function IFrame({ videoId, width = "100%", height = "100%" }: Readonly<Props>) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div>
      <iframe
        width={width}
        height={height}
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
