import {
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import MasaiLogo from "../assets/MasaiLogo-dark-web.svg";
import { ChevronDownIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";
import NavModal from "./NavModal";
import OTPVerifiactionPanel from "./OTPVerificationPanel";
import useLogin from "../hooks/useLogin";
import useSignin from "../hooks/useSignin";
import SignInModal from "./SigninModal";
import { Link } from "react-router-dom";
import SignUpModal from "./SignUpModal";
const NavbarBeforeLogin = () => {
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);
  const { isLoginModalOpen, isOTP, openLoginModal, openOTPPanel, closeLoginModal, closeOTPPanel } =
    useLogin();
  const {
    openSignInModal,
    closeSignOTPPanel,
    openSignOTPPanel,
    closeSigninModal,
    isSignOTP,
    isSigninModalOpen,
  } = useSignin();

  // Function for Opening sign in Modal from login modal

  const openSignInModalFromLoginModal = () => {
    openSignInModal();
    closeLoginModal();
  };

  // Function for Opening log in Modal from Sign in modal
  const openLogInModalFromSigninModal = () => {
    openLoginModal();
    closeSigninModal();
  };

  // Nav Modal

  const openNavModal = () => {
    setIsNavModalOpen(true);
  };

  const closeNavModal = () => {
    setIsNavModalOpen(false);
  };

  const { isOpen, onToggle } = useDisclosure();
  const [isNavDropOpen, setNavDrop] = useState(false);

  const handleToggle = () => {
    setNavDrop(!isNavDropOpen);
  };
  return (
    <Box
      bg="ms-primary"
      color="ms-red.900"
      boxSizing="border-box"
      boxShadow={["sm"]}
      p="0px"
      m="0"
      as={Flex}
      w={["100%"]}
      h={["56px", "56px", "56px", "88px"]}
      position="fixed"
      top="0"
      zIndex="10"
      justify={["space-between", "space-between", "space-between", "space-around"]}
      direction="row"
    >
      {/* NavModal  */}

      <NavModal isOpen={isNavModalOpen} onClose={closeNavModal} />

      <Box
        ml="16px"
        mt={["8px", "8px", "8px", "16px"]}
        display={["inline", "inline", "none", "none"]}
        onClick={handleToggle}
      >
        {isNavDropOpen ? (
          <CloseIcon w="24px" h="24px" />
        ) : (
          <HamburgerIcon onClick={openNavModal} w="24px" h="24px" />
        )}
      </Box>

      <Image
        src={MasaiLogo}
        w={["106px", "114px", "114px", "114px"]}
        h="40px"
        mt={["8px", "8px", "8px", "24px"]}
        display={["inline", "inline", "none", "inline"]}
      />

      <Box
        p="0"
        w={["106px", "140px", "140px", "150px"]}
        h="40px"
        mt={["8px", "8px", "8px", "24px"]}
        ml={["0px", "0px", "10px", "10px"]}
        display={["none", "none", "flex", "none"]}
        direction="row"
      >
        <Box
          ml="16px"
          mr="10px"
          mt={["8px", "0px", "5px", "16px"]}
          w="18px"
          h="18px"
          onClick={handleToggle}
        >
          {isNavDropOpen ? (
            <CloseIcon w="18px" h="18px" />
          ) : (
            <HamburgerIcon onClick={openNavModal} w="18px" h="18px" />
          )}
        </Box>
        <Image mt="0" src={MasaiLogo} alt="Masai Logo" w="114px" h="40px" />
      </Box>

      {/* <Image  w={"8%"} h={"50%"} ml={"5%"} mt={"24px"} src={MasaiLogo} alt="masai logo"/> */}

      <Box
        as={Flex}
        mt={"24px"}
        h={"50%"}
        textTransform={"uppercase"}
        display={["none", "none", "none", "flex"]}
      >
        <Link to="/courses">
          <Button textAlign={"center"} border={"none"} size="sm">
            Courses
          </Button>
        </Link>

        <Button textAlign={"center"} border={"none"} size="sm">
          Fees&PAP
        </Button>
        <Button textAlign={"center"} border={"none"} size="sm">
          Events&Contests
        </Button>

        <Menu>
          <MenuButton
            textAlign={"center"}
            border={"none"}
            size="sm"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            FREE RESOURSES
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>

        <Button textAlign={"center"} border={"none"} size="sm">
          Hire From US
        </Button>
      </Box>

      <Box as={Flex} direction="row" mr={["10px", "10px", "10px", "10px"]}>
        <Link to="refferal">
          <Button
            padding={"12px, 16px, 12px, 16px"}
            borderRadius={"8px"}
            bg={"ms-cyan.50"}
            color={"ms-purple.500"}
            mt={["10px", "10px", "10px", "20px"]}
            mr={"20px"}
            textTransform={"uppercase"}
            display={["none", "none", "none", "inline"]}
          >
            Refer & earn
          </Button>
        </Link>
        <Button
          padding={"12px, 16px, 12px, 16px"}
          textTransform={"uppercase"}
          border={"1px solid red"}
          mt={["8px", "8px", "8px", "20px"]}
          color={"ms-red.500"}
          onClick={openLoginModal}
        >
          Login
        </Button>

        {/* Login/Register modal */}
        <SignUpModal
          openSigninModal={openSignInModalFromLoginModal}
          openOTPModal={openOTPPanel}
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
        />

        {/* OTP panel */}
        <OTPVerifiactionPanel
          isOpen={isOTP}
          onClose={closeOTPPanel}
          otpMedium={"Email"}
          sendOn={"sheelu@gmail.com"}
        ></OTPVerifiactionPanel>

        {/* Signin Modal  */}
        <SignInModal
          openLoginModal={openLogInModalFromSigninModal}
          isOpen={isSigninModalOpen}
          onClose={closeSigninModal}
          openOTPModal={openOTPPanel}
        ></SignInModal>
      </Box>
    </Box>
  );
};

export default NavbarBeforeLogin;
