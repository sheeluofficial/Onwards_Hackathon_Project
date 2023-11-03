import { Box, FormControl, FormLabel, Grid, HStack, Heading, Input, Radio, RadioGroup } from '@chakra-ui/react'
import React from 'react'

const OnboardForm = ({dob,graduationD,setDob,setGraduationD,setWorkingorNot}) => {

  return (
    
    <Box>
      <Heading as={'h6'} m={'16px 0px'} display={{ base: "block", sm: "block", md: "none", lg: "none" }}>Please fill this form to start your onboarding.</Heading>
      <FormControl isRequired>
        <Grid templateColumns={{ base: "repeat(1,1fr)", sm:"repeat(1,1fr)",md:"repeat(1,1fr)", lg: 'repeat(2,1fr)' }} gap={'24px'}>
          <Box>
            {/* DOB */}
            <FormLabel>Date of Birth</FormLabel>
            <Input type='date' bg={'white'} value={dob} onChange={(e) => {setDob(e.target.value) }} />
          </Box>
          <Box>
            {/* GRADUATION */}
            <FormLabel>Select your Graduation Month and Year</FormLabel>
            <Input type='month' bg={'white'} value={graduationD} onChange={(e)=>setGraduationD(e.target.value)} />
          </Box>
          <Box>
            {/* WORKING ? */}
            <FormLabel>Are you currently working?</FormLabel>
            <RadioGroup defaultValue='No' >
              <HStack spacing='24px'>
                <Radio value={'Yes'} onChange={()=>setWorkingorNot("yes")}>Yes</Radio>
                <Radio value={'No'} onChange={()=>setWorkingorNot("no")}>No</Radio>
              </HStack>
            </RadioGroup>
          </Box>
        </Grid>
      </FormControl>
    </Box>
  )
}

export default OnboardForm