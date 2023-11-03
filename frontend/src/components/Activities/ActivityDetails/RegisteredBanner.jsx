import { Box, Flex, Image, Show, Text } from "@chakra-ui/react";
import React from "react";
import laptopImage from "../../../assets/activities/AlbertMasterclass7.png";
import CirclelaptopImage from "../../../assets/activities/circleLaptop.png";
import CheckedCalenderIcon from "../../../assets/Greetings/CheckedCalenderIcon.png";
import CheckIcon from "../../../assets/activities/checkCircle.png";

const formatDate = (date) => {
  const apiDate = new Date(date);
  const formattedDate = apiDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    weekday: "long",
  });
  return formattedDate;
};

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

const RegisteredBanner = ({
  name,
  speakerName,
  speakerDesignation,
  eventStartDate,
  eventEndDate,
  speakerImageURL,
}) => {
  const formattedDate = formatDate(eventStartDate);
  const startTime = formatTime(eventStartDate);
  const endTime = formatTime(eventEndDate);
  return (
    <Box
      h={{ base: "379px", md: "300px", lg: "379px" }}
      minW="375px"
      bgColor={"#FFF7F9"}
      pos="relative"
      pt="32px"
      pl="24px"
    >
      <Show above="md">
        <Image
          src={speakerImageURL}
          w={{ base: "183px", md: "300px", xl: "462px" }}
          h={{ xl: "306px" }}
          bottom={0}
          right={0}
          pos="absolute"
          zIndex={1}
          objectFit={"contain"}
        />
      </Show>
      <Flex h="45px" gap="13px" alignItems="center" zIndex={2}>
        <Image
          src={CheckIcon}
          w={{ base: "24px", xl: "46.84px" }}
          h={{ base: "24px", xl: "45px" }}
        />
        <Text textStyle={{ base: "body2-md", lg: "h3" }} color="ms-grey.800">
          You have been successfully registered for this event!
        </Text>
      </Flex>
      <Show breakpoint="(min-width: 1022px)">
        <Text
          textStyle={{ base: "h2", lg: "h1" }}
          color="#000000"
          w={{ base: "400px", lg: "558px" }}
          h={{ lg: "186px" }}
          zIndex={200}
          mt="13px"
          pos="relative"
          noOfLines={3}
        >
          {name}
        </Text>
      </Show>
      <Show breakpoint="(max-width: 1022px)">
        <Text
          textStyle={{ base: "h3", lg: "h1" }}
          color="#000000"
          w={{ base: "330px", md: "458px" }}
          h={{ lg: "186px" }}
          zIndex={200}
          mt="13px"
          pos="relative"
        >
          {name}
        </Text>
      </Show>
      <Show above="lg">
        <Text textStyle={"regular"} mt="19px">
          By {speakerName}, {`(${speakerDesignation})`}
        </Text>
      </Show>
      <Flex minW="307px" minH="24px" gap="11px" mt="10px" flexDir={{ base: "column", lg: "row" }}>
        <Flex w="194px" h="24px" border="0px, 1px, 0px, 0px" gap="6px" alignItems="center">
          <Image src={CheckedCalenderIcon} w="18px" h="19.5px" objectFit="contain" />
          <Text textStyle="body2-md">{formattedDate}</Text>
        </Flex>
        <Flex w="194px" h="24px" border="0px, 1px, 0px, 0px" gap="6px" alignItems="center">
          <Image src={CheckedCalenderIcon} w="18px" h="19.5px" objectFit="contain" />
          <Text textStyle="body2-md">
            {`${startTime.hours}:${startTime.minutes}${startTime.TimeLabel}`}-{" "}
            {`${endTime.hours}:${endTime.minutes}${endTime.TimeLabel}`}
          </Text>
        </Flex>
      </Flex>
      <Show breakpoint="(max-width: 766px)">
        <Flex w="275px" h="56px" gap="8px" mt="39px" alignItems="center" zIndex={50} pos="relative">
          <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            w="77px"
            h="56px"
            rounded="13.1px"
            bgColor={"ms-primary"}
          >
            <Text textStyle="h5">2</Text>
            <Text textStyle="body2-md" color="#FF0A36">
              Days
            </Text>
          </Flex>
          <Flex h="24.1px" justifyContent="space-between" flexDir="column">
            <Box w="6px" h="6px" bgColor="#555555" rounded="full"></Box>
            <Box w="6px" h="6px" bgColor="#555555" rounded="full"></Box>
          </Flex>
          <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            w="77px"
            h="56px"
            rounded="13.1px"
            bgColor={"ms-primary"}
          >
            <Text textStyle="h5">2</Text>
            <Text textStyle="body2-md" color="#FF0A36">
              Days
            </Text>
          </Flex>
          <Flex h="24.1px" justifyContent="space-between" flexDir="column">
            <Box w="6px" h="6px" bgColor="#555555" rounded="full"></Box>
            <Box w="6px" h="6px" bgColor="#555555" rounded="full"></Box>
          </Flex>
          <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            w="77px"
            h="56px"
            rounded="13.1px"
            bgColor={"ms-primary"}
          >
            <Text textStyle="h5">2</Text>
            <Text textStyle="body2-md" color="#FF0A36">
              Days
            </Text>
          </Flex>
        </Flex>
      </Show>
      <Show below="md">
        <Image
          src={speakerImageURL}
          pos="absolute"
          bottom={0}
          right="0"
          w={{ base: "330px", md: "458px" }}
          h={{ lg: "186px" }}
        />
      </Show>
    </Box>
  );
};

export default RegisteredBanner;
