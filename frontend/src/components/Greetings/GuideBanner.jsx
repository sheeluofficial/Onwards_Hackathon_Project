import React from "react";
import dummyAvatar from "../../assets/activities/dummyAvatar.png";
import { Box, Button, Image, Show, Text, useTheme } from "@chakra-ui/react";

const GuideBanner = () => {
  const theme = useTheme();
  return (
    <Show below="lg">
      <Box
        background="linear-gradient(116.14deg, #FFFFFF 4.82%, rgba(255, 251, 250, 0.863193) 30.09%, #FFF9C0 91.64%)"
        h="134px"
        minW="343px"
        w="90%"
        m="auto"
        mt="20px"
        rounded="12px"
        pos="relative"
      >
        <Box pos="absolute" top="16px" left="12px" zIndex={2}>
          <Text textStyle="h6" color="ms-purple.500">
            Hello! I’m your dost, Ritu.
          </Text>
          <Text
            fontWeight={700}
            fontSize={"12px"}
            lineHeight={"16px"}
            fontFamily="Open Sans"
            color="#3B3435"
            w="198px"
          >
            I am here to guide you through your journey at Masai!
          </Text>
          <Button
            bgColor="ms-prepleaf.50"
            w="187px"
            h="32px"
            rounded="8px"
            p="8px 12px 8px 12px"
            mt="12px"
            {...theme.textStyles["btn-sm"]}
            color="ms-info"
            border="none"
          >
            know more about me
          </Button>
        </Box>
        <Image
          src={dummyAvatar}
          h="104px"
          w="104px"
          pos="absolute"
          right={2}
          top="14px"
          bottom={0}
        />
      </Box>
    </Show>
  );
};

export default GuideBanner;
