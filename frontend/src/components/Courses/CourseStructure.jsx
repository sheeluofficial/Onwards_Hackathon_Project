import React from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  UnorderedList,
  useBreakpointValue,
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CourseStructure = ({
  courseType,
  name,
  courseDescription,
  durationInWeeks,
  whatYouWillLearnIcons,
  courseDetails,
}) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          infinite: true,
          slidesToShow: 6,
          slidesToScroll: 1,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 1000,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 1000,
        settings: {
          dots: false,
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 1000,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 1000,
          cssEase: "linear",
        },
      },
    ],
  };
  const roles = [
    "Web Developer",
    "Software Engineer",
    "Software Development Engineers",
    "Computer scientists",
    "Security Engineers",
    "Mobile Application Developers",
    "Android Software Developers",
  ];
  const isMediumScreen = useBreakpointValue({ base: false, md: true });

  if (!courseDetails || courseDetails.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <Box
      w={{ base: "100%", md: "95%" }}
      m={{ base: "18px 0px", md: "12px" }}
      p={{ base: "20px", md: "35px" }}
      bg={"#005bc5"}
      color={"#e0e4cc"}
      fontWeight={"bold"}
      borderRadius={{ base: "12px", md: "15px" }}
    >
      {/* First Section */}
      <Box
        display={"flex"}
        m={"auto"}
        bg={"#DBEEFF61"}
        p={{ base: "12px" }}
        alignItems={"center"}
        textAlign="center"
        borderRadius={{ base: "15px", md: "15px" }}
        w={{ base: "95%", md: "55%" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Image
          src="https://dashboard.masaischool.com/img/course-details-timeline/superman.svg"
          alt="RockStar"
        />
        <Box>
          <Text textStyle={{ base: "h5", md: "h3" }} color={"black"}>
            Follow this path to become a
          </Text>
          <Text textStyle={{ base: "h5", md: "h3" }} color={"#ffbc11"}>
            Rockstar Developer
          </Text>
        </Box>
      </Box>

      {/* Second Section */}
      <Box mt={{ base: "40px", md: "70px" }} color={"black"}>
        {/* About Course Section */}
        <Box display={"flex"} alignItems={"center"} textAlign={"center"}>
          <Box
            h={{ base: "50px", md: "80px" }}
            w={{ base: "50px", md: "80px" }}
            bg={"white"}
            borderRadius={"50%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text textStyle={{ base: "h4", md: "h2" }}>1</Text>
          </Box>

          <Text
            ml={{ base: "10px", md: "25px" }}
            textStyle={{ base: "h4", md: "h2" }}
            color={"white"}
          >
            Getting Into The Course
          </Text>
        </Box>

        <Box
          bg={"white"}
          display={"flex"}
          p={{ base: "10px", md: "15px" }}
          m={{ md: "auto" }}
          w={{ md: "90%" }}
          mt={{ base: "15px", md: "20px" }}
          borderRadius={"18px"}
          borderTopLeftRadius={"0px"}
          justifyContent={"space-around"}
        >
          <Box>
            <Text textStyle={{ base: "h4", md: "h4" }}>
              {courseType} - {name}
            </Text>
            <Text color={"black"} mt={{ base: "10px", md: "15px" }} fontWeight={{ md: "light" }}>
              {courseDescription}
            </Text>

            <UnorderedList mt={{ base: "8px", md: "15px" }} fontWeight={{ md: "bold" }}>
              <ListItem m={{ base: "5px", md: "8px" }}>
                {name} in <span style={{ color: "blue" }}> {durationInWeeks} weeks (7 months)</span>
              </ListItem>
              <ListItem m={{ base: "5px", md: "8px" }}>What you’ll learn</ListItem>
            </UnorderedList>

            <Grid
              templateColumns={{ base: "repeat(5,1fr)", md: "repeat(6, 1fr)" }}
              gap={6}
              mt={{ base: "18px", md: "25px" }}
            >
              {whatYouWillLearnIcons.map((el, i) => {
                return (
                  <>
                    <GridItem>
                      <Image
                        src={el}
                        alt="course-image"
                        h={{ base: "40px", md: "50px" }}
                        w={{ base: "40px", md: "50px" }}
                      />
                    </GridItem>
                  </>
                );
              })}
            </Grid>
          </Box>

          {isMediumScreen && (
            <Image
              src="https://dashboard.masaischool.com/img/new-course-details/da-what-will-learn.svg"
              alt="CourseImage"
            />
          )}
        </Box>
      </Box>

      {/* Third Section */}
      <Box mt={{ base: "30px", md: "55px" }} color={"black"}>
        {/* Course Details Section */}
        <Box display={"flex"} alignItems={"center"} textAlign={"center"}>
          <Box
            h={{ base: "50px", md: "80px" }}
            w={{ base: "50px", md: "80px" }}
            bg={"white"}
            borderRadius={"50%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text textStyle={{ base: "h4", md: "h2" }}>2</Text>
          </Box>

          <Text
            ml={{ base: "10px", md: "25px" }}
            textStyle={{ base: "h4", md: "h2" }}
            color={"white"}
          >
            Course Details
          </Text>
        </Box>

        <Box
          bg={"white"}
          display={"flex"}
          p={{ base: "10px", md: "15px" }}
          m={{ md: "auto" }}
          w={{ md: "90%" }}
          mt={{ base: "15px", md: "20px" }}
          borderRadius={"18px"}
          borderTopLeftRadius={"0px"}
          justifyContent={"space-around"}
        >
          <Box
            w={{ base: "95%", md: "90%" }}
            display="flex"
            m="10px auto"
            p={{ base: "10px", md: "18px" }}
            border="1px solid blue"
            borderRadius="18px"
            overflow="auto"
          >
            <Tabs>
              <TabList>
                {courseDetails.map((unit, index) => (
                  <Tab key={index}>Unit {unit.unit}</Tab>
                ))}
              </TabList>

              <TabPanels>
                {courseDetails.map((unit, index) => (
                  <TabPanel key={index}>
                    <Text textStyle={"h5"} color="blue">
                      Week {unit.week} (Unit-{unit.unit})
                    </Text>
                    {unit.curriculum.map((topic, topicIndex) => (
                      <div key={topicIndex}>
                        <Text m={"5px 0px"}>{topic.topicName}</Text>
                        <UnorderedList fontWeight="light">
                          {topic.learningObjectives.map((objective, objectiveIndex) => (
                            <ListItem key={objectiveIndex}>{objective}</ListItem>
                          ))}
                        </UnorderedList>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Box>

      {/* Fourth Section */}
      <Box mt={{ base: "25px", md: "50px" }} color={"black"}>
        <Box display={"flex"} alignItems={"center"} textAlign={"center"}>
          <Box
            h={{ base: "50px", md: "80px" }}
            w={{ base: "50px", md: "80px" }}
            bg={"white"}
            borderRadius={"50%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text textStyle={{ base: "h4", md: "h2" }}>3</Text>
          </Box>

          <Text
            ml={{ base: "10px", md: "25px" }}
            textStyle={{ base: "h4", md: "h2" }}
            color={"white"}
          >
            What You Could Become
          </Text>
        </Box>

        <Box
          m={"auto"}
          p={{ base: "10px", md: "20px" }}
          mt={{ base: "10px", md: "18px" }}
          bg={"white"}
          alignItems={"center"}
          borderRadius={{ base: "15px", md: "15px" }}
          w={{ base: "95%", md: "55%" }}
        >
          <Slider {...settings}>
            {roles.map((item, i) => (
              <Flex
                key={`role-${i}`}
                align="center"
                justify="center"
                p={{ base: "8px", md: "15px" }}
              >
                <Flex
                  p={"3px 12px"}
                  boxShadow={"0px 0px 13px #B6BEFC"}
                  rounded={"20px"}
                  overflow={"hidden"}
                  alignItems={"center"}
                >
                  <Text fontSize={{ base: "13px", md: "18px" }}>{item}</Text>
                </Flex>
              </Flex>
            ))}
          </Slider>
        </Box>
      </Box>

      {/* Fifth Section */}
      <Box mt={{ base: "25px", md: "50px" }} color={"black"}>
        <Box display={"flex"} alignItems={"center"} textAlign={"center"}>
          <Box
            h={{ base: "50px", md: "80px" }}
            w={{ base: "50px", md: "80px" }}
            bg={"white"}
            borderRadius={"50%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text textStyle={{ base: "h4", md: "h2" }}>4</Text>
          </Box>

          <Text
            ml={{ base: "10px", md: "25px" }}
            textStyle={{ base: "h4", md: "h2" }}
            color={"white"}
          >
            We Are Not Done Yet..
          </Text>
        </Box>

        <Box
          m={"auto"}
          p={{ base: "10px", md: "20px" }}
          mt={{ base: "10px", md: "18px" }}
          bg={"white"}
          alignItems={"center"}
          borderRadius={{ base: "15px", md: "15px" }}
          w={{ base: "95%", md: "55%" }}
        >
          <Box display="flex" justifyContent="center">
            <Text textStyle={{ base: "h4", md: "h3" }} textAlign="center" m="7px 0px">
              Time for <span style={{ color: "blue", fontSize: "35px" }}>Scholarship</span>
            </Text>
            <Image
              src="https://dashboard.masaischool.com/img/new-course-details/hat.svg"
              alt="scholarship"
              h="70px"
              w="70px"
              mt={{ md: "-20px" }}
              ml={{ md: "-20px" }}
            />
          </Box>

          <UnorderedList>
            <ListItem>
              Up to <span style={{ color: "blue" }}>50% discount</span> on the course fee.
            </ListItem>
            <ListItem>
              <span style={{ color: "blue" }}>Performance-based</span> criteria for eligibility.
            </ListItem>

            <ListItem>
              The scholarship amount will be deducted from the{" "}
              <span style={{ color: "blue" }}>Pay-After-Placement</span> (PAP) payment option
              instead of being paid upfront.
            </ListItem>
          </UnorderedList>
        </Box>
      </Box>

      {/* Check */}
    </Box>
  );
};

export default CourseStructure;
