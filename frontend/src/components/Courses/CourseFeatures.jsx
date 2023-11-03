import React from "react";
import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";

const CourseFeatures = () => {
  return (
    <Box
      w={{ base: "100%", md: "95%" }}
      m={{ md: "12px" }}
      p={{ md: "35px" }}
      bg={"#F7F7FF"}
      borderRadius={{ md: "15px" }}
    >
      <Grid templateColumns={{ base: "repeat(1,1fr)", md: "repeat(3, 1fr)" }} gap={6}>
        {/* First */}
        <GridItem
          w="100%"
          h={{ base: "200px", md: "225px" }}
          bg="blue.500"
          border={"1px solid #D9D9D9"}
          borderRadius={{ base: "15px", md: "20px" }}
          p={{ base: "15px", md: "20px" }}
        >
          <Image
            src="https://dashboard.masaischool.com/img/course-details/curriculum-style/hat.svg"
            alt="BestInClass"
            display={"block"}
            m="auto"
          />
          <Text
            textStyle={"h3"}
            textAlign={"center"}
            color="#FFFFFF"
            mt={{ base: "10px", md: "12px" }}
          >
            Best In-Class Curriculum & Pedagogy
          </Text>
        </GridItem>

        {/* Second */}
        <GridItem
          w="100%"
          h={{ base: "200px", md: "225px" }}
          bg="#FFFFFF"
          border={"1px solid #D9D9D9"}
          borderRadius={{ base: "15px", md: "20px" }}
          p={{ base: "15px", md: "20px" }}
        >
          <Image
            src="https://dashboard.masaischool.com/img/course-details/curriculum-style/laptop_software.svg"
            alt="DistanceLearning"
            display={"block"}
            m="auto"
          />
          <Text textStyle={"h5"} textAlign={"center"} m={{ base: "8px 0px", md: "10px 0px" }}>
            100% live Distance Learning
          </Text>

          <Text
            fontSize={{ base: "14px", md: "16px" }}
            textAlign={"center"}
            m={{ base: "5px", md: "5px 0px" }}
          >
            India’s only live tech-learning course with Tier 1 instructors. Get real-time feedback,
            interactive sessions & a personalised learning experience.
          </Text>
        </GridItem>

        {/* Third */}
        <GridItem
          w="100%"
          h={{ base: "220px", md: "225px" }}
          bg="#FFFFFF"
          border={"1px solid #D9D9D9"}
          borderRadius={{ base: "15px", md: "20px" }}
          p={{ base: "15px", md: "20px" }}
        >
          <Image
            src="https://dashboard.masaischool.com/img/course-details/curriculum-style/star_software.svg"
            alt="AI Generative"
            display={"block"}
            m="auto"
          />
          <Text textStyle={"h5"} textAlign={"center"} m={{ base: "8px 0px", md: "10px 0px" }}>
            Generative A.I. Integrated Program
          </Text>

          <Text
            fontSize={{ base: "14px", md: "16px" }}
            textAlign={"center"}
            m={{ base: "5px", md: "5px 0px" }}
          >
            Harness & implement the power of A.I. in coding & data analytics. What’s more? Use
            custom A.I. tools to enhance placement preparation.
          </Text>
        </GridItem>

        {/* Fourth */}
        <GridItem
          w="100%"
          h={{ base: "200px", md: "225px" }}
          bg="#FFFFFF"
          border={"1px solid #D9D9D9"}
          borderRadius={{ base: "15px", md: "20px" }}
          p={{ base: "15px", md: "20px" }}
        >
          <Image
            src="https://dashboard.masaischool.com/img/course-details/curriculum-style/bulb_software.svg"
            alt="Industry reafy"
            display={"block"}
            m="auto"
          />
          <Text textStyle={"h5"} textAlign={"center"} m={{ base: "8px 0px", md: "10px 0px" }}>
            Industry Ready Curriculum{" "}
          </Text>

          <Text
            fontSize={{ base: "14px", md: "16px" }}
            textAlign={"center"}
            m={{ base: "5px", md: "5px 0px" }}
          >
            Our curriculum is regularly updated through industry feedback. In-demand specialisations
            are added to aid our students in launching a sustainable career.
          </Text>
        </GridItem>

        {/* Fifth */}
        <GridItem
          w="100%"
          h={{ base: "200px", md: "225px" }}
          bg="#FFFFFF"
          border={"1px solid #D9D9D9"}
          borderRadius={{ base: "15px", md: "20px" }}
          p={{ base: "15px", md: "20px" }}
        >
          <Image
            src="https://dashboard.masaischool.com/img/course-details/curriculum-style/check_software.svg"
            alt="Focuslearning"
            display={"block"}
            m="auto"
          />
          <Text textStyle={"h5"} textAlign={"center"} m={{ base: "8px 0px", md: "10px 0px" }}>
            Focus On Learning Agility
          </Text>

          <Text
            fontSize={{ base: "14px", md: "16px" }}
            textAlign={"center"}
            m={{ base: "5px", md: "5px 0px" }}
          >
            We prioritise flexible thinking & continuous skill development. Stay nimble in an
            ever-changing world by embracing adaptability, curiosity & rapid learning.
          </Text>
        </GridItem>

        {/* Sixth */}
        <GridItem
          w="100%"
          h={{ base: "200px", md: "225px" }}
          bg="#FFFFFF"
          border={"1px solid #D9D9D9"}
          borderRadius={{ base: "15px", md: "20px" }}
          p={{ base: "15px", md: "20px" }}
        >
          <Image
            src="https://dashboard.masaischool.com/img/course-details/curriculum-style/profile_software.svg"
            alt="IndustryReady"
            display={"block"}
            m="auto"
          />
          <Text textStyle={"h5"} textAlign={"center"} m={{ base: "8px 0px", md: "10px 0px" }}>
            Industry Ready In Just 25 - 35 weeks
          </Text>

          <Text
            fontSize={{ base: "14px", md: "16px" }}
            textAlign={"center"}
            m={{ base: "5px", md: "5px 0px" }}
          >
            Curriculum at Masai is designed to be intensive & extensive. With our unique pedagogy,
            learn right in less time. All we ask is your dedication!
          </Text>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CourseFeatures;
