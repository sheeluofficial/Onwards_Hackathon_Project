import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Avatar,
  Input,
  Grid,
  Card,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
// import { useUserContext } from "../context/user_context";

const MyProfilePage = () => {
  // const user = useUserContext();
  // console.log("Profile", user);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = currentUser.token;
  const [user, setUser] = useState(null);

  const userData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    setUser(response.data);
  };

  console.log(user.user);

  useEffect(() => {
    userData();
  }, []);

  return (
    <Box mt={"18px"} ml={"24px"} mb={"90px"} mr={"20px"} border={"ms-"}>
      {/* Breadcrumb of little navbar */}
      <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" fontSize={"20px"} />}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#" color={"#ED0331"}>
            My Profile
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* My profile heading */}
      <Text as="h3" mt={"24px"}>
        My Profile
      </Text>

      {/* Avatar and name box */}
      <Box display="flex" gap={"16px"} mt={"20px"} flexDirection={"row"} alignItems={"center"}>
        <Avatar w={"100px"} h={"100px"} src={user.user.profileUrl} />
        <Text as={"h5"}>{user.user.name}</Text>
      </Box>

      <Grid
        w={"1120px"}
        h={"368px"}
        border={"ms-"}
        mt={"16px"}
        gap={"15px"}
        mr={"50px"}
        templateColumns={"repeat(2,1fr)"}
      >
        {/* NAME INPUT */}

        <Card p={"16px"} h={"80px"} borderRadius={"16px"}>
          <Text fontSize={"14px"} fontWeight={600}>
            Name
          </Text>
          <Text fontSize={"13px"} fontWeight={"light"} mt={"5px"}>
            {user.user.name}
          </Text>
        </Card>

        {/* DATE OF BITH INPUT */}

        <Card p={"16px"} h={"80px"} borderRadius={"16px"}>
          <Text fontSize={"14px"} fontWeight={600}>
            Date Of Birth
          </Text>
          <Input p={0} fontSize={"12px"} value={"20/07/1999"} border={"0px"} mt={"5px"} />
        </Card>

        {/* MOBILE NUMBER */}

        <Card
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          p={"16px"}
          h={"80px"}
          borderRadius={"16px"}
        >
          <Box m={0} p={0}>
            <Text fontSize={"14px"} m={0} p={0} fontWeight={600}>
              Mobile Number
            </Text>
            <Input
              h={6}
              p={0}
              fontSize={"12px"}
              value={user.user.phoneNumber}
              border={"0px"}
              mt={"2px"}
            />
          </Box>
          <Button
            color="#3470E4"
            size="sm"
            fontSize={"12px"}
            textTransform={"none"}
            variant={"ghost"}
          >
            Edit
          </Button>
        </Card>

        {/* EMAIL ADDRESSS */}

        <Card
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          p={"16px"}
          h={"80px"}
          borderRadius={"16px"}
        >
          <Box m={0} p={0}>
            <Text fontSize={"14px"} fontWeight={600}>
              Email Address
            </Text>
            <Input
              h={6}
              p={0}
              fontSize={"12px"}
              value={user.user.email}
              border={"0px"}
              mt={"2px"}
            />
          </Box>
          <Button
            color="#3470E4"
            size="sm"
            fontSize={"12px"}
            textTransform={"none"}
            variant={"ghost"}
          >
            Edit
          </Button>
        </Card>

        {/* GENDER */}

        <Card p={"16px"} h={"80px"} borderRadius={"16px"}>
          <Text fontSize={"14px"} fontWeight={600}>
            Gender
          </Text>
          <Input p={0} fontSize={"12px"} value={"Male"} border={"0px"} mt={"5px"} />
        </Card>

        {/* REFERRAL CODE */}

        <Card
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          p={"16px"}
          h={"80px"}
          borderRadius={"16px"}
        >
          <Box>
            <Text fontSize={"14px"} fontWeight={600}>
              Referral Code
            </Text>
            <Input h={6} p={0} fontSize={"12px"} value={"#CVBMASAI"} border={"0px"} mt={"2px"} />
          </Box>
          <Button
            _hover={false}
            textTransform={"none"}
            bgColor={"ms-info"}
            color={"white"}
            size="sm"
          >
            Refer Now{" "}
          </Button>
        </Card>

        {/* MONTH AND YEAR GRADUATION */}

        <Card p={"16px"} h={"80px"} borderRadius={"16px"}>
          <Text fontSize={"14px"} fontWeight={600}>
            Month and Year of Graduation
          </Text>
          <Input p={0} fontSize={"12px"} value={"12/2020"} border={"0px"} mt={"5px"} />
        </Card>

        {/* ARE YOU WORKING CURRENTLY? */}

        <Card p={"16px"} h={"80px"} borderRadius={"16px"}>
          <Text fontSize={"14px"} fontWeight={600}>
            Are you working currently?
          </Text>
          <Input p={0} fontSize={"12px"} value={"False"} border={"0px"} mt={"5px"} />
        </Card>
      </Grid>
    </Box>
  );
};

export default MyProfilePage;
