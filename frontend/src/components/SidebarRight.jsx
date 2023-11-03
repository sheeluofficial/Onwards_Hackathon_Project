import { Image, Box, Button, Text, Flex, Stack, Avatar, HStack } from "@chakra-ui/react";
import alumnibanner from "../assets/rightsidebar/alumni.svg";
import rightnew from "../assets/rightsidebar/right-side-new-badge.gif";
import communitybanner from "../assets/rightsidebar/communitybanner.svg";
import teligramlogo from "../assets/rightsidebar/TelegramLogo.svg";

const studentData=[

  {
    avatar:"https://masai-website-images.s3.ap-south-1.amazonaws.com/SAURABH_PAGRUT_7a7b7c1ba0.jpeg",
    name:"Saurabh Pagrut",
    position:"Software Engineer, Pine Labs",
    description:"Professional insights, teamwork, logic mastery—I'm now thriving as a software engineer at Pine Labs. Masai is the path for driven minds.",
    companyLogo:"https://masai-website-images.s3.ap-south-1.amazonaws.com/pine_labs_d538abbe58.png"

  },
  {
    avatar:"https://masai-website-images.s3.ap-south-1.amazonaws.com/SAURABH_PAGRUT_7a7b7c1ba0.jpeg",
    name:"Saurabh Pagrut",
    position:"Software Engineer, Pine Labs",
    description:"Professional insights, teamwork, logic mastery—I'm now thriving as a software engineer at Pine Labs. Masai is the path for driven minds.",
    companyLogo:"https://masai-website-images.s3.ap-south-1.amazonaws.com/pine_labs_d538abbe58.png"

  },
  {
    avatar:"https://masai-website-images.s3.ap-south-1.amazonaws.com/SAURABH_PAGRUT_7a7b7c1ba0.jpeg",
    name:"Saurabh Pagrut",
    position:"Software Engineer, Pine Labs",
    description:"Professional insights, teamwork, logic mastery—I'm now thriving as a software engineer at Pine Labs. Masai is the path for driven minds.",
    companyLogo:"https://masai-website-images.s3.ap-south-1.amazonaws.com/pine_labs_d538abbe58.png"

  }



]



const SidebarRight = () => (
  <Box  overflow={"auto"} p={3} right={0} h={"100%"}  w="260px" bg={"#87C8D5"} justifyContent={"center"}  display={["none", "none", "none" ,"initial","initial"]}
  
  css={{
    "&::-webkit-scrollbar": {
      width: "0px",
    }
  }}
  
  >
    <Stack m={"auto"} width="228px" dir="column" borderRadius="12px" boxShadow="lg" bg="white" p="3">
      <Avatar right={-160} mt={-7} pos={"relative"} size="lg" src={rightnew} />

      <Text mt={-30} fontWeight={"bold"} color={"black"}>
        Get your queries resolved now by our Alumni.
      </Text>
      <Image src={alumnibanner} alt="alumnibanner" />
      <Button
        fontSize={"12px"}
        w="full"
        color="white"
        size="md"
        bg="#3470E4"
        borderRadius="12px"
        _hover={{ bg: "#2550B2" }}
      >
        CONNECT WITH ALUMNI
      </Button>
    </Stack>

    {/* ------------------------------------ */}

    <Stack m={"auto"}  mt={5} width="228px" dir="column" borderRadius="12px" boxShadow="lg" bg="white" p="3">
      <Text textAlign={"center"} fontSize={"12px"} color={"#7261DF"}>
        Join our telegram community to connect with your fellow mates
      </Text>
      <Text textAlign={"center"} fontSize={"14px"} fontWeight={"bold"} color={"black"}>
        1500+ already joined
      </Text>
      <Image w={"288.14px"} h={"99.43px"} src={communitybanner} alt="communitybanner" />
      <Button
        fontSize={"12px"}
        w="full"
        color="#3470E4"
        size="md"
        fontWeight={"bold"}
        bg="#F2F6FF"
        borderRadius="12px"
        _hover={{ bg: "#DCE5FF" }}
      >
        join community
        <Avatar size={"s"} src={teligramlogo} />
      </Button>
    </Stack>

    <Text m={"auto"} mt={4} fontWeight={"bold"}>
      Read what our Alumni & Students have to say
    </Text>

 { studentData?.map((user,index)=>{


 return <Stack key={index}  m={"auto"} mt={5}  width="228px" dir="column" borderRadius="12px" boxShadow="lg"  bg="white" p="3">
  <HStack>
  <Avatar mr={3} size={"md"} src={user.avatar} />
  <Text   fontSize={"md"} fontWeight={"bold"} >
{user.name}
</Text>
  </HStack>
   
<Text ml={10} fontSize={"12px"} mt={-3} textAlign={"right"} >
{user.position}
</Text>
<Text fontSize={"12px"}>
  {user.description}
</Text>
<Image w={"60px"}   src={user.companyLogo} alt="" />

</Stack>



 })}
   

  </Box>
);

export default SidebarRight;
