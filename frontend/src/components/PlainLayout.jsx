import { Flex } from "@chakra-ui/react";
import Footer from "./Footer";

const PlainLayout = ({ children }) => {
  return (
    <Flex direction="column" h="100vh" bg="gray.100">
      <Flex flex="1" align="center" justify="center">
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default PlainLayout;
