import React, { useState } from 'react'

function useSignin() {



    //   OTP panel state 
    const [isSignOTP, setSignIsotp] = useState(false);

    const openSignOTPPanel = () => {
        setSignIsotp(true);
    };

    const closeSignOTPPanel = () => {
        setSignIsotp(false);
    };

    //   Login Modal 

    const [isSigninModalOpen, setIsSigninModalOpen] = useState(false);
    const openSignInModal = () => {
        setIsSigninModalOpen(true);
    };

    const closeSigninModal = () => {
        setIsSigninModalOpen(false);

    };




    return { openSignInModal, closeSignOTPPanel, openSignOTPPanel, closeSigninModal, isSignOTP, isSigninModalOpen }
}

export default useSignin