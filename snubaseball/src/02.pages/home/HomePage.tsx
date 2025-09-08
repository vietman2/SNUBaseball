import { fetchMainImages } from "./api/fetchMainImages";
import { ImageSlider } from "./ui/ImageSlider";
import { Container } from "./ui/styles";

export async function HomePage() {
  const mainImages = await fetchMainImages();

  return (
    <Container>
      <ImageSlider images={mainImages} />
    </Container>
  );
}
