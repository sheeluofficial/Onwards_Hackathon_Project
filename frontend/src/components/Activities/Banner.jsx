import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const Banner = ({ title, icon, gradient }) => {
  return (
    <Flex alignItems="center" bg={gradient} borderRadius={{ sm: "0", md: "ms-8" }} h="66px">
      <Text textAlign={{ base: "left", lg: "center" }} textStyle={"h3"} color="#FFFFFF" m="auto">
        {title}
      </Text>
      <Image src={icon} alt="Your Image" pos="absolute" right="0" />
    </Flex>
  );
};

export default Banner;
