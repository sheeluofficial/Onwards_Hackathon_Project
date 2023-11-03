import React, { useEffect, useState } from "react";
import { Box, Flex, Image, useDisclosure } from "@chakra-ui/react";
import MSATRetake from "./MSATRetake";
import MSATResult from "./MSATResult";
import axios from "axios";

const MsatResultsPage = () => {
  const [MsatScore, setMsatScore] = useState([]);
  const [Score, setScore] = useState(0);
  const { isOpen: isOpenModal2, onOpen: onOpenModal2, onClose: onCloseModal2 } = useDisclosure();
  const token = JSON.parse(localStorage.getItem("currentUser")).token;
  console.log(MsatScore);

  const getMsatScore = () => {
    onOpenModal2();
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/applications/get-result`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("score", response);
        setMsatScore(response.data.Result);
        if (response.data.Result) {
          let sum = 40;
          response.data.Result.forEach((data) => {
            sum += data.scoredMarks;
          });
          setScore(sum);
        }
        onCloseModal2();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // getMsatScore()
  useEffect(() => {
    getMsatScore();
  }, []);

  return (
    <Box
      position={"relative"}
      pb="50px"
      w="100%"
      minH="100vh"
      bg="ms-blue.50"
      justify={"center"}
      align={"center"}
      as={Flex}
      direction={["column", "column", "column", "row"]}
      gap="ms-32"
    >
      <MSATResult
        Result={MsatScore}
        isOpenModal2={isOpenModal2}
        onCloseModal2={onCloseModal2}
        onOpenModal2={onOpenModal2}
      ></MSATResult>
      <MSATRetake score={Score}></MSATRetake>
    </Box>
  );
};

export default MsatResultsPage;
