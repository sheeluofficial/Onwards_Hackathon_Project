import { Box, Flex, Hide, Image, Show, Skeleton, Stack, Text } from "@chakra-ui/react";
import React from "react";
import RegisteredBanner from "./ActivityDetails/RegisteredBanner";
import JoinWhatsapp from "./ActivityDetails/JoinWhatsapp";
import AboutEvent from "./ActivityDetails/AboutEvent";
import AuthorDetails from "./ActivityDetails/AuthorDetails";
import LiveEventCard from "../Greetings/LiveEventCard";
import Perks from "./ActivityDetails/Perks";
import amanvats_profile from "../../assets/activities/amanvats_profile.png";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const skeletonData = {
  _id: "xyz",
  name: "xyz",
  eventType: "masterclass",
  eventDuration: "1hr",
  eventStartDate: "2023-10-11T12:30:00.000Z",
  eventEndDate: "2023-10-11T13:30:00.000Z",
  eventDescription: "xyz",
  speakerName: "xyz",
  speakerDesignation: "xyz",
  speakerImageURL: "xyz",
  speakerDetails: "xyz",
  recordedVideoLink: null,
  createdAt: "2023-09-23T14:02:13.209Z",
  updatedAt: "2023-09-23T14:02:13.209Z",
  __v: 0,
};

const ActivityDetails = () => {
  const [currentEvent, setCurrentEvent] = useState(null);
  const { event_id } = useParams();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [UpcomingEventsLoading, setUpcomingEventsLoading] = useState(false);
  const [loadingCurrentEvent, setLoadingCurrentEvent] = useState(false);

  const getCurrentEvent = async (id) => {
    setLoadingCurrentEvent(true);
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    try {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const response = await axios.get(`${baseUrl}/events/${event_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      if (data) {
        setCurrentEvent(data.event);
        console.log(data.event);
        getEvents();
      }
    } catch (error) {
      console.log("Error while fetching Events");
    } finally {
      setLoadingCurrentEvent(false);
    }
  };

  const getEvents = async () => {
    setUpcomingEventsLoading(true);
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    try {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const response = await axios.get(`${baseUrl}/events`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      if (data) {
        setUpcomingEvents(data.events.filter((item) => item._id !== event_id));
      }
    } catch (error) {
      console.log("Error while fetching Events");
    } finally {
      setUpcomingEventsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentEvent(event_id);
  }, [event_id]);

  if (loadingCurrentEvent) {
    return (
      <Skeleton>
        <Box minH={"100vh"} flex={1}></Box>
      </Skeleton>
    );
  }

  return (
    <Box m="auto" minH="682px" w="full" bgColor="white" mt={{ base: "40px", md: "0" }}>
      <>
        {/* banner section */}
        <RegisteredBanner {...currentEvent} />
        <JoinWhatsapp />
        <AboutEvent
          eventDescription={currentEvent?.eventDescription}
          eventType={currentEvent?.eventType === "master-class" ? "Masterclass" : "Webinar"}
          name={currentEvent?.name}
        />

        <Perks />
        <Show breakpoint="(max-width: 881px)">
          <AuthorDetails />
        </Show>
        <Hide breakpoint="(max-width: 881px)">
          <Flex
            maxW="1132px"
            minH="150px"
            gap={{ sm: "5px", md: "20px", lg: "64px" }}
            rounded="12px"
            m="auto"
            flexDir={{ base: "column", md: "row" }}
            my={"64px"}
            alignItems={"center"}
            bgColor="ms-purple.100"
            px="15px"
            pos="relative"
            overflow={"hidden"}
          >
            <Stack
              minH="102px"
              w={{ base: "343px", md: "auto" }}
              m={{ base: "auto", md: "0" }}
              minW={"247px"}
              spacing="10px"
              textAlign={{ base: "center", md: "left" }}
            >
              <Text textStyle="body1">Know your speaker</Text>
              <Box h="68px">
                <Text textStyle="h4">Meet</Text>
                <Text textStyle="h2" color="ms-purple.500">
                  {currentEvent?.speakerName}
                </Text>
              </Box>
            </Stack>
            <Show breakpoint="(min-width: 933px)">
              <Box border="1px solid #D9D9D9" h="150px" />
            </Show>
            <Stack
              justifyContent={"space-between"}
              maxW="484px"
              textAlign={{ base: "center", md: "left" }}
              w={{ base: "343px", md: "full" }}
              m={{ base: "auto", md: "0" }}
              h="fit-content"
              zIndex={3}
            >
              <Text textStyle={{ base: "body2", lg: "body1" }}>{currentEvent?.speakerDetails}</Text>
            </Stack>
            <Image
              src={amanvats_profile}
              pos="absolute"
              objectFit={"contain"}
              top="-8px"
              right={0}
            />
          </Flex>
        </Hide>
        {upcomingEvents.length > 0 && (
          <Text textStyle="h3" textAlign="center" mt={"64px"}>
            Upcoming Events
          </Text>
        )}

        <Show breakpoint="(max-width: 895px)">
          <LiveEventCard {...currentEvent} size="sm" />
        </Show>
        <Show breakpoint="(min-width: 895px)">
          {UpcomingEventsLoading ? (
            new Array(3).fill(0).map((item, i) => {
              return (
                <Skeleton>
                  <LiveEventCard key={`skeleton-${i}`} size="sm" {...skeletonData} />
                </Skeleton>
              );
            })
          ) : (
            <Flex flexWrap="wrap">
              {upcomingEvents?.map((item, i) => {
                return <LiveEventCard {...item} key={i} size="sm" />;
              })}
            </Flex>
          )}
        </Show>
      </>
    </Box>
  );
};

export default ActivityDetails;
