import React from "react";
import OtpContainer from "./otp-container";

const Main = () => (<div>
    Main
    <OtpContainer 
        maxLength = {6}
        failedOtpAttempts = {5}
        resendOtpAttempts = {3}
        resendOtpTimer = {30}/>
</div>)

export default Main;