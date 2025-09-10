import { useMemo, useState } from "react";
import styled from "styled-components";

import { Form, Wrapper } from "./styles";
import { useUpdateProfileMutation } from "../api/updateProfile";
import { handsOptions } from "../data/options";
import type { PlayerDetailType } from "@entities/members";
import { Spinner } from "@shared/ui/Loading";
import { SimpleSelect } from "@shared/ui/Selects";

interface Props {
  player: PlayerDetailType;
}

export function PlayerProfileForm({ player }: Readonly<Props>) {
  const [position, setPosition] = useState<string>(
    player.extras.position ?? ""
  );
  const [hands, setHands] = useState<string>(
    player.extras.bat_throw_hands ?? ""
  );
  const [height, setHeight] = useState<number | "">(player.extras.height ?? "");
  const [weight, setWeight] = useState<number | "">(player.extras.weight ?? "");

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { mutate: updateProfile } = useUpdateProfileMutation(player.id);

  const buttonEnabled = useMemo(() => {
    return (
      submitting ||
      position !== (player.extras.position ?? "") ||
      hands !== (player.extras.bat_throw_hands ?? "") ||
      height !== (player.extras.height ?? "") ||
      weight !== (player.extras.weight ?? "")
    );
  }, [position, hands, height, weight, player, submitting]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!buttonEnabled) return;

    setSubmitting(true);
    setError(null);

    updateProfile(
      {
        extras: {
          position: position || null,
          bat_throw_hands: hands || null,
          height: height || null,
          weight: weight || null,
        },
      },
      {
        onSuccess: (response) => {
          if (response.status === "SUCCESS") {
            setError(null);
          } else {
            setError(response.message);
          }
          setSubmitting(false);
        },
      }
    );
  };

  return (
    <Form onSubmit={submit} data-testid="player-profile-form">
      <Wrapper>
        <span className="profile-form-label">포지션</span>
        <span className="profile-form-value">
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            data-testid="position-input"
          />
        </span>
      </Wrapper>
      <Wrapper>
        <span className="profile-form-label">투/타</span>
        <span className="profile-form-value">
          <Select value={hands} onChange={(e) => setHands(e.target.value)} data-testid="hands-select">
            <option value="" disabled>
              선택
            </option>
            {handsOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </span>
      </Wrapper>
      <Wrapper>
        <span className="profile-form-label">신장</span>
        <span className="profile-form-value">
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            data-testid="height-input"
          />
        </span>
      </Wrapper>
      <Wrapper>
        <span className="profile-form-label">체중</span>
        <span className="profile-form-value">
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            data-testid="weight-input"
          />
        </span>
      </Wrapper>
      {error && <p className="update-error-text">{error}</p>}
      {buttonEnabled && (
        <button type="submit" data-testid="player-profile-submit-button">
          {submitting ? <Spinner /> : "저장"}
        </button>
      )}
    </Form>
  );
}

const Select = styled(SimpleSelect)`
  padding: 8px 12px;
  min-width: 140px;
  max-width: 140px;
  border: none;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.gray900};
`;
