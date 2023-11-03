import React, { useState } from "react";
import { Box, Button, Flex, Image, Show, Text, useDisclosure } from "@chakra-ui/react";
import duoImage from "../../assets/Greetings/Marriage counseling-bro 1.png";
import wave from "../../assets/Greetings/waveup.png";
import curvedCard from "../../assets/Greetings/Rectangle 22855.png";
import waiting_caleder from "../../assets/activities/waiting_caleder.png";
import clock_icon from "../../assets/activities/clock_icon.png";
import BookNowForm from "./BookNowForm";

const BookNowBanner = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isBooked, setIsBooked] = useState(false);
  const [details, setDetails] = useState();
  const toggleBookingForm = () => {
    onOpen();
  };
  const handleBookingDetails = (detail_from_form) => {
    setIsBooked(!isBooked);
    setDetails(detail_from_form);
  };
  return (
    <Box
      minW={"375px"}
      w={{ base: "80%", md: "95%", xl: "90%" }}
      h={{ base: "221px", lg: "134px" }}
      pos="relative"
      bgColor="ms-cyan.500"
      rounded="12px"
      boxShadow="0px 1px 3px 0px #0000001A"
      m="auto"
      mt="16px"
      overflow="hidden"
    >
      <Show above="lg">
        <Image
          src={duoImage}
          zIndex={3}
          w={{ base: "147px", lg: "217px" }}
          h={{ base: "83px", lg: "123px" }}
          bottom="0"
          right="0"
          pos="absolute"
          m="auto"
        />
      </Show>
      <Show breakpoint="(max-width: 1023px)">
        <Image
          src={duoImage}
          zIndex={3}
          w={{ base: "147px", lg: "217px" }}
          h={{ base: "83px", lg: "123px" }}
          top="0"
          right="0"
          left={0}
          pos="absolute"
          m="auto"
        />
        <Image
          src={curvedCard}
          zIndex={1}
          w={"255px"}
          h={"142px"}
          top="-59px"
          right="0"
          left={0}
          pos="absolute"
          m="auto"
        />
      </Show>

      <Show above="lg">
        <Image src={wave} zIndex={1} w="627px" h="134px" top="0" right="0" pos="absolute" />
      </Show>
      <Box
        mt="22px"
        ml={{ base: "0", lg: "24px" }}
        zIndex={300}
        textAlign={{ base: "center", lg: "left" }}
        pos={{ base: "absolute", lg: "relative" }}
        left={0}
        right={0}
        top={{ base: "67px", lg: "0" }}
      >
        <Text textStyle="body1-md" color="ms-primary" zIndex={300} mt={{ md: "5px" }}>
          {isBooked ? "Session scheduled successfully!" : "Not sure about your career?"}
        </Text>
        {!isBooked ? (
          <Text
            textStyle="h4"
            color="ms-primary"
            zIndex={3}
            mt={{ md: "5px" }}
            w={{ base: "347px", lg: "auto" }}
            m={{ base: "auto", lg: "0" }}
          >
            Book a <span style={{ color: "#FFDB66" }}>Free Counselling Session</span> with our Team.
          </Text>
        ) : (
          <Flex
            textStyle="body1-md"
            w="295px"
            justifyContent="space-between"
            color="white"
            m={{ base: "auto", lg: "0" }}
            mt={{ base: isBooked ? "20px" : "0", md: isBooked ? "20px" : "5px" }}
          >
            <Flex alignItems="center" gap="4px">
              <Image src={waiting_caleder} w="16px" h="16px" />
              <Text>August 23, 2023 </Text>
            </Flex>
            <Box border="1px solid #FFDB66" h="24px" />
            <Flex alignItems="center" gap="4px">
              <Image src={clock_icon} w="16px" h="16px" />
              <Text>3:00 - 4:00 pm</Text>
            </Flex>
          </Flex>
        )}
        <Button
          size="sm"
          type="secondary"
          textTransform="uppercase"
          textStyle="btn-sm"
          w={{ base: "343px", lg: "174px" }}
          h="32px"
          rounded="8px"
          p="8px, 12px, 8px, 12px"
          bgColor={isBooked ? "ms-primary" : "ms-blue.50"}
          color={isBooked ? "#E5E5E5" : "ms-info"}
          m="a"
          mt={{ base: isBooked ? "20px" : "0", md: isBooked ? "20px" : "5px" }}
          onClick={() => (!isBooked ? toggleBookingForm() : null)}
        >
          {isBooked ? "join counselling session" : "book now"}
        </Button>
      </Box>
      <Show below="md">
        <BookNowForm {...{ isOpen, onOpen, onClose, handleBookingDetails }} />
      </Show>
    </Box>
  );
};

export default BookNowBanner;
