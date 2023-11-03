import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import MSATResultComponent from '../components/MSATResult'
import MSATRetake from '../components/MSATRetake'

export default function Result() {
  return (
    <Box position={"relative"} pb="50px" w="100%" minH="100vh" bg="ms-blue.50" justify={"space-between"} align={"center"} as={Flex} direction={["column", "column", "column", "row"]} >

      <MSATResultComponent></MSATResultComponent>
      <MSATRetake ></MSATRetake>

      <Box justify={["center", "center", "center", "end"]} align={"center"} p="20px" w="100%" as={Flex} direction={"row"} h="64px" position={"fixed"} bottom={"0"} border={"1px solid #E5E5E5"} bg="ms-primary" boxShadow={"base"}>
        <Text>Don’t want to
          proceed further?</Text>
        <Button ml="20px" textStyle={"btn-md"} size={"md"} variant={"secondary"} color={'#3470E4'}>EXPLORE DASHBOARD</Button>
      </Box>
    </Box>
  )
}
