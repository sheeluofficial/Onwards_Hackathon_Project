import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Text,
  useDisclosure,
  ModalBody,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import code_svg from "../assets/code_svg.svg";
import eclipse from "../assets/Ellipse.svg";
import tick from "../assets/tick_3032885 1.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
function MSATResult({Result,isOpenModal2,onCloseModal2,onOpenModal2}) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const token = JSON.parse(localStorage.getItem("currentUser")).token;
 console.log("result",Result)
 
  const openPanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };
  

  return (
    <Box>
      <Modal isOpen={isOpenModal2} onClose={onCloseModal2}>
        <ModalOverlay />
        <ModalOverlay />
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow={"none"} mt={{ base: "300", lg: "300px" }}>
          <ModalBody>
            <Box pb={5} m={"auto"} border={"0px solid black"} align={"center"}>
              <Flex color={"white"} mb={5} align={"center"} gap={5} justifyContent={"center"}>
                <Text as={"h4"}>Thank you for attempting MSAT!</Text>
              </Flex>
              <Text color={"white"}>Please wait while we are getting your scores.</Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box
        ml="20px"
        position={"relative"}
        as={Flex}
        direction={"column"}
        justify={"center"}
        align={"center"}
        p={"8px"}
        w={["620px", "20px", "620px", "680px"]}
        height="424px"
        boxShadow={"base"}
        borderRadius={"16px"}
        border={"1px solid #E5E5E5"}
        bg="ms-primary"
        display={["none", "none", "none", "flex"]}
      >
        <Box position={"absolute"} left={"0"} top={"0"}>
          <Image h="136px" w="136px" src={eclipse}></Image>
          <Image position={"absolute"} top="20px" left={"20px"} src={tick}></Image>
        </Box>

        <Box textAlign={"center"} mb="50px">
          <Text textStyle={"h3"} color={"#3470E4"} alignSelf={"center"}>
            MSAT Result
          </Text>
          <Text textStyle={"h6"} color={"#544D4F"}>
            Congratulations! You have cleared the MSAT!
          </Text>
        </Box>

        <Grid
          gap={"15px"}
          rowGap={"15px"}
          templateAreas={`"top-left top-right"
                 "bottom-left bottom-right"`}
        >
          {Result?.map((data) => {
            return (
              <Box
                area={"top-left"}
                as={Flex}
                direction={"row"}
                align={"center"}
                borderRadius={"16px"}
                width="314px"
                height="63px"
                border={"1px solid #CFD0EE"}
              >
                <Image
                  src={code_svg}
                  alt="Code svg"
                  w={"40px"}
                  h={"40px"}
                  ml={"8px"}
                  mr={"8px"}
                ></Image>

                <Flex w="232px" direction={"column"}>
                  <Flex w="100%" direction={"row"} justify={"space-between"}>
                    <Text textStyle={"body1-md"} color={" #0A0103"}>
                      {data.sectionName}
                    </Text>
                    <Text textStyle={"body1-md"} color={"#049402"}>
                      {data.result}
                    </Text>
                  </Flex>
                  <Text textStyle={"body2"} color={"#544D4F"}>
                    Marks : {data.scoredMarks}/{data.maxMarks}
                  </Text>
                </Flex>
              </Box>
            );
          })}
        </Grid>
      </Box>

      <Box
        mt="30px"
        mb="30px"
        position={"relative"}
        as={Flex}
        direction={"column"}
        justify={"center"}
        align={"center"}
        p={"8px"}
        width="343px"
        boxShadow={"base"}
        borderRadius={"16px"}
        border={"1px solid #E5E5E5"}
        bg="ms-primary"
        display={["flex", "flex", "flex", "none"]}
      >
        <Box borderTopRightRadius={"16px"} position={"absolute"} right={"0"} top={"0"}>
          <Image
            borderTopLeftRadius={"16px"}
            style={{
              transform: "rotateY(180deg)",
            }}
            h="136px"
            w="136px"
            src={eclipse}
          ></Image>
          <Image position={"absolute"} top="15px" right={"15px"} src={tick}></Image>
        </Box>

        <Box
          width={"170px"}
          justifySelf={"start"}
          alignSelf={"start"}
          Self
          textAlign={"left"}
          mb="30px"
        >
          <Text textStyle={"h6"} color={"#3470E4"} alignSelf={"center"}>
            MSAT Result
          </Text>
          <Text textStyle={"body1"} color={"#544D4F"}>
            Congratulations! You have cleared the MSAT!
          </Text>
        </Box>

        <Accordion defaultIndex={[0]} allowMultiple w="343px" mt="35px">
          <AccordionItem>
            <AccordionPanel>
              <Grid
                mt={"40px"}
                rowGap={"10px"}
                templateAreas={`"top-left"
                                                "top-right"
                                                "bottom-left"
                                                 "bottom-right"`}
              >
                {Result?.map((data) => {
                  return (
                    <Box
                      area={"top-left"}
                      as={Flex}
                      direction={"row"}
                      align={"center"}
                      borderRadius={"16px"}
                      width="314px"
                      height="63px"
                      border={"1px solid #CFD0EE"}
                    >
                      <Image
                        src={code_svg}
                        alt="Code svg"
                        w={"40px"}
                        h={"40px"}
                        ml={"8px"}
                        mr={"8px"}
                      ></Image>

                      <Flex w="232px" direction={"column"}>
                        <Flex w="100%" direction={"row"} justify={"space-between"}>
                          <Text textStyle={"body1-md"} color={" #0A0103"}>
                            {data.sectionName}
                          </Text>
                          <Text textStyle={"body1-md"} color={"#049402"}>
                            {data.result}
                          </Text>
                        </Flex>
                        <Text textStyle={"body2"} color={"#544D4F"}>
                          Marks : {data.scoredMarks}/{data.maxMarks}
                        </Text>
                      </Flex>
                    </Box>
                  );
                })}
              </Grid>
            </AccordionPanel>

            <h2>
              <AccordionButton>
                <Button
                  onClick={openPanel}
                  size={"md"}
                  variant="secondary"
                  as="span"
                  flex="1"
                  textAlign="left"
                >
                  {isPanelOpen ? "VIEW DETAILED REPORT" : "SHOW LESS"}
                  <AccordionIcon />
                </Button>
              </AccordionButton>
            </h2>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
}

export default MSATResult;
