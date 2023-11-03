import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import EventBanner from "./EventBanner";
import EventDetails from "./EventDetails";
import { useUserContext } from "../../context/user_context";

const formatTime = (time) => {
  const temp = new Date(time);

  const hours = temp.getHours();
  const minutes = temp.getMinutes().toString().padStart(2, "0");

  let TimeLabel = "AM";
  let formattedHours = hours;

  if (hours >= 12) {
    TimeLabel = "PM";
    if (hours > 12) {
      formattedHours = hours - 12;
    }
  }
  return {
    TimeLabel,
    hours: formattedHours.toString().padStart(2, "0"),
    minutes,
  };
};

const LiveEventCard = ({
  name,
  eventDescription,
  speakerName,
  eventDuration,
  speakerDesignation,
  eventStartDate,
  eventEndDate,
  speakerImageURL,
  _id,
  size = "lg",
  registered,
  handleOnRegister = () => {},
  center = true,
}) => {
  const startTime = formatTime(eventStartDate);
  const endTime = formatTime(eventEndDate);

  const bannerDetails = {
    title: eventDescription,
    event_date: eventStartDate,
    highlightFrom: 0,
    highlightTo: 1,
    author: speakerName,
    author_qualification: speakerDesignation,
    author_image: speakerImageURL,
  };

  const eventDetails = {
    type: "Event",
    registered,
    tag: false,
    title: name,
    start_time: `${startTime.hours}:${startTime.minutes}`,
    start_time_label: startTime.TimeLabel,
    duration: eventDuration,
    end_time: `${endTime.hours}:${endTime.minutes}`,
    end_time_label: endTime.TimeLabel,
    registered_count: "924",
  };

  return (
    <>
      <Box
        w={
          size === "xs"
            ? "290px"
            : size === "lg"
            ? { base: "343px", md: "393px" }
            : size === "xl"
            ? { base: "343px", md: "539px" }
            : "343px"
        }
        border="1px solid #E5E5E5"
        rounded="12px"
        overflow="hidden"
        boxShadow="0px 1px 2px 0px #0000000F"
        bgColor="ms-primary"
        m={center ? "auto" : "0"}
        my="20px"
      >
        <EventBanner {...bannerDetails} size={size} />
        <EventDetails {...eventDetails} size={size} handleOnRegister={handleOnRegister} _id={_id} />
      </Box>
    </>
  );
};

export default LiveEventCard;
