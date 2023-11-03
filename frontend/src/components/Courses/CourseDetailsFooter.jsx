import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CourseDetailsFooter = () => {
  const navigate = useNavigate();

  return (
    <Box
      as="footer"
      position="fixed"
      bottom="0"
      right="0"
      p="2"
      w={{ base: "100%", md: "87%" }}
      zIndex="999"
      backgroundColor="white"
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
    >
      <Button
        variant="solid"
        bg="#e7e4d5"
        color="blue.700"
        mr="2"
        letterSpacing="2px"
        onClick={() => navigate("/courses")}
      >
        BACK TO COURSES
      </Button>
    </Box>
  );
};

export default CourseDetailsFooter;
