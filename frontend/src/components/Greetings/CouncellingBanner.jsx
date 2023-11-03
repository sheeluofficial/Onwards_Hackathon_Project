import { Box, Flex, Show } from "@chakra-ui/react";
import React from "react";
import LiveEvents from "./LiveEvents";
import SelfLearningContainer from "./SelfLearningContainer";
import BookNowBanner from "./BookNowBanner";

const CouncellingBanner = () => {
  return (
    <Box
      bgColor="ms-blue.50"
      minH="100vh"
      mt={{ base: "40px", md: "0" }}
      mb={{ base: "40px", md: "0" }}
    >
      <BookNowBanner />
      <Flex flexWrap={"wrap"}>
        <LiveEvents />
        <Show above="md">
          <SelfLearningContainer h={"502px"} />
        </Show>
      </Flex>
    </Box>
  );
};

export default CouncellingBanner;
