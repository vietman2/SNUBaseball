import { describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

import { sampleUser, UserAvatar, UserAvatarWithEdit } from "@entities/user";
import { renderWithProviders } from "@test-utils/renderer";

describe("UserAvatar", () => {
  it("renders with default image when profile image is not provided", () => {
    const { getByAltText } = renderWithProviders(
      <UserAvatar user={sampleUser} />
    );
    const avatar = getByAltText(sampleUser.member.name) as HTMLImageElement;
    expect(avatar).toBeInTheDocument();
    expect(avatar.src).toBe(
      "https://cdn.snubaseball.co.kr/images/default_profile.png"
    );
  });

  it("renders with profile image", () => {
    const { getByAltText } = renderWithProviders(
      <UserAvatar
        user={{
          ...sampleUser,
          member: {
            ...sampleUser.member,
            profile_image: "https://example.com/profile.jpg",
          },
        }}
        size={48}
      />
    );
    const avatar = getByAltText(sampleUser.member.name) as HTMLImageElement;
    expect(avatar).toBeInTheDocument();
    expect(avatar.src).toBe("https://example.com/profile.jpg");
  });
});

describe("UserAvatarWithEdit", () => {
  it("renders edit button and triggers open function on click", async () => {
    const mockOpen = vi.fn();
    const { getByTestId } = renderWithProviders(
      <UserAvatarWithEdit user={sampleUser} open={mockOpen} />
    );
    const button = getByTestId("avatar-edit-button");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockOpen).toHaveBeenCalledTimes(1);
  });
});
