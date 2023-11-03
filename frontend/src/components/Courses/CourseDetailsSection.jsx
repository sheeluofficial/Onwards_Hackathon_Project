import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React from "react";
import Course1 from "../../assets/courses/Course 1.png";
import Course2 from "../../assets/courses/Course 2.png";
import Course3 from "../../assets/courses/Course 3.png";

const CourseDetailsSection = ({ formattedDate, durationInWeeks, timingsOfCourse }) => {
  return (
    <Box m={{ md: "45px 5px" }}>
      <Text
        p={{ md: "0px 15px" }}
        top="24px"
        left="24px"
        color={"#0A0103"}
        textStyle={"h3"}
        textAlign={{ base: "center", md: "left" }}
      >
        Course Details
      </Text>
      <Text
        p={{ md: "0px 15px" }}
        fontSize={{ base: "14px", md: "17px" }}
        fontWeight={"400"}
        textAlign={{ base: "center", md: "left" }}
        lineHeight={"22px"}
      >
        In a duration of 30 - 35 weeks, the course requires a commitment from 11am to 11pm for 6
        days a week in an intensive and immersive curriculum.
      </Text>

      {/* Course Details Boxes */}
      <Grid
        p={{ md: "7px 15px" }}
        m={{ base: "25px 0px", md: "15px 0px" }}
        templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
        w={{ sm: "100%", md: "1104px" }}
        top={{ md: "16px" }}
        left={{ md: "24px" }}
        gap={{ md: "24px" }}
      >
        <GridItem
          bg="#F7F7FF"
          p={{ base: "15px", md: "16px" }}
          borderRadius={{ md: "16px" }}
          display={"flex"}
          m={{ base: "5px" }}
          flexDirection={{ base: "row", md: "column" }}
          alignItems={{ base: "center" }}
        >
          <Image
            src={Course1}
            alt="Course1"
            w={{ base: "24px", md: "40px" }}
            h={{ base: "24px", md: "40px" }}
          />
          <Text textStyle={"h5"} textAlign={{ md: "center" }} ml={{ base: "15px" }}>
            Batch Starts <br /> {formattedDate}
          </Text>
        </GridItem>

        <GridItem
          bg="#F7F7FF"
          p={{ base: "15px", md: "16px" }}
          borderRadius={{ md: "16px" }}
          display={"flex"}
          m={{ base: "5px" }}
          flexDirection={{ base: "row", md: "column" }}
          alignItems={{ base: "center" }}
        >
          <Image
            src={Course2}
            alt="Course2"
            w={{ base: "24px", md: "40px" }}
            h={{ base: "24px", md: "40px" }}
          />
          <Text textStyle={"h5"} textAlign={{ md: "center" }} ml={{ base: "15px" }}>
            {durationInWeeks} weeks <br /> ( 8 Months )
          </Text>
        </GridItem>

        <GridItem
          bg="#F7F7FF"
          p={{ base: "15px", md: "16px" }}
          borderRadius={{ md: "16px" }}
          display={"flex"}
          m={{ base: "5px" }}
          flexDirection={{ base: "row", md: "column" }}
          alignItems={{ base: "center" }}
        >
          <Image
            src={Course3}
            alt="Course3"
            w={{ base: "24px", md: "40px" }}
            h={{ base: "24px", md: "40px" }}
          />
          <Text textStyle={"h5"} textAlign={{ md: "center" }} ml={{ base: "15px" }}>
            {timingsOfCourse}* <br /> Monday to Saturday
          </Text>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CourseDetailsSection;
