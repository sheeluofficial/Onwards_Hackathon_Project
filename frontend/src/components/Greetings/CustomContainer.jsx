import React from "react";
import { Box, Flex, Text, Button, Image, useTheme, Show } from "@chakra-ui/react";
import arrow from "../../assets/Greetings/arrowIcon.png";
import leftArrow from "../../assets/Greetings/leftArrow.png";
import rightArrow from "../../assets/Greetings/rightArrow.png";

const CustomContainer = ({ children, h, w, title }) => {
  const theme = useTheme();
  return (
    <>
      <Box
        w={w}
        h={h}
        minW={"380px"}
        rounded="12px"
        mt="16px"
        pos="relative"
        overflow="hidden"
        boxShadow="0px 1px 2px 0px #0000000F"
        bgColor="white"
        mx={"auto"}
      >
        <Flex h="48px" bgColor="#F4F4F4" alignItems="center">
          <Text ml="16px" textStyle="body1-md">
            {title}
          </Text>
        </Flex>
        {children}
        <Flex
          h="48px"
          w="100%"
          bgColor="#F4F4F4"
          alignItems="center"
          pos="absolute"
          bottom="0"
          justifyContent="space-between"
        >
          <Flex w="56px" h="24px" gap="8px" ml="16px">
            <Button w="24px" h="24px" rounded="none" border="none">
              <Image src={leftArrow} w="7.41px" h="20px" objectFit="contain" />
            </Button>
            <Button w="24px" h="24px" rounded="none" border="none">
              <Image src={rightArrow} w="7.41px" h="20px" objectFit="contain" />
            </Button>
          </Flex>
          <Button
            display="flex"
            minW="103px"
            minH="24px"
            rounded="8px"
            gap="8px"
            mr="16px"
            alignItems="center"
            border="none"
            colorScheme="ms-info"
            _hover={{ colorScheme: "#cfd0ee" }}
            color="ms-info"
          >
            <Text {...theme.textStyles["btn-md"]}>VIEW DETAILS</Text>
            <Button rounded="none" border="none">
              <Image src={arrow} w="15.84px" h="15.84px" />
            </Button>
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default CustomContainer;
