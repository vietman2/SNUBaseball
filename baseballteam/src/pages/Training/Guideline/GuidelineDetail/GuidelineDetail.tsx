import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { Divider, VerticalDivider } from "@components/Dividers";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { IFrame } from "@components/Frames";
import { AppIcon } from "@components/Icons";
import { Menu } from "@components/Menus";
import { useAuth } from "@contexts/auth";
import { useTheme } from "@contexts/theme";
import { CommentsList } from "@fragments/Comments";
import { InstagramContent } from "@fragments/Guideline";
import { MenuOptionType } from "@models/app";
import { GuidelineDetailType } from "@models/training";
import {
  getGuidelinesDetail,
  deleteGuideline,
  likeGuideline,
  createGuidelineComment,
  deleteGuidelineComment,
  editGuidelineComment,
} from "@services/training";

export function GuidelineDetail() {
  const [guideline, setGuideline] = useState<GuidelineDetailType>();
  const [options, setOptions] = useState<MenuOptionType[]>([]);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const navigate = useNavigate();
  const { guidelineId } = useParams();
  const { user } = useAuth();
  const { colors } = useTheme();

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    navigate(`/training/guidelines/${guidelineId}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const response = await deleteGuideline(guideline?.id);

      if (response) {
        handleClose();
      } else {
        window.alert("삭제에 실패했습니다.");
      }
    }
  };

  const handleLike = async () => {
    setLoading(true);

    const response = await likeGuideline(guideline?.id);

    if (response) {
      handleRefresh();
    } else {
      window.alert("오류가 발생했습니다.");
    }

    setLoading(false);
  };

  useEffect(() => {
    const fetchGuidelineDetails = async () => {
      if (!guidelineId) {
        setError(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      const response = await getGuidelinesDetail(parseInt(guidelineId));

      if (response) {
        setGuideline(response);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchGuidelineDetails();
  }, [guidelineId, refreshCount]);

  useEffect(() => {
    if (!user || !guideline) return;

    const edit = {
      label: "수정하기",
      onClick: handleEditClick,
    };

    const remove = {
      label: "삭제하기",
      onClick: handleDelete,
    };

    if (user.uuid === guideline.author.uuid) {
      setOptions([edit, remove]);
    } else if (user.is_admin) {
      setOptions([remove]);
    }
  }, [user, guideline]);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (error || !guidelineId || !guideline)
    return <ErrorComponent onRefresh={handleClose} label="뒤로가기" />;

  return (
    <Container>
      <Header>
        <Horizontal>
          <ChipWrapper>
            <button onClick={handleClose}>
              <AppIcon
                icon="chevron-left"
                size={24}
                color={colors.borderDark}
              />
            </button>
            <Chip
              label={guideline.type.label}
              bgColor={guideline.type.background_color}
              color={guideline.type.color}
            />
            <Chip
              label={guideline.location.label}
              bgColor={guideline.location.background_color}
              color={guideline.location.color}
            />
            <Chip
              label={`${guideline.min_people} ~ ${guideline.max_people}명`}
              bgColor="#D5D5D5"
              color="#252525"
              icon="people"
            />
          </ChipWrapper>
          {options.length > 0 && (
            <Menu
              options={options}
              isOpen={isMenuOpen}
              toggleDropdown={toggleMenu}
            />
          )}
        </Horizontal>
        <Subtitle>{guideline.title}</Subtitle>
        <Metadata>
          <div>{guideline.author.name}</div>
          <div>{guideline.created_at}</div>
        </Metadata>
      </Header>
      <span>
        <Divider bold color={colors.borderDark} />
      </span>
      <Contents>
        <div>
          <div>
            {guideline.is_youtube ? (
              <IFrame videoId={guideline.video_id} />
            ) : (
              <InstagramContent
                id={guideline.video_id}
                thumbnail={guideline.thumbnail}
                video={guideline.video_url}
              />
            )}
            <Content>{guideline.content}</Content>
          </div>
          <Stats>
            <Row>
              <button onClick={handleLike} data-testid="like">
                <AppIcon
                  icon={guideline.is_liked ? "heart" : "heart-outline"}
                  size={20}
                  color={guideline.is_liked ? "#FF0000" : "#0F0F70"}
                />
              </button>
              <div>{guideline.num_likes}</div>
            </Row>
            <Row>
              <AppIcon icon="chat" size={20} color="#0F0F70" />
              <div>{guideline.comments.length}</div>
            </Row>
          </Stats>
        </div>
        <span>
          <VerticalDivider bold color={colors.borderDark} />
        </span>
        <span>
          <Divider bold color={colors.borderDark} />
        </span>
        <div>
          <CommentsList
            postId={guideline.id}
            comments={guideline.comments}
            createComment={createGuidelineComment}
            deleteComment={deleteGuidelineComment}
            editComment={editGuidelineComment}
            refresh={handleRefresh}
          />
        </div>
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  gap: 16px;

  color: ${({ theme }) => theme.colors.foreground500};
  font-weight: 700;
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ChipWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  > button {
    display: none;

    @media (max-width: 768px) {
      display: flex;
    }
  }
`;

const Metadata = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const Contents = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;

  white-space: pre-wrap;

  > div {
    display: flex;
    flex: 1;
    flex-direction: column;
    max-width: 50%;
    padding: 16px 12px 4px 12px;
  }

  > div:first-child {
    flex: 1;

    > div:first-child {
      display: flex;
      flex: 1;
      flex-direction: column;
      margin-bottom: 16px;
      gap: 8px;

      @media (max-width: 768px) {
        min-height: 300px;
      }
    }
  }

  > span:last-child {
    display: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    > div {
      max-width: 100%;
    }

    > span:first-child {
      display: none;
    }
  }
`;

const Content = styled.div`
  line-height: 1.5;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.foreground900};
`;

const Subtitle = styled.div`
  padding-bottom: 2px;
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground900};
`;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
  gap: 12px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
  gap: 4px;

  color: ${({ theme }) => theme.colors.foreground700};

  > button {
    display: flex;
    align-self: center;
  }
`;
