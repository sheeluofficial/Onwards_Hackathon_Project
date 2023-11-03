import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import PrateekImg from "../../assets/courses/image 47.png";
const InstructorCard = ({ name }) => {
  return (
    <Box rounded="lg" shadow="md" minW="203px" mb="20px" bgColor="white">
      <Box background="#1A9FBD" roundedTop={"md"}>
        <Image
          src={PrateekImg}
          alt="prateek-picture"
          roundedTop="lg"
          d="block"
          m="auto"
          bgColor="#1A9FBD"
        />
      </Box>
      <Box p="6">
        <Text textAlign="center" textStyle="body2-md">
          {name}
        </Text>
        <Text textAlign="center" textStyle="body2">
          Ex-Amazon | 6+ yr exp.
        </Text>
      </Box>
    </Box>
  );
};
export default InstructorCard;
