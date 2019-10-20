import React from "react";
import Header from "../../../components/header";
import styles from "../styles/otp-header-styles";

const OtpHeader = () => {
    return (<styles.OtpHeaderWrapper>
        <Header>
            <styles.SecondHeader>
                <div>Two-Step Verification</div>
                <div>This tells us if it’s really you.</div>
            </styles.SecondHeader> 
        </Header>             
    </styles.OtpHeaderWrapper>)
}

export default OtpHeader;
