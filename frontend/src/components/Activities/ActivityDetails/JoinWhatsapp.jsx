import React from "react";
import { Box, Button, Flex, Image, Show, Text, useTheme } from "@chakra-ui/react";
import CheckedCalenderIcon from "../../../assets/Greetings/CheckedCalenderIcon.png";
import whatsappIcon from "../../../assets/activities/WhatsApp1.png";
import QRcode from "../../../assets/activities/QrCode.png";
import whatsappWhiteIcon from "../../../assets/activities/whatsappWhiteIcon.png";

const JoinWhatsapp = () => {
  const theme = useTheme();
  return (
    <Flex
      minH="172px"
      rounded="12px"
      border="1px solid #3470E4"
      m="auto"
      mt="15px"
      justifyContent="space-between"
      minW="343px"
      maxW={"1132px"}
      w="98%"
    >
      <Box m="auto" ml={{ xl: "24px" }}>
        <Flex
          w={{ base: "100%", lg: "475px" }}
          h="56px"
          mt={{ md: "22px" }}
          gap="8px"
          alignItems="center"
        >
          <Image
            src={whatsappIcon}
            h={{ base: "37px", lg: "56px" }}
            w={{ base: "37px", lg: "56px" }}
          />
          <Text textStyle={{ base: "h6", lg: "h4" }}>Join this event’s Whatsapp Group to get </Text>
        </Flex>
        <Flex
          w={{ base: "291px", lg: "580px" }}
          h={{ lg: "72px" }}
          gap="8px"
          flexDir={{ base: "column", lg: "row" }}
          ml={{ base: "26px", lg: "80px" }}
        >
          <Flex w={{ base: "291px", lg: "239px" }} h="100%" alignItems="center" gap="14px">
            <Image src={CheckedCalenderIcon} w="18px" h="19.5px" objectFit="contain" />
            <Text textStyle={{ base: "body1-md", lg: "h4" }} color="ms-purple.500">
              Timely Updates
            </Text>
          </Flex>
          <Flex h="100%" alignItems="center" gap="14px">
            <Image src={CheckedCalenderIcon} w="18px" h="19.5px" objectFit="contain" />
            <Text textStyle={{ base: "body1-md", lg: "h4" }} color="ms-purple.500">
              Access to Exclusive Events
            </Text>
          </Flex>
          <Show below="sm">
            <Button
              bgColor={"ms-info"}
              textTransform="uppercase"
              color="ms-primary"
              w="117px"
              h="32px"
              p="8px 12px 8px 12px"
              rounded="8px"
              gap="8px"
              display="flex"
              alignItems="center"
              m="auto"
            >
              <Text {...theme.textStyles["btn-sm"]}>Join Now</Text>
              <Image src={whatsappWhiteIcon} w="16px" h="16px" />
            </Button>
          </Show>
        </Flex>
      </Box>
      <Show above="sm">
        <Box m="auto" mr={{ xl: "24px" }} w="142.46px">
          <Text
            mt="17px"
            fontWeight="400"
            fontSize="16px"
            lineHeight="26.4px"
            fontFamily="Poppins"
            textAlign="center"
          >
            Scan this to join
          </Text>
          <Image src={QRcode} m="auto" w="118.99px" h="118px" objectFit="contain" />
        </Box>
      </Show>
    </Flex>
  );
};

export default JoinWhatsapp;
