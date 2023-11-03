import React from "react";
import CustomContainer from "./CustomContainer";
import { Flex } from "@chakra-ui/react";
import pythonHeroImage from "../../assets/Greetings/pythonHeroIcon.png";
import figmaIcon from "../../assets/Greetings/figmaIcon.png";
import sqlIcon from "../../assets/Greetings/sqlIcon.png";

import SelfLearningCard from "./SelfLearningCard";

const SelfLearningContainer = ({ h }) => {
  const details = [
    {
      course_image: pythonHeroImage,
      course_title: "Python",
      course_level: "Beginner",
      no_of_modules: "12 modules",
      duration: "1h 30m",
      students_certified: "50 students has already got certificates",
      conpletion_rate: "80%",
    },
    {
      course_image: figmaIcon,
      course_title: "Figma",
      course_level: "Advanced",
      no_of_modules: "10 modules",
      duration: "1h 30m",
      students_certified: "50 students has already got certificates",
      conpletion_rate: "80%",
    },
    {
      course_image: sqlIcon,
      course_title: "SQL",
      course_level: "Beginner",
      no_of_modules: "12 modules",
      duration: "1h 30m",
      students_certified: "100+ certificates have been generated",
      conpletion_rate: "80%",
    },
    {
      course_image: sqlIcon,
      course_title: "SQL",
      course_level: "Beginner",
      no_of_modules: "12 modules",
      duration: "1h 30m",
      students_certified: "100+ certificates have been generated",
      conpletion_rate: "80%",
    },
    {
      course_image: sqlIcon,
      course_title: "SQL",
      course_level: "Beginner",
      no_of_modules: "12 modules",
      duration: "1h 30m",
      students_certified: "100+ certificates have been generated",
      conpletion_rate: "80%",
    },
    {
      course_image: sqlIcon,
      course_title: "SQL",
      course_level: "Beginner",
      no_of_modules: "12 modules",
      duration: "1h 30m",
      students_certified: "100+ certificates have been generated",
      conpletion_rate: "80%",
    },
    {
      course_image: sqlIcon,
      course_title: "SQL",
      course_level: "Beginner",
      no_of_modules: "12 modules",
      duration: "1h 30m",
      students_certified: "100+ certificates have been generated",
      conpletion_rate: "80%",
    },
    {
      course_image: sqlIcon,
      course_title: "SQL",
      course_level: "Beginner",
      no_of_modules: "12 modules",
      duration: "1h 30m",
      students_certified: "100+ certificates have been generated",
      conpletion_rate: "80%",
    },
  ];
  return (
    <CustomContainer h={h} title="Self Learning Courses" w={{ base: "90%", xl: "425px" }}>
      <Flex
        h="556px"
        w="full"
        bgColor="ms-blue.50"
        flexDir="column"
        overflow="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "0",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        gap="12px"
      >
        {details.map((item, i) => (
          <SelfLearningCard {...item} key={i} />
        ))}
      </Flex>
    </CustomContainer>
  );
};

export default SelfLearningContainer;
