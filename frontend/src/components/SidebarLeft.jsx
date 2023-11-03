import React, { useState } from "react";
import homeicon from "../assets/leftsidebar/homeicon.svg";
import bookicon from "../assets/leftsidebar/bookicon.svg";
import laptopicon from "../assets/leftsidebar/laptopicon.svg";
import selfLearning from "../assets/leftsidebar/selfLearning.svg";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Stack, Box, Text, Avatar, HStack } from "@chakra-ui/react";
const SidebarLeft = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const toggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const NavData = [
    {
      title: "Home",
      icon: homeicon,
      route: "/",
    },
    {
      title: "Courses",
      icon: bookicon,
      route: "/courses",
    },
    {
      title: "Self Learning",
      icon: selfLearning,
      route: "#",
    },
    {
      title: "Events",
      icon: laptopicon,
      route: "/events",
    },
  ];

  return (
    <Box
      display={["none", "none", "inherit", "inherit"]}
      direction="column"
      width={isExpanded ? "260px" : "64px"}
      height="100%"
      bg={"white"}
      color="black"
      h={"100%"}
      pt={2}
      borderRight="1px solid #d9d9d9"
      transition="width 1s"
    >
      <Stack dir="column" fontSize={"17px"} fontWeight={"bold"} w="full">
        <HamburgerIcon
          mt={["0px", "0px", "4px", "2px"]}
          ml={"24px"}
          _hover={{ cursor: "pointer" }}
          onClick={toggleSidebar}
        />
        {NavData.map(({ icon, route, title }, i) => {
          return (
            <ChakraLink
              as={ReactRouterLink}
              to={route}
              _hover={{ textDecoration: "none", bg: "#f2f6ff" }}
              w="full"
              key={`nav-${i}`}
              borderLeft={route === location.pathname ? "3px solid blue" : "0"}
              bg={route === location.pathname ? "#f2f6ff" : "white"}
              color={route === location.pathname ? "blue" : "black"}
            >
              <HStack p={"16px 8px 16px 20px"}>
                <Avatar bg={"transparent"} color={"white"} w={"27px"} h={"27px"} src={icon} />
                <Text pl={2} isTruncated>
                  {title}
                </Text>
              </HStack>
            </ChakraLink>
          );
        })}
      </Stack>
    </Box>
  );
};

export default SidebarLeft;
