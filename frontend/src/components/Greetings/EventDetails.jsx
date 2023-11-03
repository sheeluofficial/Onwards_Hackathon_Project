import { Box, Flex, Text, useTheme, Image, Badge, Button, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import checkmarkCircle from "../../assets/Greetings/checkmarkCircle.png";
import fireEmoji from "../../assets/Greetings/fireEmoji.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/user_context";

const EventDetails = ({
  type,
  title,
  start_time,
  duration,
  end_time,
  registered_count,
  start_time_label,
  end_time_label,
  tag,
  highlight_last_word = false,
  size,
  _id,
  registered = false,
  handleOnRegister = () => {},
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const normalText = title;
  const highlight = title;
  const [isRegistered, setIsRegistered] = useState(false);
  const { currentUser } = useUserContext();
  const toast = useToast();

  const handleRegister = () => {
    toast({
      position: "top-right",
      title: `Registered successfully for the webinar`,
      status: "success",
      isClosable: true,
    });
    setIsRegistered(true);
    handleOnRegister();
  };

  useEffect(() => {
    if (currentUser?.user?.events) {
      currentUser.user.events.forEach((item) => {
        console.log("events", item);
        if (item._id === _id) {
          setIsRegistered(true);
        }
      });
    }
  }, [currentUser, _id]);

  return (
    <Flex
      flexDir={"column"}
      gap="8px"
      w={
        size === "sm"
          ? "311px"
          : size === "xl"
          ? "95%"
          : size === "xs"
          ? "290px"
          : { base: "311px", md: "361px" }
      }
      m="auto"
      mt="5px"
      pb="10px"
      align={size === "xs" ? "center" : "flex-start"}
    >
      {tag &&
        (size === "xs" ? null : (
          <Badge variant="blue" {...theme.textStyles["body2-md"]} w="fit-content">
            {type}
          </Badge>
        ))}

      {highlight_last_word ? (
        <Text
          textStyle={size === "xs" ? "body1-md" : "h4"}
          textAlign={size === "xs" ? "center" : "left"}
        >
          {normalText}
          <span style={{ color: "#3470E4", display: "block" }}>{highlight}</span>
        </Text>
      ) : (
        <Text textStyle={size === "xs" ? "body1-md" : "h4"}>{title}</Text>
      )}
      {size === "xs" ? null : (
        <Flex w="full" h="49px" alignItems="center" gap="5px" justifyContent="space-between">
          <Box>
            <Text {...theme.textStyles["body2-md"]}>{start_time}</Text>
            <Text {...theme.textStyles.caption}>{start_time_label}</Text>
          </Box>
          <Box w="254.21px" textAlign="center" flexGrow={1}>
            <Text {...theme.textStyles.regular}>{duration}</Text>
            <Box border="2px solid #FFCD1E"></Box>
            <Text {...theme.textStyles.regular}>Duration</Text>
          </Box>
          <Box>
            <Text {...theme.textStyles["body2-md"]}>{end_time}</Text>
            <Text {...theme.textStyles.caption}>{end_time_label}</Text>
          </Box>
        </Flex>
      )}

      {isRegistered ? (
        <Flex
          w={size === "xs" ? "auto" : size === "sm" ? "311px" : { base: "311px", md: "361px" }}
          h="32px"
          m="auto"
        >
          <Flex
            w={size === "lg" ? { base: "111px", lg: "116px" } : size === "xs" ? "full" : "111px"}
            h="24px"
            gap="7px"
            alignItems="center"
            m="auto"
          >
            <Image src={checkmarkCircle} w="14px" h="14px" />
            <Text {...theme.textStyles["body1-md"]} color="ms-green.500">
              Registered
            </Text>
          </Flex>
          <Button
            w={size === "lg" ? { base: "188px", md: "233px" } : size === "xs" ? "170px" : "188px"}
            h="32px"
            p="8px 12px 8px 12px"
            rounded="8px"
            bgColor="ms-info"
            color="ms-primary"
            {...theme.textStyles["btn-sm"]}
            _hover={{ bgColor: "#5D93FF" }}
            onClick={() => navigate(`/events/${_id}`)}
          >
            VIEW DETAILS
          </Button>
        </Flex>
      ) : (
        <Button
          size="sm"
          type="primary"
          bgColor="ms-info"
          color="ms-primary"
          textStyle="btn-sm"
          w={size === "xs" ? "266px" : "full"}
          _hover={{ bgColor: "#5D93FF" }}
          onClick={handleRegister}
        >
          register now with 1 click
        </Button>
      )}
      {size === "xs" ? null : (
        <Flex minW="202px" gap="7px" alignItems="center" m="auto">
          <Image src={fireEmoji} w="17px" h="20px" />
          <Text fontSize="10.82px" lineHeight="14.66px" fontWeight="400" fontFamily="Open Sans">
            <span
              style={{
                fontWeight: "700",
                color: "#ED0331",
              }}
            >
              {registered_count}
            </span>{" "}
            people have already registered
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default EventDetails;
