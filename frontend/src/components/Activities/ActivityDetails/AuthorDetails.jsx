import { Box, Image, Stack, Text } from "@chakra-ui/react";
import authorImage from "../../../assets/activities/amanvats_masterclass_profile.png";
import React from "react";

const AuthorDetails = () => {
  return (
    <Box
      minW="343px"
      w="full"
      h="377px"
      bgColor="#F9F9F9"
      rounded="12px"
      m="auto"
      py={"19px"}
      mt={"64px"}
    >
      <Stack w="247px" m="auto" h="88px" spacing="6px" textAlign="center">
        <Text textStyle="body1">Know your speaker</Text>
        <Text textStyle="h5">Meet</Text>
        <Text textStyle="h3" color="ms-purple.500">
          AMAN VATS
        </Text>
      </Stack>
      <Image src={authorImage} w="121.9px" h="122.53px" m="auto" my="19px" />
      <Text textStyle="body2" textAlign="center" color="ms-grey.700">
        Behind every successful business decision is a Data Analyst with a sharp mind and sharper
        skills. Want to be that key player? Join Aman Vats, senior director of curriculum at Masai.
      </Text>
    </Box>
  );
};

export default AuthorDetails;
