import {
  Box,
  Button,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useTheme,
} from "@chakra-ui/react";
import React, { useState } from "react";

const BookNowForm = ({ isOpen, onOpen, onClose, handleBookingDetails }) => {
  const [details, setDetails] = useState({
    DOB: "",
    graduation_date: "",
  });
  const [is_working_radio, setIs_working_radio] = useState("1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const temp = { ...details, is_working: is_working_radio === "1" ? true : false };
    handleBookingDetails(temp);
    onClose();
  };

  const theme = useTheme();
  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent rounded="40px 40px 0px 0px" minW="375px">
        <DrawerBody minH="480px" rounded="40px 40px 0px 0px" p={0} pos="relative">
          <form onSubmit={handleSubmit}>
            <Divider rounded="4px" border={"3px solid #595959"} w="101px" m="auto" mt="24px" />
            <Box w="343px" h="336px" m="auto" mt="24px">
              <Text
                w="253px"
                m="auto"
                textAlign="center"
                {...{ ...theme.textStyles["body2-md"], fontSize: "16px" }}
                mb="24px"
              >
                Book a Free Counselling Session with our Team.
              </Text>
              <Stack gap="6px">
                <FormControl isRequired>
                  <FormLabel textStyle="body2-md">1. Enter your date of birth</FormLabel>
                  <Input
                    type="date"
                    border="1px solid #E5E5E5"
                    _focus={{ outline: "1px solid #E5E5E5" }}
                    placeholder="DD/MM/YY"
                    name="DOB"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel textStyle="body2-md">2. Select your graduation month & year</FormLabel>
                  <Input
                    type="date"
                    border="1px solid #E5E5E5"
                    _focus={{ outline: "1px solid #E5E5E5" }}
                    placeholder="DD/MM/YY"
                    name="graduation_date"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel textStyle="body2-md">3. Are you currently Working?</FormLabel>
                  <RadioGroup
                    name="is_working"
                    value={is_working_radio}
                    onChange={setIs_working_radio}
                  >
                    <Stack direction="column">
                      <Radio value={"1"} textStyle="body2-md">
                        Yes, I’m currently working
                      </Radio>
                      <Radio value={"2"} textStyle="body2-md">
                        No, I’m currently not working
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Box>
            <Center
              w="full"
              boxShadow="0px -8px 32px 0px #0000001A"
              bottom={0}
              pos="absolute"
              h="64px"
            >
              <Button
                type="submit"
                bgColor={"ms-info"}
                w="337px"
                h="40px"
                rounded="8px"
                p="8px 16px 8px 16px"
                m="auto"
                textStyle="btn-md"
                color="ms-primary"
              >
                submit
              </Button>
            </Center>
          </form>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default BookNowForm;
