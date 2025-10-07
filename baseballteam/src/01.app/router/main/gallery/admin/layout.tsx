import { Link, Outlet } from "react-router";
import styled from "styled-components";

import { ModalPageContainer, SimpleModalPage } from "@widgets/modal";
import { useRouter } from "@shared/lib/router";
import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";

export function GalleryAdminLayout() {
  const { colors } = useColors();
  const { displayLocation } = useRouter();

  const locationEndsWith = (href: string) => {
    return displayLocation.pathname.endsWith(href);
  };

  return (
    <SimpleModalPage onCloseTarget="/gallery">
      <Container>
        <Left>
          <h2 className="gallery-admin-modal-title">갤러리 관리</h2>
          <Tabs>
            <Tab
              to="/gallery/admin/albums"
              className={locationEndsWith("albums") ? "active" : ""}
            >
              <AppIcon
                icon="album"
                size={20}
                color={
                  locationEndsWith("albums")
                    ? colors.textPrimary
                    : colors.textSecondary
                }
              />
              앨범 관리
            </Tab>
            <Tab
              to="/gallery/admin/tags"
              className={locationEndsWith("tags") ? "active" : ""}
            >
              <AppIcon
                icon="tag"
                size={20}
                color={
                  locationEndsWith("tags")
                    ? colors.textPrimary
                    : colors.textSecondary
                }
              />
              태그 관리
            </Tab>
          </Tabs>
        </Left>
        <Right>
          <Outlet />
        </Right>
      </Container>
    </SimpleModalPage>
  );
}

const Container = styled(ModalPageContainer)`
  min-height: 40vh;
  max-height: 50vh;
  width: 40vw;

  h2.gallery-admin-modal-title {
    margin: 0;
    font-size: 1.25rem;
  }
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
`;

const Tabs = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
`;

const Tab = styled(Link)`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  gap: 12px;

  color: ${({ theme }) => theme.colors.textSecondary};

  border-radius: 8px;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;

  &.active {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors.backgroundPaper};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`;

const Right = styled.div`
  flex: 4;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.backgroundDefault};
  border-radius: 12px;
  // shadow to left
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.1);
`;
