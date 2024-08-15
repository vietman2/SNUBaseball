
import { TextDivider } from "@components/Dividers";
import { Caption, Title } from "@components/Texts";
import { Leadership } from "@fragments/Leadership/Leadership";
import { Plans } from "@fragments/Plans/Plans";

const subtitle =
  "종무식은 1년 동안의 대장정을 마무리하는 자리로, 감독님, 지도교수님, 선배님, 선수, 매니저들이 모두 참가하여 야구부의 지난 시즌을 복기하고 새로운 시즌을 기획하는 행사입니다. 1년 동안 팀을 이끌어온 주장단의 노고에 대한 치하와 앞으로 팀을 이끌 새로운 주장, 수석매니저를 임명하는 임명식이 진행됩니다.";

export function Closing() {
  return (
    <>
      <Title title="종무식" subtitle="한 해의 마무리" />
      <Caption text={subtitle} />
      <TextDivider text="" />
      <Leadership />
      <TextDivider text="" />
      <Plans />
    </>
  );
}
