import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Image, Text, Box, Badge } from "@chakra-ui/react";

const CourseCard = ({
  courseIcon,
  couseName,
  Icon,
  Applied,
  durationInWeeks,
  batchStartDate,
  timingsOfCourse,
  _id,
}) => {
  const navigate = useNavigate();
  const inputDate = new Date(batchStartDate);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = inputDate.getDate();
  const monthIndex = inputDate.getMonth();
  const year = inputDate.getFullYear();
  const formattedDate = `${day}-${months[monthIndex]}-${year}`;

  return (
    <Box
      w="100%"
      maxW={"375px"}
      h="auto"
      bg="#FFFFFF"
      borderRadius={{ base: "8px", md: "12px" }}
      padding={{ base: "6px", md: "6px 16px" }}
      gap={"8px"}
      cursor={"pointer"}
      onClick={() => navigate(`/courses/${_id}`)}
    >
      <Flex justifyContent={"space-around"} alignItems={"center"}>
        <Image src={courseIcon} alt="FSDIcon" />
        <Box ml={{ base: "12px" }}>
          <Text
            fontSize={"14px"}
            fontWeight={"600"}
            lineHeight={"24px"}
            fontFamily={"Open Sans"}
            color="#21191B"
          >
            {couseName}
          </Text>
          <Flex fontWeight={"thin"} fontSize={"12px"}>
            <Text marginRight={"7px"}>{formattedDate}</Text>
            <Text marginRight={"7px"}>{durationInWeeks} weeks</Text>
            <Text marginRight={"7px"}>{timingsOfCourse}</Text>
          </Flex>
          {Applied === "true" ? <Badge colorScheme="green">Applied</Badge> : ""}
        </Box>
        <Image src={Icon} h={"24px"} w={"24px"} alt="FSDIcon" />
      </Flex>
    </Box>
  );
};
export default CourseCard;
