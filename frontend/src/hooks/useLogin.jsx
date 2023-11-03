import React, { useState } from 'react'

function useLogin() {



    //   OTP panel state 
    const [isOTP, setIsotp] = useState(false);

    const openOTPPanel = () => {
        setIsotp(true);
    };

    const closeOTPPanel = () => {
        setIsotp(false);
    };

    //   Login Modal 

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);

    };




    return { isLoginModalOpen, isOTP, openLoginModal, openOTPPanel, closeLoginModal, closeOTPPanel }
}

export default useLogin