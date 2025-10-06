import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";

import {
  MediaContext,
  type MediaType,
  useMediaAPI,
} from "@entities/gallery/media";
import { useAlbums } from "@entities/gallery/album";
import { useTags } from "@entities/gallery/tags";

interface Props {
  children: ReactNode;
}

/* !! 반드시 AlbumProvider, TagsProvider 안에 위치해야 한다!! */
export function MediaProvider({ children }: Readonly<Props>) {
  const [selectedMedia, setSelectedMedia] = useState<MediaType | null>(null); // 미디어를 선택하면 모달 형태로 크게 띄운다
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { selectedAlbum } = useAlbums();
  const { selectedTags } = useTags();

  const { "*": rest } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isError, refetch } = useMediaAPI(
    selectedAlbum?.title,
    selectedTags.map((tag) => tag.id),
    currentPage
  );

  /* URL에 미디어 선택이 감지되면, 모달을 띄울 수 있도록 상태를 업데이트한다 */
  useEffect(() => {
    if (rest && data) {
      const mediaKey = `gallery/${rest}`;
      const foundMedia = data.results.find((media) => media.key === mediaKey);
      if (foundMedia) {
        setSelectedMedia(foundMedia);
      } else {
        // URL에 해당하는 미디어가 없으면 선택 해제하고,
        // URL을 초기화
        navigate("/gallery", { replace: true });
        setSelectedMedia(null);
      }
    } else {
      setSelectedMedia(null);
    }
  }, [rest, data, navigate]);

  /* URL에 페이지 변경이 감지되면, 상태를 업데이트해서, API 호출을 유도한다 */
  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page > 0 ? page : 1);
  }, [searchParams, setSearchParams]);

  const mediaValue = useMemo(
    () => ({
      media: data ? data.results : [],
      num_pages: data ? data.pages : 0,
      page_size: data ? data.page_size : 0,
      refresh: refetch,
      selectedMedia,
      current_page: currentPage,
      isLoading,
      isError,
    }),
    [selectedMedia, currentPage, data, isLoading, isError, refetch]
  );

  return (
    <MediaContext.Provider value={mediaValue}>{children}</MediaContext.Provider>
  );
}
