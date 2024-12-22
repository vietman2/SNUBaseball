import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { ErrorComponent, Loading } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { TextInput } from "@components/Inputs";
//import { createFeedback }
import { getMembers } from "@services/person";
import { MemberType } from "@models/user";

export function FeedbackWrite() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [members, setMembers] = useState<MemberType[]>([]);
    const [selectedMember, setSelectedMember] = useState<MemberType | null>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const { feedbackId } = useParams();

    const editMode = location.pathname.includes("edit");

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const fetchMembers = async () => {
            const response = await getMembers("ybs");

            if (response) {
                setMembers(response);
            } else {
                setError(true);
            }

            setLoading(false);
        }

        
    }, []);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorComponent label="뒤로가기" onRefresh={handleBack} />
      </Container>
    );
  }

  return (
    <Container></Container>
  )
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled(Column)`
  flex: 1;
  padding: 16px 24px;
`;
