import { CheckIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const CustomSteps = ({ index, isCompleted }) => {
  return (
    // <Show above="md">
    <Flex
      alignItems="center"
      bgColor={isCompleted ? "#1A9FBD" : "#B7B8E5"}
      w={{ base: "32px", md: "48px" }}
      h={{ base: "32px", md: "48px" }}
      rounded={"57px"}
      //   p="9px"
      pos="relative"
      justify="center"
      color="white"
    >
      {isCompleted ? (
        <CheckIcon />
      ) : (
        <Flex
          alignItems="center"
          bgColor={isCompleted ? "green.800" : "#6E71CC"}
          w={{ base: "20px", md: "30px" }}
          h={{ base: "20px", md: "30px" }}
          //   p={{ base: "6px", md: "0" }}
          rounded={"full"}
        >
          <Text textAlign="center" m="auto" color={"ms-primary"} zIndex={5} textStyle="btn-md">
            {index + 1}
          </Text>
        </Flex>
      )}
    </Flex>
    // </Show>
  );
};

export default CustomSteps;
