import styled from "styled-components";

import { PlayerInfoType, StaffInfoType } from "@models/team";

interface PlayerProps {
  player: PlayerInfoType;
}

export function PlayerSimple({ player }: Readonly<PlayerProps>) {
  return (
    <Card>
      <img src={player.profile_image} alt={player.name} />
      <Info>
        <div>
          <span>{player.back_number} </span>
          {player.name}
        </div>
        <span>{player.position}</span>
        <span>{player.height}cm/{player.weight}kg</span>
      </Info>
    </Card>
  );
}

interface StaffProps {
  staff: StaffInfoType;
}

export function StaffSimple({ staff }: Readonly<StaffProps>) {
  return (
    <Card>
      <img src={staff.profile_image} alt={staff.name} />
      <Info>
        <div>
          <span>{staff.back_number} </span>
          {staff.name}
        </div>
        <span>{staff.role}</span>
      </Info>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 180px;
  max-width: 180px;
  padding: 8px;
  margin: 4px;
  gap: 16px;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};

  > img {
    width: 60px;
    height: 60px;
    border-radius: 8px;
  } 
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;

  > div:first-child {
    font-size: 1rem;
    font-weight: bold;
    > span {
      margin-right: 4px;
      text-align: right;
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.foreground500};
    }
  }

  > span {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.foreground500}; 
  }
`;
