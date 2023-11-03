import React, { useEffect, useState } from "react";
import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";
import EventIcon from "../assets/Events/EventIcon.png";
import masterClassIcon from "../assets/Events/masterClassIcon.png";
import EventsIcon from "../assets/Events/calenderIcon.png";
import ContestsIcon from "../assets/Events/contests.png";
import Banner from "../components/Activities/Banner";
import FilterButton from "../components/Activities/FilterButton";
import LiveEventCard from "../components/Greetings/LiveEventCard";
import axios from "axios";

const Activities = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getEvents = async () => {
    setIsLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("currentUser")).token;
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const response = await axios(`${baseUrl}/events/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      if (data) setEvents(data.events);
    } catch (error) {
      console.log("Error while fetching Events");
    } finally {
      setIsLoading(false);
    }
  };

  const filters = [
    {
      title: "Masterclass",
      icon: masterClassIcon,
    },
    {
      title: "Events",
      icon: EventsIcon,
    },
    {
      title: "Contests",
      icon: ContestsIcon,
    },
  ];

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Box m={{ md: 4 }} mt={{ base: "40px" }} mb={{ base: "40px" }} flexGrow={1} pos="relative">
      <Banner
        title={"Activities"}
        icon={EventIcon}
        gradient={"radial-gradient(112.5% 111.22% at 104.39% 0%, #84BAC7 0%, #1A9FBD 100%)"}
      />
      {/* filters section */}
      <Flex maxW={"349px"} h="66px" gap="24px" mt="16px">
        <Flex bgColor={"#B7E6CF"} p="8px" rounded={"full"} cursor="pointer">
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDir="column"
            h="49px"
            w="49px"
            rounded="100px"
            bg="linear-gradient(0deg, #6FCD9E, #6FCD9E),
          linear-gradient(0deg, #B7E6CF, #B7E6CF);"
          >
            <Text
              mt="6px"
              {...{
                fontWeight: "700",
                fontSize: "16px",
                lineHeight: "24px",
                fontFamily: "Open Sans",
              }}
              color="ms-primary"
              textAlign="center"
            >
              Live
            </Text>
          </Flex>
        </Flex>

        {filters.map((filter, i) => (
          <FilterButton key={i} icon={filter.icon} title={filter.title} />
        ))}
      </Flex>
      {/* events list */}
      {isLoading ? (
        <Skeleton>
          <Box minH={"100vh"} mt="16px" flex={1}></Box>
        </Skeleton>
      ) : (
        <Flex flexWrap="wrap" gap="24px" mt="16px" justify={{ base: "center", sm: "left" }}>
          {events?.map((item, i) => (
            <LiveEventCard {...item} size="sm" key={i} center={false} />
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Activities;
