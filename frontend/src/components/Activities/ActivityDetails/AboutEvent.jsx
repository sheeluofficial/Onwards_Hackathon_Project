import { Box, Flex, Show, Stack, Text } from "@chakra-ui/react";
import React from "react";

const AboutEvent = ({ eventDescription, name, eventType }) => {
  return (
    <Flex
      maxW="1132px"
      minH="150px"
      gap={{ sm: "5px", md: "20px", lg: "64px" }}
      rounded="12px"
      m="auto"
      flexDir={{ base: "column", md: "row" }}
      mt={"64px"}
      px="15px"
    >
      <Stack
        minH="102px"
        w={{ base: "343px", md: "auto" }}
        m={{ base: "auto", md: "0" }}
        spacing="10px"
        textAlign={{ base: "center", md: "left" }}
      >
        <Text textStyle="body1">About the event</Text>
        <Box>
          <Text textStyle="h4">{name}</Text>
          <Text textStyle="h2" color="ms-purple.500" h={{ lg: "40px" }}>
            {eventType}
          </Text>
        </Box>
      </Stack>
      <Show breakpoint="(min-width: 933px)">
        <Box border="1px solid #D9D9D9" h="150px" />
      </Show>
      <Stack
        justifyContent={"space-between"}
        maxW="799px"
        minH="144px"
        textAlign={{ base: "center", md: "left" }}
        w={{ base: "343px", md: "full" }}
        m={{ base: "auto", md: "0" }}
      >
        <Text textStyle={{ base: "body2", lg: "body1" }}>{eventDescription}</Text>
      </Stack>
    </Flex>
  );
};

export default AboutEvent;
