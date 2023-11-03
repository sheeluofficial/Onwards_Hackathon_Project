import { Box, Checkbox, Grid, Link } from "@chakra-ui/react";
import React from "react";

const ConsentFile = ({ minConsentvalue, setMinConsentValue }) => {
  // console.log(minConsentvalue`    );
  const handleConsentCount = (e) => {
    e.preventDefault();
    if (e.target.checked) {
      setMinConsentValue(minConsentvalue + 1);
    } else {
      setMinConsentValue(minConsentvalue - 1);
    }
  };
  return (
    <Box border={"ms-"} h={{ base: "600" }}>
      <Checkbox spacing={"ms-16"} p={"10px"} onChange={handleConsentCount}>
        I hereby agree and undertake that I have read and understood the terms and conditions as
        stated in the ISA, Masai CoC and MBP which can be accessed below and reaffirm my acceptance.
      </Checkbox>

      <Grid
        ml={{ base: "28px", lg: "59px" }}
        color={"ms-blue.500"}
        gap={{ lg: "8px" }}
        templateColumns={{ base: "repeat(1,1fr)", lg: "repeat(3,1fr)" }}
      >
        <Link href="#" display={"flex"} gap={"3px"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 2C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2H6ZM6 4H13V9H18V20H6V4ZM8 12V14H16V12H8ZM8 16V18H13V16H8Z"
              fill="#3470E4"
            />
          </svg>
          View the agreement and related documents.
        </Link>

        <Link href="#" display={"flex"} gap={"3px"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M19 19H5V5H19M19 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 3.89 20.1 3 19 3ZM10 8V16L15 12L10 8Z"
              fill="#3470E4"
            />
          </svg>
          View a short video on ISA.
        </Link>

        <Link href="#" display={"flex"} gap={"3px"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M2 17.0008V15.0008H11V17.0008H2ZM2 9.00078V7.00078H11V9.00078H2ZM16.375 19.0008L12.825 15.4508L14.225 14.0508L16.35 16.1758L20.6 11.9258L22 13.3508L16.375 19.0008ZM16.375 11.0008L12.825 7.45078L14.225 6.05078L16.35 8.17578L20.6 3.92578L22 5.35078L16.375 11.0008Z"
              fill="#3470E4"
            />
          </svg>
          View Mandatory Conditions.
        </Link>
      </Grid>

      <Checkbox spacing={"ms-16"} p={"10px"} onChange={handleConsentCount}>
        I acknowledge that Masai is an intensive practice based learning experience and I am
        mentally and physically of sound state to complete the course.{" "}
      </Checkbox>

      <Checkbox spacing={"ms-16"} p={"10px"} onChange={handleConsentCount}>
        Apply for scholarship
      </Checkbox>

      <Grid ml={{ base: "28px", lg: "59px" }} color={"ms-blue.500"}>
        <Link href="#" display={"flex"} gap={"3px"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 2C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2H6ZM6 4H13V9H18V20H6V4ZM8 12V14H16V12H8ZM8 16V18H13V16H8Z"
              fill="#3470E4"
            />
          </svg>
          View the agreement and related documents.
        </Link>
      </Grid>
    </Box>
  );
};

export default ConsentFile;
