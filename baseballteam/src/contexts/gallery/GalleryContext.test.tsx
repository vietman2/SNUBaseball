import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { GalleryProvider, useGallery } from "./GalleryContext";
import { sampleAlbums, sampleTags } from "@data/archive";
import { sampleMemberMinis } from "@data/user";
import * as AlbumsAPI from "@services/archive/albums";
import * as TagsAPI from "@services/archive/tags";
import * as MembersAPI from "@services/person/members";

const TestComponent = () => {
  const { setMemberQuery, update } = useGallery();

  return (
    <div>
      <button onClick={() => setMemberQuery("query")}>Set Query</button>
      <button onClick={update}>Update</button>
    </div>
  );
};

describe("<GalleryProvider />", () => {
  beforeEach(() => {
    jest.spyOn(AlbumsAPI, "getAlbums").mockResolvedValue(sampleAlbums);
    jest.spyOn(TagsAPI, "getTags").mockResolvedValue(sampleTags);
    jest
      .spyOn(MembersAPI, "searchMembers")
      .mockResolvedValue(sampleMemberMinis);
  });

  it("should handle api errors", async () => {
    jest.spyOn(AlbumsAPI, "getAlbums").mockResolvedValue(null);
    jest.spyOn(TagsAPI, "getTags").mockResolvedValue(null);
    jest.spyOn(MembersAPI, "searchMembers").mockResolvedValue(null);
    render(
      <GalleryProvider>
        <TestComponent />
      </GalleryProvider>
    );
  });

  it("should handle initial data loading and update", async () => {
    render(
      <GalleryProvider>
        <TestComponent />
      </GalleryProvider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Update"));
    });
  });

  it("handles context misuse", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    const Child = () => {
      useGallery();

      return <div>Children</div>;
    };

    expect(() => {
      render(<Child />);
    }).toThrowError();
  });
});
