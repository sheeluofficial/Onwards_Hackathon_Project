import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [LoginSignupCallbackData, setLoginSignupCallbackData] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  const toast = useToast();
  const [createUser, setCreateUser] = useState(null);
  const submitUserDetails = (fullName, userEmail, mobileNumber, refferal) => {
    sendOtpOnMobile(mobileNumber);
  };

  const sendOtp = () => {};

  const sendOtpOnMobile = () => {};

  const sendOtpOnMail = () => {};

  const validateOtp = (otpValue) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/verify-otp`, {
        otp: otpValue,
        userId: LoginSignupCallbackData.userId,
        sendOn: LoginSignupCallbackData.sendOn,
      })
      .then(function (response) {
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        setCurrentUser(response.data);
        toast({
          position: "top",
          title: "Successfully Logged in!!",
          status: "success",
        });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const registerUser =(fullName,email,mobileNumber) => {
  axios.post(`${process.env.REACT_APP_BASE_URL}/user/signup`, {
     name:fullName,
     email:email,
     phoneNumber:mobileNumber
    }).then(function (response) {
      setLoginSignupCallbackData(response.data.userData);
      console.log(response);
     
    })
    .catch(function (error) {
      console.log(error);
    });

  };

  const getUser = async (token) => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = res;
    setCurrentUser(data);
  };

  const loginUser = (signInData) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/login`, {
        email: signInData,
      })
      .then(function (response) {
        console.log(response);
        setLoginSignupCallbackData(response.data.userData);
        console.log(response.data.userData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const logoutUser = () => {
    localStorage.clear();
    setCurrentUser(null);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser")) || "";
    if (user.token && !currentUser) {
      getUser(user.token);
    }
  }, [currentUser]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        createUser,
        registerUser,
        loginUser,
        logoutUser,
        submitUserDetails,
        validateOtp,
        sendOtp,
        LoginSignupCallbackData,
        setLoginSignupCallbackData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
