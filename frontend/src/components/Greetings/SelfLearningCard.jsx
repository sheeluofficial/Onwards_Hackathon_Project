import React from "react";
import { Badge, Box, Button, Center, Flex, Image, Progress, Stack, Text } from "@chakra-ui/react";
import rightArrow from "../../assets/Greetings/rightArrow.png";
const SelfLearningCard = ({
  course_image,
  course_title,
  course_level,
  no_of_modules,
  duration,
  students_certified,
  conpletion_rate,
}) => {
  return (
    <Center>
      <Flex
        minH="108px"
        w="full"
        alignItems={"center"}
        p={"10px, 16px, 10px, 16px"}
        bgColor="white"
        m="auto"
      >
        <Flex w="361px" h="88px" gap="8px" m={"auto"}>
          <Image src={course_image} w="48px" h="48px" />
          <Stack gap={"6px"} w="305px" h="88px">
            <Box>
              <Text textStyle={"body2-md"}>{course_title}</Text>
              <Flex alignItems={"center"} gap={"6px"}>
                <Text textStyle="caption">{course_level}</Text>
                <Box w="2px" h="2px" bgColor="#555555" rounded="full"></Box>
                <Text textStyle="caption">{no_of_modules}</Text>
                <Box w="2px" h="2px" bgColor="#555555" rounded="full"></Box>
                <Text textStyle="caption">{duration}</Text>
              </Flex>
            </Box>
            <Badge
              letterSpacing={"normal"}
              textTransform="none"
              variant="brick"
              w="235px"
              size="default"
              p="4px 8px 4px 8px"
            >
              <Text textStyle="caption">{students_certified}</Text>
            </Badge>
            <Box pos={"relative"} rounded={"100px"} h="10px">
              <Progress colorScheme="green" size="sm" value={80} rounded={"100px"} />
              <Text fontSize={"8px"} pos={"absolute"} top={-0.4} bottom={0} right={5}>
                {conpletion_rate}
              </Text>
            </Box>
          </Stack>
        </Flex>
        <Button w={"24px"} h="24px" border={"none"}>
          <Image src={rightArrow} />
        </Button>
      </Flex>
    </Center>
  );
};

export default SelfLearningCard;
