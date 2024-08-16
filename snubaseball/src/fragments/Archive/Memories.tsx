import { useEffect, useState } from "react";
import styled from "styled-components";

import { getImages } from "@services/archive/images";

type ImageType = {
  id: number;
  title: string;
  file: string;
};

export function Memories() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    const response = await getImages();

    if (response.status === 200) {
      setImages(response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <ImageBox>
          <Image1 src={images[0].file} />
          <ImageTitle>{images[0].title}</ImageTitle>
        </ImageBox>
      </Row>
      <Row>
        <ImageBox>
          <Image2 src={images[1].file} />
          <ImageTitle>{images[1].title}</ImageTitle>
        </ImageBox>
        <ImageBox>
          <Image2 src={images[2].file} />
          <ImageTitle>{images[2].title}</ImageTitle>
        </ImageBox>
      </Row>
      <Row>
        <ImageBox>
          <Image3 src={images[3].file} />
          <ImageTitle>{images[3].title}</ImageTitle>
        </ImageBox>
      </Row>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: "row";
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image1 = styled.img`
  width: 35vw;
  height: 250px;
`;

const Image2 = styled.img`
  width: 25vw;
  height: 110px;
`;

const Image3 = styled.img`
  width: 25vw;
  height: 250px;
`;

const ImageTitle = styled.div`
  font-size: 14px;
  margin-top: 5px;
  color: black;
`;
