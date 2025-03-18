import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { AppIcon } from "@components/Icons";
import { GraduatesGroupType, GraduateType } from "@models/events";

interface Props {
  graduatesGroup: GraduatesGroupType;
}

export function GraduatesGroup({ graduatesGroup }: Readonly<Props>) {
  return (
    <Container>
      <Divider type="dashed" />
      <Header>
        <div>
          <AppIcon icon="graduation" size={24} /> CONGRATULATIONS!
        </div>
        {graduatesGroup.year}
      </Header>
      <Grid>
        {graduatesGroup.graduates.map((graduate) => (
          <Graduate key={graduate.student_id} graduate={graduate} />
        ))}
      </Grid>
    </Container>
  );
}

interface GraduateProps {
  graduate: GraduateType;
}

function Graduate({ graduate }: Readonly<GraduateProps>) {
  return (
    <GraduateContainer>
      <img src={graduate.profile_image} alt={graduate.name} />
      <Profile>
        <span>
          [{graduate.role}] {graduate.name}
        </span>
        <span>
          {graduate.major} {graduate.admission_year}학번
          <br />
          활동기간 {graduate.num_semesters}학기
        </span>
      </Profile>
      <span>{graduate.thoughts}</span>
    </GraduateContainer>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};

  > div:first-child {
    display: flex;
    align-items: center;
    gap: 8px;

    color: ${({ theme }) => theme.colors.highEmphasis};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
`;

const GraduateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  > img {
    width: 120px;
    height: 150px;
    border-radius: 4px;
    object-fit: cover;

    @media (max-width: 768px) {
      width: 80px;
      height: 100px;
    }
  }

  > span:last-child {
    font-size: 0.925rem;
    line-height: 1.125rem;
    color: ${({ theme }) => theme.colors.highEmphasis};
    text-align: center;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  > span:first-child {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }

  > span:last-child {
    text-align: center;
    font-size: 0.825rem;
    line-height: 1.125rem;
    color: ${({ theme }) => theme.colors.highEmphasis};
  }
`;
