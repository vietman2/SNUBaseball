import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { Divider, VerticalDivider } from "@components/Dividers";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { Menu } from "@components/Menus";
import { useAuth } from "@contexts/auth";
import { useTheme } from "@contexts/theme";
import { CommentsList } from "@fragments/Comments";
import { MenuOptionType } from "@models/app";
import { FeedbackDetailType } from "@models/training";
import {
  getFeedbackDetail,
  deleteFeedback,
  createFeedbackComment,
  deleteFeedbackComment,
  editFeedbackComment,
} from "@services/training";

export function FeedbackDetail() {
  const [feedback, setFeedback] = useState<FeedbackDetailType>();

  const [menuOptions, setMenuOptions] = useState<MenuOptionType[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const { feedbackId } = useParams();
  const navigation = useNavigate();
  const { user } = useAuth();
  const { colors } = useTheme();

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const handleClose = () => {
    navigation(-1);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleDelete = async (id: number) => {
    const response = await deleteFeedback(id);

    if (response) {
      handleClose();
    } else {
      window.alert("삭제에 실패했습니다.");
    }
  };

  useEffect(() => {
    const fetchFeedbackDetails = async () => {
      if (!feedbackId) return;

      setLoading(true);
      const response = await getFeedbackDetail(parseInt(feedbackId));

      if (response) {
        setFeedback(response.data);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchFeedbackDetails();
  }, [feedbackId, refreshCount]);

  useEffect(() => {
    if (!user || !feedback) return;

    const edit = {
      label: "수정하기",
      onClick: () => {
        navigation(`/training/feedback/${feedback.id}/edit`);
      },
    };

    const del = {
      label: "삭제하기",
      onClick: () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
          handleDelete(feedback.id);
        }
      },
    };

    if (user.uuid === feedback.author.uuid) {
      setMenuOptions([edit, del]);
    } else if (user.is_admin) {
      setMenuOptions([del]);
    }
  }, [user, feedback]);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (feedbackId === null || feedback === undefined || error)
    return <ErrorComponent onRefresh={handleClose} label="뒤로가기" />;

  return (
    <Container>
      <Header>
        <Wide>
          <ChipWrapper>
            <BackButton onClick={handleClose}>
              <AppIcon
                icon="chevron-left"
                size={24}
                color={colors.borderDark}
              />
            </BackButton>
            <Chip
              label={feedback.category.label}
              color={feedback.category.color}
              bgColor={feedback.category.background_color}
            />
            <StatusChipWrapper
              style={{ backgroundColor: feedback.status.background_color }}
            >
              <Dot color={feedback.status.color} />
              {feedback.status.label}
            </StatusChipWrapper>
          </ChipWrapper>
          {menuOptions.length > 0 && (
            <Menu
              options={menuOptions}
              isOpen={isMenuOpen}
              toggleDropdown={toggleMenu}
            />
          )}
        </Wide>
        <Subtitle>
          [{feedback.player.name}] {feedback.title}
        </Subtitle>
        <Metadata>
          <div>{feedback.author.name}</div>
          <div>{feedback.created_at}</div>
        </Metadata>
      </Header>
      <span>
        <Divider bold color={colors.borderDark} />
      </span>
      <Contents>
        <div>{feedback.content}</div>
        <span>
          <VerticalDivider bold color={colors.borderDark} />
        </span>
        <span>
          <Divider bold color={colors.borderDark} />
        </span>
        <div>
          <CommentsList
            postId={feedback.id}
            comments={feedback.comments}
            createComment={createFeedbackComment}
            deleteComment={deleteFeedbackComment}
            editComment={editFeedbackComment}
            refresh={handleRefresh}
          />
        </div>
      </Contents>
    </Container>
  );
}

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
`;

const Wide = styled(Horizontal)`
  align-items: center;
  justify-content: space-between;
`;

const Container = styled(Vertical)`
  flex: 1;
  padding: 8px 24px;

  @media (max-width: 768px) {
    padding: 0 12px;
  }
`;

const Header = styled(Vertical)`
  padding: 16px 12px;
  gap: 16px;

  color: ${({ theme }) => theme.colors.foreground500};
  font-weight: 700;
`;

const ChipWrapper = styled(Horizontal)`
  align-items: center;
  gap: 8px;
`;

const Metadata = styled(Horizontal)`
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const Subtitle = styled.div`
  padding-bottom: 2px;
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground900};
`;

const Contents = styled(Horizontal)`
  flex: 1;

  white-space: pre-wrap;

  > div {
    display: flex;
    flex: 1;
    flex-direction: column;
    max-width: 50%;
    padding: 16px 12px 4px 12px;
  }

  > span:last-child {
    display: none;
  }

  > div:first-child {
    line-height: 1.5;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.foreground900};
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

const StatusChipWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding: 5px 10px;
  gap: 8px;

  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground700};

  border-radius: 8px;

  white-space: nowrap;
`;

const Dot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const BackButton = styled.button`
  padding-top: 4px;

  @media (min-width: 768px) {
    display: none;
  }
`;
