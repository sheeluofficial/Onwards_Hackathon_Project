import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import FindApplications from "../components/Courses/FindApplications";

const CourseApplied = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser);
  console.log(currentUser.user.applications);
  const applicationAppliedFor = currentUser.user.applications;
  const [applied, setApplied] = useState(applicationAppliedFor);

  return (
    <Box>
      {applied?.map((el) => (
        <FindApplications key={el} id={el} />
      ))}
    </Box>
  );
};

export default CourseApplied;
