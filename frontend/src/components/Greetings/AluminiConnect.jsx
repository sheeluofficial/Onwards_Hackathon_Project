import React from "react";
import prateekProfile from "../../assets/activities/prateekProfile.png";
import randomAlumini1 from "../../assets/activities/randomAlumini1.png";
import randomAlumini2 from "../../assets/activities/randomAlumini2.png";
import { Box, Button, Center, Flex, Image, Show, Text, useTheme } from "@chakra-ui/react";
const AluminiConnect = () => {
  const theme = useTheme();
  return (
    <Show below="md">
      <Box
        minW="343px"
        h="212px"
        w="90%"
        rounded="12px"
        border="1px solid ms-grey.200"
        bgColor="ms-primary"
        m="auto"
      >
        <Text w="315px" textStyle="body2-md" m="auto" mt="10px">
          Get your queries resolved now by talking to our Alumni’s
        </Text>
        <Box
          bgColor="ms-purple.500"
          w="319px"
          h="92px"
          m="auto"
          mt="10px"
          rounded="6px"
          border="1px 0px 1px 0px"
          pos="relative"
          overflow="hidden"
        >
          <Box pos="absolute" top="12px" left={0} right={0} zIndex={2}>
            <Text textStyle="caption" w="248px" m="auto" color="ms-primary" textAlign="center">
              Alumni Prateek helped our students get a job of more than 5LPA
            </Text>
          </Box>
          <Image src={prateekProfile} w="72px" h="68px" bottom={0} left={"-6px"} pos="absolute" />
          <Image
            src={randomAlumini1}
            w="48px"
            h="48px"
            top={"44px"}
            right={"38px"}
            pos="absolute"
          />
          <Image src={randomAlumini2} w="48px" h="48px" top={"32px"} right={"2px"} pos="absolute" />
        </Box>
        <Center mt="10px">
          <Button
            bgColor={"ms-info"}
            w="315px"
            h="32px"
            rounded="8px"
            p="8px 12px 8px 12px"
            {...theme.textStyles["btn-sm"]}
            _hover={{ bgColor: "#5D93FF" }}
            color="ms-primary"
            m="auto"
          >
            connect with alumni
          </Button>
        </Center>
      </Box>
    </Show>
  );
};

export default AluminiConnect;
