import React from "react";
import { Show, Hide } from "@chakra-ui/react";
import CustomContainer from "./CustomContainer";
import LiveEventCard from "./LiveEventCard";

const LiveEvents = () => {
  const data = [
    {
      _id: "650d7002321922a4dd4b9496",
      name: "Mastering JavaScript",
      eventType: "master-class",
      eventDuration: "2 hours",
      eventStartDate: "2023-09-21T09:00:00.000Z",
      eventEndDate: "2023-09-21T11:00:00.000Z",
      eventDescription: "A comprehensive master class on JavaScript programming.",
      speakerName: "John Doe",
      speakerDetails: "Senior JavaScript Developer at Tech Experts Inc.",
      recordedVideoLink: "https://example.com/js-masterclass",
      createdAt: "2023-09-22T10:44:18.750Z",
      updatedAt: "2023-09-22T10:44:18.750Z",
      __v: 0,
    },
  ];
  return (
    <>
      <Show breakpoint="(min-width: 700px)">
        <CustomContainer h={"502px"} w={{ base: "90%", xl: "425px" }} title={"Live Events"}>
          {data.map((item, i) => (
            <LiveEventCard key={i} {...item} />
          ))}
        </CustomContainer>
      </Show>
      <Hide breakpoint="(min-width: 700px)">
        {data.map((item, i) => (
          <LiveEventCard key={i} {...item} />
        ))}
      </Hide>
    </>
  );
};

export default LiveEvents;
