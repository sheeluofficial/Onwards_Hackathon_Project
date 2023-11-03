import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const FilterButton = ({ icon, title }) => {
  return (
    <Flex
      align="center"
      justify="center"
      minW="76px"
      minH="66px"
      rounded="13px"
      bg="linear-gradient(117.03deg, #FFFFFF 0%, #FFE4E4 100%)"
      cursor="pointer"
    >
      <Flex alignItems="center" justifyContent="center" flexDir="column">
        <Image src={icon} w="24px" h="21px" m="auto" />
        <Text mt="6px" textStyle="caption" textAlign="center">
          {title}
        </Text>
      </Flex>
    </Flex>
  );
};

export default FilterButton;
