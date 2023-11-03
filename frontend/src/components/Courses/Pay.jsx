import React from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import { VscOutput } from "react-icons/vsc";
import { MdDownloadDone } from "react-icons/md";
import { Box, Grid, GridItem, Link, Text, useMediaQuery } from "@chakra-ui/react";

const Pay = () => {
  const [isMediumScreen] = useMediaQuery("(max-width: 768px)");

  return (
    <Box
      p={{ base: "20px 0px", md: "30px 5px" }}
      w={{ base: "100%", md: "95%" }}
      m={{ base: "20px 0px 70px 0px", md: "12px 12px 70px 12px" }}
    >
      <Text textStyle={{ base: "h3", md: "h3" }} textAlign={{ base: "center", md: "left" }}>
        Pay Through Pay After Placement
      </Text>
      <Text
        fontSize={{ base: "14px", md: "17px" }}
        mt={{ base: "4px", md: "8px" }}
        textAlign={{ base: "center", md: "left" }}
      >
        No loans, no collaterals, no interest rate.
        {isMediumScreen ?? <br />}
        <Link
          ml={{ md: "20px" }}
          color="teal.500"
          fontWeight={"bold"}
          textDecoration="underline"
          href="https://www.masaischool.com/fees?_gl=1*ywetkc*_ga*MTA4NjY3MjIxMi4xNjk0NjU0OTI0*_ga_GPPD2PTVSL*MTY5NTM0MzQ4Ny4zMS4xLjE2OTUzNDM0OTYuNTEuMC4w"
          target="_blank"
        >
          Learn more about PAP
        </Link>
      </Text>

      <Grid
        templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        gap={6}
        m={{ md: "25px 10px" }}
        p={{ md: "5px 12px" }}
        mt={{ base: "25px", md: "15px" }}
      >
        {/* First */}
        <GridItem
          w={{ base: "90%", md: "100%" }}
          display={"flex"}
          flexDirection="column"
          m="auto"
          alignItems={"center"}
        >
          <BsCurrencyRupee
            style={{
              fontSize: "50px",
              color: "#6E71CC",
              padding: "8px",
              backgroundColor: "#F7F7FF",
              borderRadius: "12px",
            }}
          />
          <Text
            m={{ base: "10px", md: "15px" }}
            textAlign={"center"}
            fontSize={{ base: "14px", md: "17px" }}
            fontWeight="bold"
          >
            Apply and study for ZERO upfront fee.
          </Text>
        </GridItem>

        {/* Second */}
        <GridItem
          w={{ base: "90%", md: "100%" }}
          display={"flex"}
          flexDirection="column"
          m="auto"
          alignItems={"center"}
        >
          <VscOutput
            style={{
              fontSize: "50px",
              color: "#6E71CC",
              padding: "8px",
              backgroundColor: "#F7F7FF",
              borderRadius: "12px",
            }}
          />
          <Text
            m={{ base: "10px", md: "15px" }}
            textAlign={"center"}
            fontSize={{ base: "14px", md: "17px" }}
            fontWeight="bold"
          >
            Pay only when you get a job of 3.5LPA or more.
          </Text>
        </GridItem>

        {/* Third */}
        <GridItem
          w={{ base: "90%", md: "100%" }}
          display={"flex"}
          flexDirection="column"
          m="auto"
          alignItems={"center"}
        >
          <MdDownloadDone
            style={{
              fontSize: "50px",
              color: "#6E71CC",
              padding: "8px",
              backgroundColor: "#F7F7FF",
              borderRadius: "12px",
            }}
          />
          <Text
            m={{ base: "10px", md: "15px" }}
            textAlign={"center"}
            fontSize={{ base: "14px", md: "17px" }}
            fontWeight="bold"
          >
            Pay the fees based on your salary range.
          </Text>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Pay;
