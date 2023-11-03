import axios from "axios";
import { Box, Text } from "@chakra-ui/react";
import CourseCard from "./CourseCard";
import React, { useState, useEffect } from "react";
import NextIcon from "../../assets/courses/400dp Icons.png";
import FSDIcon from "../../assets/courses/Frame 1321316869.png";

const FindApplications = ({ id }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = currentUser.token;
  const [data, setData] = useState(null);

  const getApplicationDetails = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/applications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setData(response.data.application.courseAppliedFor);
    } catch (error) {
      console.error("Error fetching single applied application data:", error);
    }
  };

  useEffect(() => {
    getApplicationDetails(id);
  }, [id]);

  return (
    <Box m={"10px 2px"}>
      {data === null ? (
        <Text textStyle={"h5"} textAlign="center" m="5px 10px">
          No Applied Courses
        </Text>
      ) : (
        <CourseCard
          courseIcon={FSDIcon}
          couseName={data?.name}
          Icon={NextIcon}
          Applied={true}
          {...data}
        />
      )}
    </Box>
  );
};

export default FindApplications;
