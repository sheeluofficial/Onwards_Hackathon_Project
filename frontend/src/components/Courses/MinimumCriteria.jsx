import React from "react";
import { GiSkills } from "react-icons/gi";
import { BsFillPersonFill } from "react-icons/bs";
import { FaInternetExplorer } from "react-icons/fa";
import { MdCastForEducation, MdCreditScore, MdPermIdentity } from "react-icons/md";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";

const MinimumCriteria = () => {
  return (
    <Box pb={{ base: "10px", md: "10px" }} m={{ base: "15px 5px", md: "20px 5px" }}>
      <Text
        p={{ md: "0px 15px" }}
        top="24px"
        left="24px"
        color={"#0A0103"}
        textStyle={"h3"}
        textAlign={{ base: "center", md: "left" }}
      >
        Minimum Criteria
      </Text>
      <Text
        p={{ md: "0px 15px" }}
        fontSize={{ base: "14px", md: "17px" }}
        fontWeight={"400"}
        textAlign={{ base: "center", md: "left" }}
        lineHeight={"22px"}
      >
        You should meet the following requirements to be eligible for this course.
      </Text>

      {/* Minimum Criteria Boxes */}
      <Grid
        templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        gap={6}
        m={{ md: "25px 10px" }}
        p={{ md: "5px 12px" }}
        mt={{ base: "25px", md: "15px" }}
      >
        <GridItem
          w={{ base: "90%", md: "100%" }}
          display={"flex"}
          m="auto"
          flexDirection={{ base: "row", md: "row" }}
          alignItems={"center"}
        >
          <MdCastForEducation
            style={{
              width: "15%",
              margin: "auto",
              fontSize: "25px",
              color: "#6E71CC",
            }}
          />
          <Box ml={{ base: "25px", md: "20px" }} w="85%">
            <Text fontWeight="700" fontSize="17px" lineHeight="25px" fontFamily="Poppins">
              Qualification
            </Text>
            <Text>Graduation (Any Stream)</Text>
          </Box>
        </GridItem>

        <GridItem
          w={{ base: "90%", md: "100%" }}
          display={"flex"}
          m="auto"
          flexDirection={{ base: "row", md: "row" }}
          alignItems={"center"}
        >
          <BsFillPersonFill
            style={{ width: "15%", margin: "auto", fontSize: "25px", color: "#6E71CC" }}
          />
          <Box ml={{ base: "25px", md: "20px" }} w="85%">
            <Text fontWeight="700" fontSize="17px" lineHeight="25px" fontFamily="Poppins">
              Age
            </Text>
            <Text>Upto 28 years</Text>
          </Box>
        </GridItem>

        <GridItem
          w={{ base: "90%", md: "100%" }}
          display={"flex"}
          m="auto"
          flexDirection={{ base: "row", md: "row" }}
          alignItems={"center"}
        >
          <GiSkills style={{ width: "15%", margin: "auto", fontSize: "25px", color: "#6E71CC" }} />
          <Box ml={{ base: "25px", md: "20px" }} w="85%">
            <Text fontWeight="700" fontSize="17px" lineHeight="25px" fontFamily="Poppins">
              Communication Skills
            </Text>
            <Text>Basic English - speaking, reading and writing.</Text>
          </Box>
        </GridItem>

        <GridItem
          w={{ base: "90%", md: "100%" }}
          display={"flex"}
          m="auto"
          flexDirection={{ base: "row", md: "row" }}
          alignItems={"center"}
        >
          <FaInternetExplorer
            style={{ width: "15%", margin: "auto", fontSize: "25px", color: "#6E71CC" }}
          />
          <Box ml={{ base: "25px", md: "20px" }} w="85%">
            <Text fontWeight="700" fontSize="17px" lineHeight="25px" fontFamily="Poppins">
              Internet
            </Text>
            <Text>A desktop or laptop with an uninterrupted service connection.</Text>
          </Box>
        </GridItem>

        <GridItem
          w={{ base: "90%", md: "100%" }}
          display={"flex"}
          m="auto"
          flexDirection={{ base: "row", md: "row" }}
          alignItems={"center"}
        >
          <MdPermIdentity
            style={{ width: "15%", margin: "auto", fontSize: "25px", color: "#6E71CC" }}
          />
          <Box ml={{ base: "25px", md: "20px" }} w="85%">
            <Text fontWeight="700" fontSize="17px" lineHeight="25px" fontFamily="Poppins">
              ID
            </Text>
            <Text>Valid Aadhar Card</Text>
          </Box>
        </GridItem>

        <GridItem
          w={{ base: "90%", md: "100%" }}
          display={"flex"}
          m="auto"
          flexDirection={{ base: "row", md: "row" }}
          alignItems={"center"}
        >
          <MdCreditScore
            style={{ width: "15%", margin: "auto", fontSize: "25px", color: "#6E71CC" }}
          />
          <Box ml={{ base: "25px", md: "20px" }} w="85%">
            <Text fontWeight="700" fontSize="17px" lineHeight="25px" fontFamily="Poppins">
              CIBIL Score
            </Text>
            <Text>650+</Text>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MinimumCriteria;
