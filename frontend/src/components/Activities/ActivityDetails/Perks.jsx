import React from "react";
import profileIcon from "../../../assets/activities/profileIcon.png";
import speakerIcon from "../../../assets/activities/speakerIcon.png";
import calenderIcon from "../../../assets/activities/calenderIcon.png";
import contentBoardIcon from "../../../assets/activities/contentBoardIcon.png";

import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";

const Perks = () => {
  const whyAttendDetails = [
    {
      highlight: "10,000+",
      text: "Participants",
      icon: profileIcon,
    },
    {
      highlight: "40+",
      text: "Speakers",
      icon: speakerIcon,
    },
    {
      highlight: "3,000+",
      text: "Hours of Content",
      icon: contentBoardIcon,
    },
    {
      highlight: "100+",
      text: "Activities",
      icon: calenderIcon,
    },
  ];
  return (
    <Box
      minW="375px"
      h={{ base: "451px", md: "auto" }}
      mt="64px"
      bgColor="ms-prepleaf.50"
      py="16px"
      px="9px"
      rounded="12px"
    >
      <Stack
        spacing="16px"
        minW="357px"
        maxW="863px"
        w="100%"
        h={{ base: "246px", md: "auto" }}
        textAlign="center"
        m="auto"
      >
        <Text textStyle="h4">Why should you attend?</Text>
        <Text textStyle="body2" color="ms-grey.800">
          Elevate your skills, expand your horizons, and connect with a vibrant community full of
          like minded individuals by joining our events, masterclasses, and contests.
        </Text>
        <Text textStyle="body2" color="ms-grey.800">
          Learn from industry experts, dive deep into focused subjects, and showcase your talents
          for a chance to win exciting prizes. Unleash your potential and embark on a journey of
          growth and excellence with us.
        </Text>
      </Stack>
      <Flex
        minW="357px"
        maxW="863px"
        w="fit-content"
        h={{ base: "160px", md: "auto" }}
        m="auto"
        gap="32px"
        flexWrap={"wrap"}
        mt={{ md: "32px" }}
      >
        {whyAttendDetails.map((item, i) => (
          <Flex key={i} minW="136px" h="56px" gap="12px" m="auto">
            <Image src={item.icon} w="24px" h="24px" />
            <Box minW="94px" h="56px">
              <Text color="ms-info" textStyle="h3">
                {item.highlight}
              </Text>
              <Text textStyle="body2">{item.text}</Text>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default Perks;
