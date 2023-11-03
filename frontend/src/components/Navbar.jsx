// Navbar.js
import React, { useState } from "react";
import masai_logo from "../assets/masailogo.ab93bfe1.svg";
import coin from "../assets/Group.svg";
import call from "../assets/Group 1321316751.svg";
import { RepeatIcon, ChevronUpIcon, EditIcon, AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Image,
  Text,
  Flex,
  Avatar,
  MenuButton,
  MenuItem,
  IconButton,
  MenuList,
  ButtonGroup,
  Spacer,
  Tag,
  Menu,
  Divider,
} from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
import { useUserContext } from "../context/user_context";
const Navbar = () => {
  const theme = useTheme();
  const { logoutUser, currentUser } = useUserContext();

  const [isUp, setIsUp] = useState(true);

  return (
    <Flex
      zIndex={100}
      bg={"white"}
      position={"fixed"}
      width={"100%"}
      boxShadow="base"
      height={"56px"}
      p={30}
      alignItems="center"
      gap="2"
    >
      <Image src={masai_logo} alt="Masai_Logo" />
      <Spacer />
      <ButtonGroup gap="2">
        <Tag
          borderRadius={"32px"}
          bg={"white"}
          border={["0px", "0px", "1px solid rgba(255, 131, 43, 1)"]}
          display={["none", "none", "inherit"]}
        >
          <Avatar mr={2} ml={-2} src={coin} size="s" name="Refer and Earn" />

          <Text> Refer and Earn</Text>
        </Tag>
        <Tag
          borderRadius={"32px"}
          bg={"white"}
          border={["0px", "0px", "1px"]}
          borderColor="rgba(93, 141, 233, 1)"
        >
          <Avatar mr={2} ml={-2} src={call} size="xs" name="Request Callback" />
          <Text display={["none", "none", "inline"]}> Request Callback</Text>
        </Tag>
        {/* --------------------- */}
      </ButtonGroup>
      <Tag borderRadius={"32px"} p={"1px 8px 1px 3px"} bg={"white"}>
        <Avatar src={""} size="sm" color={"white"} name={currentUser?.user.name} ml={-1} mr={2} />
        <Text display={["none", "none", "inline"]}>{currentUser?.user.name}</Text>

        <Menu>
          <MenuButton
            as={IconButton}
            colorScheme="white"
            icon={isUp ? <ChevronDownIcon /> : <ChevronUpIcon />}
            border={0}
            onClick={() => {
              setIsUp(!isUp);
            }}
          />
          <MenuList>
            <MenuItem as={"a"} href="/myprofile">
              My Profile
            </MenuItem>
            <Divider />
            <MenuItem>My Tutorials</MenuItem>
            <Divider />
            <MenuItem>My Bookmarks</MenuItem>
            <Divider />
            <MenuItem>My Certificats</MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                logoutUser();
              }}
            >
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
      </Tag>
    </Flex>
  );
};

export default Navbar;
