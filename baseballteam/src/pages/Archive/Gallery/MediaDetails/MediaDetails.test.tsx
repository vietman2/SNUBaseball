import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { MediaDetails } from "./MediaDetails";
import * as AuthContext from "@contexts/auth";
import { GalleryProvider } from "@contexts/gallery";
import * as GalleryContext from "@contexts/gallery";
import { sampleAlbums, sampleImageDetail, sampleTags } from "@data/archive";
import { sampleAdmin, sampleAuthorProfile } from "@data/user";
import { AlbumType, MediaTagType } from "@models/archive";
import { MemberMiniType } from "@models/user";
import * as FilesAPI from "@services/archive/files";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@contexts/gallery", () => ({
  GalleryProvider: ({ children }: { children: React.ReactNode }) => children,
  useGallery: jest.fn(),
}));
jest.mock("@fragments/Gallery", () => {
  const { sampleAlbums, sampleTags } = jest.requireActual("@data/archive");
  const { sampleMemberMinis } = jest.requireActual("@data/user");
  return {
    AlbumMenu: ({
      handleSelect,
    }: {
      handleSelect: (album: AlbumType | null) => void;
    }) => (
      <>
        <button
          onClick={() => handleSelect(sampleAlbums[0])}
          data-testid="album-1"
        />
        <button onClick={() => handleSelect(null)} data-testid="album-cancel" />
      </>
    ),
    TagMenu: ({ selectTag }: { selectTag: (tag: MediaTagType) => void }) => (
      <button onClick={() => selectTag(sampleTags[0])} data-testid="tag-1" />
    ),
    PersonMenu: ({
      selectPerson,
    }: {
      selectPerson: (person: MemberMiniType) => void;
    }) => (
      <button
        onClick={() => selectPerson(sampleMemberMinis[0])}
        data-testid="person-1"
      />
    ),
  };
});

describe("<MediaDetails />", () => {
  const defaultContext = {
    albums: sampleAlbums,
    people: [],
    allTags: sampleTags,
    memberQuery: "",
    updateCount: 0,
    setMemberQuery: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(Router, "useParams").mockReturnValue({ mediaId: "1" });
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAdmin,
      login: jest.fn(),
      logout: jest.fn(),
    });
    jest.spyOn(GalleryContext, "useGallery").mockReturnValue(defaultContext);
    jest
      .spyOn(FilesAPI, "getMediaDetails")
      .mockResolvedValue(sampleImageDetail);
  });

  it("handles api error", async () => {
    jest.spyOn(FilesAPI, "getMediaDetails").mockResolvedValue(null);

    renderWithProviders(
      <GalleryProvider>
        <MediaDetails />
      </GalleryProvider>
    );

    await waitFor(() =>
      expect(screen.getByText("ErrorPage")).toBeInTheDocument()
    );
  });

  it("handles image edit and delete", async () => {
    renderWithProviders(
      <GalleryProvider>
        <MediaDetails />
      </GalleryProvider>
    );

    jest.spyOn(FilesAPI, "setAlbum").mockResolvedValueOnce(null);
    jest.spyOn(FilesAPI, "addOrRemoveTag").mockResolvedValueOnce(null);
    jest.spyOn(FilesAPI, "addOrRemovePerson").mockResolvedValueOnce(null);
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("album-menu"));
      fireEvent.click(screen.getByTestId("album-cancel"));
      fireEvent.click(screen.getByTestId("album-1"));
      fireEvent.click(screen.getByTestId("tag-menu"));
      fireEvent.click(screen.getByTestId("tag-1"));
      fireEvent.click(screen.getByTestId("person-menu"));
      fireEvent.click(screen.getByTestId("person-1"));
    });

    jest.spyOn(FilesAPI, "setAlbum").mockResolvedValue(sampleImageDetail);
    jest
      .spyOn(FilesAPI, "addOrRemoveTag")
      .mockResolvedValueOnce(sampleImageDetail);
    jest
      .spyOn(FilesAPI, "addOrRemovePerson")
      .mockResolvedValueOnce(sampleImageDetail);
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("album-1"));
      fireEvent.click(screen.getByTestId("tag-1"));
      fireEvent.click(screen.getByTestId("person-1"));
    });

    jest.spyOn(window, "confirm").mockReturnValueOnce(false);
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("delete-media"));
    });

    jest.spyOn(window, "confirm").mockReturnValue(true);
    jest.spyOn(FilesAPI, "deleteMedia").mockResolvedValueOnce(false);
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("delete-media"));
    });
    jest.spyOn(FilesAPI, "deleteMedia").mockResolvedValue(true);
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("delete-media"));
    });
  });

  it("handles navigations as non-admin (video)", async () => {
    jest.spyOn(FilesAPI, "getMediaDetails").mockResolvedValue({
      ...sampleImageDetail,
      type: "비디오",
      tags: [],
      people: [],
    });
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAuthorProfile,
      login: jest.fn(),
      logout: jest.fn(),
    });

    renderWithProviders(
      <GalleryProvider>
        <MediaDetails />
      </GalleryProvider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("media-info"));
      fireEvent.click(screen.getByTestId("media"));
      fireEvent.click(screen.getByTestId("close-media-modal"));
    });
  });

  it("handles bad param", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ mediaId: "" });

    renderWithProviders(
      <GalleryProvider>
        <MediaDetails />
      </GalleryProvider>
    );
  });
});
