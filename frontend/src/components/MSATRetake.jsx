import { Box, Button, Flex, Image, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import checkIcon from "../assets/checkIcon.svg";
import cancelIcon from "../assets/cancelIcon.svg";
import { useApplicationContext } from "../context/ApplicationContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function MSATRetake({score}) {
  const { handleApplicationStatus, applicationStatus } = useApplicationContext();
  const { passedCourse, setPassedCourse } = useState("android");
  const {handleGenerateTest,UpdateApplicationStatus}=useApplicationContext()
  const [isdes,setIsdes]=useState(false)
  const [course,setCourse]=useState(null)
  const token = JSON.parse(localStorage.getItem("currentUser")).token;
  const navigate=useNavigate()
   const [allCourse,setAllcourse]=useState([])
   const handleSelectCourse=(courseId)=>{

    axios.patch(
      `${process.env.REACT_APP_BASE_URL}/applications/select-course`,
      {
        courseId:"6510235d96c51b5674bc76f2"
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(function (response) {
    
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

   }

   const getAllCourse = () => {
     axios.get(
         `${process.env.REACT_APP_BASE_URL}/courses`,
         {
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
           },
         }
       )
       .then(function (response) {
        setAllcourse(response.data.courses)
         console.log(response.data.courses);
       })
       .catch(function (error) {
         console.log(error);
       });
   };
   useEffect(()=>{
     getAllCourse()
   },[])
 

  return (
    <Box
      mr={[0, 0, 0, "20px"]}
      w={["343px", "343px", "343px", "500px"]}
      h={["auto", "auto", "auto", "424px"]}
      boxShadow={"base"}
      borderRadius={"16px"}
      border={"1px solid #E5E5E5"}
      bg="ms-primary"
    >
      <Box
        borderTopLeftRadius={"16px"}
        borderTopRightRadius={"16px"}
        p="15px"
        bg="#FFF3CC"
        textAlign={"center"}
      >
        <Text mb="8px" textStyle="body1-md" fontWeight={"300"} color={"#3B3435"}>
          Based on your MSAT result you have cleared cut off for 2 courses.
        </Text>
        <Text textStyle="h6">Select course that you want to apply for or Retake MSAT.</Text>
      </Box>
      <Box as={Flex} direction={"Column"}>
        <Box
          as={Flex}
          direction={"row"}
          justify={"space-between"}
          borderBottom={"1px solid #D9D9D9"}
        >
          <Text
            textAlign={"center"}
            w={"70%"}
            textStyle="body1-md"
            borderRight={"1px solid #D9D9D9"}
          >
            Courses
          </Text>
          <Text w="30%" textAlign={"center"} textStyle="body1-md">
            Cut-off clear
          </Text>
        </Box>
        <Box as={Flex} direction={"row"}>
          <Box
            pb="8px"
            w={"70%"}
            borderRight={"1px solid #D9D9D9"}
            borderBottom={"1px solid #D9D9D9"}
          >
            <RadioGroup pl="15px" onChange={setCourse} value={passedCourse}>
              <Stack direction="column">
                {allCourse?.map((data)=>{
                  return <Radio  id={data._id}  key={data._id} onClick={()=>setCourse(data._id)}   h={"24px"} value={data.name}>
                   <Text textStyle="body1-md">
                    {data.name}
                   
                  
                   </Text>
                 </Radio>
                })}
                {/* <Radio onClick={()=>setCourse("uiux")} isDisabled={score<30}  h={"24px"} value="uiux">
                  <Text textStyle="body1-md">
                    UX/UI Design{" "}
                    <Text display={"inline"}   color="#3470E4">
                      {" "}
                      (view details)
                    </Text>
                  </Text>
                </Radio>
                <Radio onClick={()=>setCourse("web")} isDisabled={score<40}  value="web">
                  <Text textStyle="body1-md">
                    Web Development{" "}
                    <Text display={"inline"} color="#3470E4">
                      {" "}
                      (view details)
                    </Text>
                  </Text>
                </Radio>
                <Radio onClick={()=>setCourse("da")} isDisabled={score<50}  value="da">
                  <Text textStyle="body1-md" >
                    Data Analyst{" "}
                  </Text>
                </Radio>
                <Radio onClick={()=>setCourse("android")}  isDisabled={score<60}  value="android">
                  <Text textStyle="body1-md" >
                    Android Development{" "}
                  </Text>
                </Radio> */}
              </Stack>
            </RadioGroup>
          </Box>

          <Box
            pb={"8px"}
            borderBottom={"1px solid #D9D9D9"}
            width={"30%"}
            as={Flex}
            direction={"column"}
            justify={"space-around"}
            align={"center"}
          >
            <Image h={"24px"} w="24px" src={score>30?checkIcon :cancelIcon} alt="check icon"></Image>
            <Image h={"24px"} w="24px" src={score>40?checkIcon :cancelIcon} alt="check icon"></Image>
            <Image h={"24px"} w="24px" src={score>50?checkIcon :cancelIcon} alt="cancel icon"></Image>
            <Image h={"24px"} w="24px" src={score>60?checkIcon :cancelIcon} alt="cancel icon"></Image>
          </Box>
        </Box>
      </Box>
      <Box
        mb="15px"
        pt="15px"
        as={Flex}
        direction={"row"}
        justify={"center"}
        align={"center"}
        gap={"10px"}
        ml="10px"
        mr="10px"
      >
        <Button isDisabled={course==null} onClick={()=>{
         handleSelectCourse(course)
         UpdateApplicationStatus("MSAT_CLEARED");
         navigate("/")
          
        }}  textStyle={"btn-md"} size={"md"} variant={"secondary"} color={"#3470E4"}>
          confirm course
        </Button>
        <Button isDisabled={isdes}
          textStyle={"btn-md"}
          size={"md"}
          variant={"primary"}
          color={"#FFFFFF"}
          onClick={() => {
            setIsdes(true)
            handleGenerateTest()
            handleApplicationStatus("MSAT_CLEARED");
           
          }}
        >
       RETAKE  MSAT 
        </Button>
      </Box>
    </Box>
  );
}

export default MSATRetake;
