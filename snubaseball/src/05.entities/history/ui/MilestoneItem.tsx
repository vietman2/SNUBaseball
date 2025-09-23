import Image from "next/image";

import { Event, MilestoneContainer, MilestoneImage, Year } from "./styles";
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
        <>
          <ImagePlaceholder />
          {/*}
        <MilestoneImage>
          <Image
            src={milestone.imageUrl}
            alt={milestone.year}
            width={280}
            height={280}
          />
        </MilestoneImage>*/}
        </>
      )}
    </MilestoneContainer>
  );
}
