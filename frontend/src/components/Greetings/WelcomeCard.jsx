import React from "react";
import { Box, Flex, Image, Text, Show } from "@chakra-ui/react";
import backgroundWave from "../../assets/Greetings/Vector 1448.png";
import girl from "../../assets/Greetings/Frame 1321316938.png";
import sparkle from "../../assets/Greetings/Sparkle.png";

const WelcomeCard = () => {
  return (
    // <Show above="md">
    <Box
      boxShadow="0px 1px 2px 0px #0000000F"
      bgColor="ms-primary"
      minW="343px"
      w="90%"
      h="108px"
      rounded="12px"
      m="auto"
      mt="16px"
      overflow="hidden"
      pos="relative"
      flexGrow={1}
    >
      <Image src={backgroundWave} pos="absolute" top="0" left="0" right="0" w="100%" zIndex={1} />
      <Image src={girl} pos="absolute" zIndex={2} right={0} bottom={0} />
      <Flex zIndex={3} alignItems="center" pos="absolute" top={"24px"} left="24px" height="20px">
        <Text textStyle="h6">Hey Abhishek!</Text>
        <Image src={sparkle} w="26px" h="26px" />
      </Flex>
      <Text textStyle="h4" pos="absolute" top={"52px"} left="24px" zIndex={3} color="ms-info">
        Welcome to Masai!
      </Text>
    </Box>
    // </Show>
  );
};

export default WelcomeCard;
