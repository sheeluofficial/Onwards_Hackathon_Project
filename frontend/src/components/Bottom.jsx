import React, { useState } from "react";
import homeicon from "../assets/leftsidebar/homeicon.svg";
import bookicon from "../assets/leftsidebar/bookicon.svg";
import laptopicon from "../assets/leftsidebar/laptopicon.svg";
import selfLearning from "../assets/leftsidebar/selfLearning.svg";
import { Link } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Stack, Box, Text, Avatar, Tag, VStack,Flex } from "@chakra-ui/react";
const Bottom = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
 
      <Flex display={["inherit","inherit","inherit","none","none"]} gap={5} justifyContent={"center"}  pos={"relative"} zIndex={100} top={"93.4vh"} bg={"white"}  dir="column" fontSize={"12px"} fontWeight={"bold"}>
      
        <Link href="/"  _hover={{ textDecoration: "none", bg: "#F2F6FF" }}>
          <VStack>
            <Avatar bg={"transparent"} color={"white"} w={"20px"} h={"20px"} src={homeicon} />
            <Text >Home</Text>
          </VStack>
        </Link>

        <Link href="/courses"  _hover={{ textDecoration: "none", bg: "#F2F6FF" }}>
          <VStack>
            <Avatar bg={"transparent"} w={"20px"} h={"20px"} size={"s"} src={bookicon} />
            <Text >Courses</Text>
          </VStack>
        </Link>
        <Link href="/activities"  _hover={{ textDecoration: "none", bg: "#F2F6FF" }}>
          <VStack >
            <Avatar bg={"transparent"} w={"20px"} h={"20px"} size={"s"} src={selfLearning} />
           
            <Text > Self Learning</Text>
          </VStack>
        </Link>
        <Link  _hover={{ textDecoration: "none", bg: "#F2F6FF" }}>
          <VStack >
            <Avatar bg={"transparent"}w={"20px"} h={"20px"} size={"s"} src={laptopicon} />
            <Text >Event</Text>
          </VStack>
        </Link>
      </Flex>
  
  );
};

export default Bottom;
