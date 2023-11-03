import axios from "axios";
import React, { useState, useEffect } from "react";
import CourseCard from "../components/Courses/CourseCard";
import InstructorCard from "../components/Courses/InstructorCard";
import BannerImg from "../assets/courses/Group 1321316734.png";
import AppliedIcons from "../assets/courses/Nav icons.png";
import FSDIcon from "../assets/courses/Frame 1321316869.png";
import BEDIcon from "../assets/courses/Frame 1321316869 (4).png";
import MobileIcon from "../assets/courses/Frame 1321316869 (1).png";
import DataIcon from "../assets/courses/Frame 1321316869 (2).png";
import SoftwareIcon from "../assets/courses/Frame 1321316869 (3).png";
import NextIcon from "../assets/courses/400dp Icons.png";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  Button,
  Badge,
  Image,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Text,
  useMediaQuery,
  IconButton,
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseApplied from "./CourseApplied";
const NamesData = [
  { name: "Manish Patel" },
  { name: "Aman Gupta" },
  { name: "Ritesh Gupta" },
  { name: "Rohan Gupta" },
  { name: "Vivek Yadav" },
  { name: "Shyam Gupta" },
  { name: "Gita Gupta" },
  { name: "Priya Sharma" },
  { name: "Neha Kapoor" },
  { name: "Anita Singh" },
  { name: "Rajesh Verma" },
  { name: "Sarika Mishra" },
  { name: "Deepika Das" },
  { name: "Ajay Kumar" },
  { name: "Preeti Jain" },
  { name: "Gita Gupta" },
  { name: "Shyam Gupta" },
  { name: "Aman Gupta" },
  { name: "Shyam Gupta" },
  { name: "Rohan Gupta" },
];
const Courses = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const applicationAppliedFor = currentUser.user.applications;
  const token = currentUser.token;
  const [courseData, setCourseData] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [isMediumScreen] = useMediaQuery("(max-width: 768px)");
  const [isLargeScreen] = useMediaQuery("(max-width: 1280px)");
  const IconArray = [FSDIcon, BEDIcon, DataIcon, SoftwareIcon, MobileIcon];
  const Apply = ["true", "false", "false", "false", "false"];
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    pauseOnHover: true,
    className: "slider variable-width",
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1375,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1157,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 461,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [sliderRef, setSliderRef] = useState(null);
  const handleSlide = (dir) => {
    if (dir === "l") {
      sliderRef?.slickPrev();
    } else {
      sliderRef?.slickNext();
    }
  };
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // fetch Course data
  const getCourseData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setCourseData(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses data:", error);
    }
  };

  console.log(courseData);

  useEffect(() => {
    getCourseData();
  }, []);

  return (
    <Box
      top={{ base: "170px", md: "92px" }}
      left={{ md: "261px" }}
      m={{ md: 4 }}
      mt={{ base: "40px" }}
      mb={{ base: "40px" }}
      flexGrow={1}
    >
      {/* Banner */}
      <Flex
        alignItems="center"
        justifyContent="space-between"
        bg="radial-gradient(112.5% 111.22% at 104.39% 0%, #88A9FD 0%, #3470E4 100%)"
        borderRadius={{ sm: "0", md: "ms-8" }}
      >
        <Text
          paddingLeft={{ base: "5%", md: "35%" }}
          textAlign="center"
          textStyle={"h3"}
          color="#FFFFFF"
        >
          Our Courses
        </Text>
        <Image src={BannerImg} alt="Your Image" />
      </Flex>
      {/* Tabs */}
      <Tabs isFitted={isLargeScreen ? true : false}>
        <TabList>
          <Tab onClick={() => handleTabChange("All")} isSelected={activeTab === "All"}>
            <Badge
              bgColor={isMediumScreen && activeTab === "All" ? "#CC926E" : "#F3F2F2"}
              color={isMediumScreen && activeTab === "All" ? "#F3F2F2" : "#544D4F"}
            >
              All
            </Badge>
          </Tab>
          <Tab
            ml={{ base: "15px", md: "50px" }}
            onClick={() => handleTabChange("Applied")}
            isSelected={activeTab === "Applied"}
          >
            <Badge
              bgColor={isMediumScreen && activeTab === "Applied" ? "#CC926E" : "#F3F2F2"}
              color={isMediumScreen && activeTab === "Applied" ? "#F3F2F2" : "#544D4F"}
            >
              Applied
            </Badge>
          </Tab>
        </TabList>
        <TabPanels>
          {/* All tab details */}
          <TabPanel>
            {/* Courses */}
            <Flex
              flexWrap={"wrap"}
              // templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
              justifyContent={{ base: "center", xl: "left" }}
              mb={"20px"}
              // w={{ sm: "100%", md: "790px" }}
              top={{ sm: "234px", md: "152px" }}
              left={{ sm: "0px", md: "24px" }}
              gap="24px"
            >
              {courseData.map((el, index) => (
                <CourseCard
                  courseIcon={IconArray[index]}
                  couseName={el.name}
                  Icon={NextIcon}
                  Applied={Apply[index]}
                  {...el}
                />
              ))}
            </Flex>

            {/* Instructor  */}
            <Box>
              <Text
                fontSize="16px"
                fontWeight="600"
                mb="10px"
                fontFamily="Open Sans"
                color="#0A0103"
              >
                Meet Your Instructors
              </Text>
              <Slider ref={(slider) => setSliderRef(slider)} {...settings}>
                {NamesData.map((item, i) => (
                  <InstructorCard key={i} name={item.name} />
                ))}
              </Slider>
              <Flex
                justifyContent={"right"}
                alignItems="center"
                pr={{ base: "15px", md: "30px" }}
                gap="10px"
              >
                <IconButton
                  border={"1px solid #2B6CB0"}
                  icon={<ChevronLeftIcon />}
                  onClick={() => handleSlide("l")}
                />
                <IconButton
                  border={"1px solid #2B6CB0"}
                  icon={<ChevronRightIcon />}
                  onClick={() => handleSlide("r")}
                />
              </Flex>
            </Box>
          </TabPanel>
          {/* Applied tabs details */}
          <TabPanel>
            {applicationAppliedFor.length === 0 ? (
              <>
                <Image src={AppliedIcons} alt="nav-icons" display="block" m="auto" mt="80px" />
                <Text textStyle={"h5"} textAlign="center" m="5px 10px">
                  No Applied Courses
                </Text>
                <Text textAlign="center">You haven't applied to any of the courses till now.</Text>
                <Button
                  display="block"
                  m="10px auto"
                  p="8px 12px"
                  letterSpacing="2px"
                  background="#3470E4"
                  color="white"
                  _hover=""
                >
                  START APPLYING
                </Button>
              </>
            ) : (
              <CourseApplied />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default Courses;
