import React from "react";
import { Box, Flex, Show } from "@chakra-ui/react";
import WelcomeCard from "./WelcomeCard";
import LiveEvents from "./LiveEvents";
import SelfLearningContainer from "./SelfLearningContainer";
import GuideBanner from "./GuideBanner";
import AluminiConnect from "./AluminiConnect";
const Greetings = () => {
  return (
    <Box
      bgColor="ms-blue.50"
      minH="100vh"
      mt={{ base: "40px", md: "0" }}
      mb={{ base: "40px", md: "0" }}
    >
      <Flex flexWrap={"wrap"} gap="10px">
        <GuideBanner />
        <Box m="auto" flexGrow={1}>
          <WelcomeCard />
          <LiveEvents />
        </Box>
        <Show above="md">
          <Box m="auto" flexGrow={1}>
            <SelfLearningContainer h={"626px"} />
          </Box>
        </Show>
        <AluminiConnect />
      </Flex>
    </Box>
  );
};

export default Greetings;
