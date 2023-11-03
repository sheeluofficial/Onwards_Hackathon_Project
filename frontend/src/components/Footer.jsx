import React from "react";
import { Box ,Button,Flex,Text} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box justify={["center", "center", "center", "end"]} align={"center"} p="20px" w="100%" as={Flex} direction={"row"} h="64px" position={"fixed"} bottom={"0"} border={"1px solid #E5E5E5"} bg="ms-primary" boxShadow={"base"}>
    <Text>Don’t want to
      proceed further?</Text>
    <Button ml="20px" textStyle={"btn-md"} size={"md"} variant={"secondary"} color={'#3470E4'}>EXPLORE DASHBOARD</Button>
  </Box>
  );
};

export default Footer;
