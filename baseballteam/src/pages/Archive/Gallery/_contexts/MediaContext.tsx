import { createContext, useContext, useMemo, useState } from "react";
import axios from "axios";

import {
  ImageType,
  MediaResponseType,
  MediaType,
  VideoType,
} from "@models/archive";
import {
  addOrRemovePerson,
  addOrRemoveTag,
  deleteMedia,
  getFiles,
  getMediaDetails,
  setAlbum,
} from "@services/archive";

interface MediaContextType {
  files: MediaType[];
  selectedImage: ImageType | null;
  selectedVideo: VideoType | null;
  selectMedia: (media: MediaType | null) => void;
  reloadData: (
    albumId: number | undefined,
    tagId: number | undefined,
    personId: number | undefined
  ) => void;
  loadMoreData: () => void;
  deleteMedia: (id: number) => void;
  updateAlbum: (
    mediaId: number,
    albumId: number,
    type: "이미지" | "비디오"
  ) => void;
  updateTags: (
    mediaId: number,
    tagId: number,
    type: "이미지" | "비디오"
  ) => void;
  updatePerson: (
    mediaId: number,
    personId: number,
    type: "이미지" | "비디오"
  ) => void;
  loading: boolean;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export function MediaProvider({ children }: { children: React.ReactNode }) {
  const [mediaResponse, setMediaResponse] = useState<MediaResponseType | null>(
    null
  );
  const [files, setFiles] = useState<MediaType[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const selectMedia = async (media: MediaType | null) => {
    if (!media) {
      setSelectedImage(null);
      setSelectedVideo(null);
    } else {
      const response = await getMediaDetails(media.id);

      if (response) {
        if (media.type === "이미지") {
          setSelectedImage(response);
        } else {
          setSelectedVideo(response);
        }
      }
    }
  };

  const reloadData = async (
    albumId: number | undefined,
    tagId: number | undefined,
    personId: number | undefined
  ) => {
    setLoading(true);

    const response = await getFiles(albumId, tagId, personId);

    if (response) {
      setMediaResponse(response);
      setFiles(response.results);
    }

    setLoading(false);
  };

  const loadMoreData = async () => {
    if (mediaResponse && mediaResponse.next && !loading) {
      setLoading(true);

      const response = await axios.get(mediaResponse.next);

      if (response) {
        setMediaResponse(response.data);
        setFiles((prev) => [...prev, ...response.data.results]);
      }

      setLoading(false);
    }
  };

  const updateAlbum = async (
    mediaId: number,
    albumId: number,
    type: "이미지" | "비디오"
  ) => {
    const response = await setAlbum(mediaId, albumId);

    if (response) {
      if (type === "이미지") {
        setSelectedImage(response);
      } else {
        setSelectedVideo(response);
      }
    }
  };

  const updateTags = async (
    mediaId: number,
    tagId: number,
    type: "이미지" | "비디오"
  ) => {
    const response = await addOrRemoveTag(mediaId, tagId);

    if (response) {
      if (type === "이미지") {
        setSelectedImage(response);
      } else {
        setSelectedVideo(response);
      }
    }
  };

  const updatePerson = async (
    mediaId: number,
    personId: number,
    type: "이미지" | "비디오"
  ) => {
    const response = await addOrRemovePerson(mediaId, personId);

    if (response) {
      if (type === "이미지") {
        setSelectedImage(response);
      } else {
        setSelectedVideo(response);
      }
    }
  };

  const removeMedia = async (id: number) => {
    const response = await deleteMedia(id);

    if (response) {
      setFiles((prev) => prev.filter((file) => file.id !== id));
      selectMedia(null);
    } else {
      window.alert("오류가 발생했습니다.");
    }
  };

  const value = useMemo(
    () => ({
      files: files,
      selectedImage,
      selectedVideo,
      selectMedia,
      reloadData,
      loadMoreData,
      deleteMedia: removeMedia,
      updateAlbum,
      updateTags,
      updatePerson,
      loading,
    }),
    [files, selectedImage, selectedVideo, loading, mediaResponse]
  );

  return (
    <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
  );
}

export function useMedia() {
  const context = useContext(MediaContext);

  if (!context) {
    throw new Error("useMedia must be used within a MediaProvider");
  }

  return context;
}
