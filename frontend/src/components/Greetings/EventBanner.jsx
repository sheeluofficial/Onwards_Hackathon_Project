import { Flex, Image, Text, useTheme } from "@chakra-ui/react";
import React from "react";
import CheckedCalenderIcon from "../../assets/Greetings/CheckedCalenderIcon.png";
import albertProfile from "../../assets/Greetings/Frame 1321317064.png";

const formatDate = (date) => {
  const apiDate = new Date(date);
  const formattedDate = apiDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    weekday: "long",
  });
  return formattedDate;
};

const EventBanner = ({
  title,
  author,
  author_qualification,
  event_date,
  author_image,
  size = "lg",
}) => {
  const theme = useTheme();
  const formattedDate = formatDate(event_date);
  return (
    <Flex
      justifyContent="space-between"
      flexDir="column"
      pos="relative"
      bgColor="#FFEBF0"
      h="166px"
      py="12px"
      px="16px"
      m="auto"
      overflow={"hidden"}
      w={size === "xs" ? "290px" : "full"}
    >
      <Text w="230px" maxH="72px" textStyle={size === "xs" ? "h6" : "h5"} noOfLines={3}>
        {title}
      </Text>
      {size === "xs" ? (
        <Image
          src={author_image}
          bottom={"-10px"}
          alt="author-profile-pic"
          right={"-5px"}
          pos="absolute"
          objectFit="contain"
          w={size === "xl" ? { base: "auto", lg: "214px" } : "100px"}
          h={size === "xl" ? { base: "auto", lg: "214px" } : "100px"}
        />
      ) : (
        <Image
          src={author_image}
          bottom={0}
          alt="author-profile-pic"
          right={0}
          objectFit="contain"
          pos="absolute"
          w={size === "xl" ? { base: "auto", lg: "214px" } : "100px"}
          h={size === "xl" ? { base: "auto", lg: "214px" } : "100px"}
        />
      )}

      <Flex
        alignItems="baseline"
        gap={size === "xs" ? "0" : "6px"}
        flexDir={size === "xs" ? "column" : "row"}
      >
        <Text textStyle="body2-md">{author}</Text>
        <Text
          w="146px"
          {...{ ...theme.textStyles["body2-md"], fontSize: "12px" }}
          color="ms-grey.700"
          noOfLines={1}
        >
          {`(${author_qualification})`}
        </Text>
      </Flex>
      <Flex gap="6px" alignItems="center">
        <Image src={CheckedCalenderIcon} w="18px" h="19.5px" objectFit="contain" />
        <Text textStyle="body2-md">{formattedDate}</Text>
      </Flex>
    </Flex>
  );
};

export default EventBanner;
