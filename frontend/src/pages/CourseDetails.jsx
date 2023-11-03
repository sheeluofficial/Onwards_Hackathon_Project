import axios from "axios";
import React, { useState, useEffect } from "react";
import Scribble from "../assets/courses/Scribble.png";
import Software1 from "../assets/courses/Software 1.png";
import Software2 from "../assets/courses/Software 2.png";
import Software3 from "../assets/courses/Software 3.png";
import Software4 from "../assets/courses/Software 4.png";
import Pay from "../components/Courses/Pay";
import CourseFeatures from "../components/Courses/CourseFeatures";
import CourseStructure from "../components/Courses/CourseStructure";
import MinimumCriteria from "../components/Courses/MinimumCriteria";
import CourseDetailsSection from "../components/Courses/CourseDetailsSection";
import CourseDetailsFooter from "../components/Courses/CourseDetailsFooter";
import { Box, Flex, Badge, Image, Grid, GridItem, Text, useMediaQuery } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = currentUser.token;
  const [isMediumScreen] = useMediaQuery("(max-width: 768px)");
  const [courseData, setCourseData] = useState(null);
  const { course_id } = useParams();
  const inputDate = new Date(courseData !== null && courseData.batchStartDate);
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
  const formattedDate = `${day}rd ${months[monthIndex]}`;

  const getCourseData = async (course_id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/courses/${course_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setCourseData(response.data.course);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  useEffect(() => {
    getCourseData(course_id);
  }, []);

  return (
    <Box
      bg="#FFFFFF"
      p={{ base: "15px 2px", md: "10px" }}
      h={{ base: "auto", md: "auto" }}
      mt={{ base: "40px", md: "0px" }}
      borderLeft={{ md: "1px solid #D9D9D9" }}
    >
      {/* Software Developer Banner */}
      <Text
        p={{ md: "0px 15px" }}
        color={"#0A0103"}
        textStyle={"h3"}
        textAlign={{ base: "center", md: "left" }}
      >
        {courseData?.name}
      </Text>
      <Flex p={{ md: "0px 15px" }} flexDirection={{ base: "column", md: "row" }}>
        <Box w={{ base: "100%", md: "235px" }}>
          <Text color={"#6E71CC"} textStyle={"h4"} textAlign={{ base: "center" }}>
            Extensive Learning Course
          </Text>
          <Image d={"block"} m={"auto"} mt="-15px" src={Scribble} alt="Scribble" />
        </Box>
        <Badge
          textStyle={"h5"}
          w={{ base: "100px" }}
          height={"32px"}
          m={{ base: "auto", md: "5px 10px" }}
          p={"4px 8px"}
          color="#CC926E"
          bgColor={"#F6EDE7"}
          textAlign={"center"}
        >
          {courseData?.courseType}
        </Badge>
        {isMediumScreen ? (
          <Text fontSize={"14px"} fontWeight={"400"} textAlign={"center"} lineHeight={"22px"}>
            Become a job-ready software developer in 30-35 weeks. Learn at ₹0 upfront fee, pay after
            placement.
          </Text>
        ) : (
          ""
        )}
      </Flex>

      {/* Software Developer Boxes */}
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
            src={Software1}
            alt="Software1"
            w={{ base: "24px", md: "40px" }}
            h={{ base: "24px", md: "40px" }}
          />
          <Text textStyle={"h5"} textAlign={{ md: "center" }} ml={{ base: "15px" }}>
            5000+ Students <br /> Currently Entrolled
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
            src={Software2}
            alt="Software2"
            w={{ base: "24px", md: "40px" }}
            h={{ base: "24px", md: "40px" }}
          />
          <Text textStyle={"h5"} textAlign={{ md: "center" }} ml={{ base: "15px" }}>
            94% Placement <br /> Success Rate
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
            src={Software3}
            alt="Software3"
            w={{ base: "24px", md: "40px" }}
            h={{ base: "24px", md: "40px" }}
          />
          <Text textStyle={"h5"} textAlign={{ md: "center" }} ml={{ base: "15px" }}>
            6.9 LPA <br /> Average Salary
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
            src={Software4}
            alt="Software4"
            w={{ base: "24px", md: "40px" }}
            h={{ base: "24px", md: "40px" }}
          />
          <Text textStyle={"h5"} textAlign={{ md: "center" }} ml={{ base: "15px" }}>
            36 LPA <br /> Highest Salary
          </Text>
        </GridItem>
      </Grid>

      {/* Course Details */}
      <CourseDetailsSection
        formattedDate={formattedDate}
        durationInWeeks={courseData?.durationInWeeks}
        timingsOfCourse={courseData?.timingsOfCourse}
      />

      {/* Minimum Criteria */}
      <MinimumCriteria />

      {/* Course Structure */}
      <CourseStructure
        courseType={courseData?.courseType}
        name={courseData?.name}
        courseDescription={courseData?.courseDescription}
        durationInWeeks={courseData?.durationInWeeks}
        whatYouWillLearnIcons={courseData?.whatYouWillLearnIcons}
        courseDetails={courseData?.courseDetails}
      />

      {/* Course Features */}
      <CourseFeatures />

      {/* Pay After Placement */}
      <Pay />

      {/* Course Details Footer */}
      <CourseDetailsFooter />
    </Box>
  );
};

export default CourseDetails;
