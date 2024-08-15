import { TextDivider } from "@components/Dividers";
import { Caption, Title } from "@components/Texts";
import { GameSummary } from "@fragments/Game";

const subtitle =
  "OB전은 야구부를 졸업한 선배님들이 오시는 행사입니다.\n1년에 한 번 선배님들과의 정기적인 만남을 통해 후배들은 선배님들께 감사의 인사를,\n선배님들은 후배들에게 아낌없는 조언과 격려를 전하며 하나된 야구부를 만들어갑니다.";

export function Homecoming() {
  return (
    <>
      <Title title="OB전" subtitle="야구부의 과거와 현재" />
      <Caption text={subtitle} />
      <TextDivider text="2024.10.01" />
      <GameSummary result="7:8" />
      <TextDivider text="2023.09.29" />
      <GameSummary result="4:7" />
    </>
  );
}
