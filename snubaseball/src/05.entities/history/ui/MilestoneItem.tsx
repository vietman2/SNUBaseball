import { Event, MilestoneContainer, Year } from "./styles";
import { MilestoneType } from "../models/history";
import { ImagePlaceholder } from "@shared/ui/Images";

interface Props {
  milestone: MilestoneType;
}

export function MilestoneItem({ milestone }: Readonly<Props>) {
  return (
    <MilestoneContainer>
      <Year>{milestone.year}</Year>
      {milestone.events.map((event) => (
        <Event key={event.title}>
          {event.title}
          {event.description && <p>{event.description}</p>}
        </Event>
      ))}
      {milestone.imageUrl && (
          <ImagePlaceholder />
      )}
    </MilestoneContainer>
  );
}
