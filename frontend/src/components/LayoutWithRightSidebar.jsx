import React from "react";
import { Flex, Box, Show } from "@chakra-ui/react";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";
import Navbar from "./Navbar";
import Bottom from "./Bottom";

const LayoutWithRightSidebar = ({ children }) => {
  return (
    <Flex direction="column" h="100vh">
      <Navbar />
      <Flex pt={"4.7%"} pos={"fixed"} width={"100%"} h={"100vh"} flex="1">
        <SidebarLeft />
        <Box
          overflow={"auto"}
          css={{
            "&::-webkit-scrollbar": {
              width: "0px",
            },
          }}
          flex="1"
          bg="gray.100"
        >
          {children}
        </Box>
        <Show breakpoint="(min-width: 963px)">
          <SidebarRight />
        </Show>
      </Flex>
      <Bottom />
    </Flex>
  );
};

export default LayoutWithRightSidebar;
