import React from "react";
import OtpInput from "./otp-input";
import ResetTimer from "./reset-timer";


import smsImg from "../images/Group.svg";
/* import axios from "axios"; */

import containerstyles from "../styles/otp-container-styles";
import * as btnStyles from "../styles/btn-styles";
import smsWrapperStyles from "../styles/sms-wrapper-styles";

import { sessionstore } from "../../../utilities/store/sessionstore";

const Btn = btnStyles.BtnStyles;

const Errors = {
    "resendOtpAttemptsCrossed": "Resend Attempts Crossed",
    "incorrectOtp": "The 6-digit OTP you entered is incorrect.Try again or press ‘Resend SMS OTP’ for a new one.",
    "otpFailed": "Wrong Attempts Crossed"
}

// contains submit, reset, opt-input
const OtpContainer = (props) => {
    const otpRef = React.createRef();
    /* let failedOtpAttempts = 0; */
    /* let resendOtpAttempts = 0; */

    const [failedOtpAttempts,setfailedOtpAttempts] = React.useState(0);
    const [resendOtpAttempts,setresendOtpAttempts] = React.useState(0);
    const [otp,setOtp] = React.useState("");
    const [disableSubmit,setdisableSubmit] = React.useState(true);
    const [showError,setshowError] = React.useState(false);
    const [resendErr,setresendErr] = React.useState(false);
    const [errorContent,seterrorContent] = React.useState(null);

    const getAttempts = (attempt) => {
        if(sessionstore.get(attempt)){
            return parseInt(sessionstore.get(attempt));
        }
        return eval(attempt);
    }

    const setAttempts = (attempt,val) => {       
        sessionstore.set(attempt, val);
    }

    React.useEffect(() => {
        let disableSubmit = true;
        if(otp.length === props.maxLength){            
            disableSubmit = false;
        }
        setdisableSubmit(disableSubmit); 
    },[otp]);

    const failedError = () => {
        let failedOtpAttempts = getAttempts("failedOtpAttempts"); 
        console.log("Call from Failed Error ",failedOtpAttempts);       
        if(failedOtpAttempts === props.failedOtpAttempts){

            seterrorContent(Errors["otpFailed"]);
        }else if(failedOtpAttempts < props.failedOtpAttempts){
            otpRef.current.nullifyOtp();
            seterrorContent(Errors["incorrectOtp"]); 
        }
    }

    const resendError = () => {
        let resendOtpAttempts = getAttempts("resendOtpAttempts");
        if(resendOtpAttempts === props.resendOtpAttempts){
            seterrorContent(Errors["resendOtpAttemptsCrossed"]); 
        }else if(resendOtpAttempts < props.resendOtpAttempts){
            return;
        }
    }

    React.useEffect(() => {
        failedError();
    },[showError,failedOtpAttempts]);


    React.useEffect(() => {
        resendError();
    },[resendErr,resendOtpAttempts]);

    const otpChangeHandler = (val) => {
        let otp = val.trim();
       // let disableSubmit = true;
        let failedOtpAttempts = getAttempts("failedOtpAttempts");        
        //console.log("F ppp ",failedOtpAttempts, props.failedOtpAttempts);
        
        if(failedOtpAttempts >= props.failedOtpAttempts){
            console.log("F ",failedOtpAttempts, props.failedOtpAttempts);
            
            setdisableSubmit(true);
            return;
        }
   
        setOtp(otp);
    }


   

    const submitOtp = () => {
        //api call 
        console.log("submit otp called");  
        setdisableSubmit(true);
       let  failedOtpAttempts = getAttempts("failedOtpAttempts");
        if(failedOtpAttempts <= props.failedOtpAttempts){
            props.submitOtp(otp)
            .then((res) => {
                console.log("Response in child submit otp",res);
                if(res.result === true){
                    console.log("succeeded in submit otp");
                    
                }else if(res.result === false){
                    console.log("submit otp called stiil in attempts", failedOtpAttempts); 
                    failedOtpAttempts = failedOtpAttempts + 1;
                    setfailedOtpAttempts(failedOtpAttempts);
                    setAttempts("failedOtpAttempts",failedOtpAttempts);
                  // failedError();
                   setshowError(true);
                }
            })
            .catch((e) => {
                console.log("Error in submitting otp from Parent",e);
            });        
           
        }      
       
    }

    const resendOtp  = () => {
        console.log("Resend Otp Called");
        let resendOtpAttempts = getAttempts("resendOtpAttempts");
        if(resendOtpAttempts < props.resendOtpAttempts){           
            // call the api   
                  
            props.resendOtp()
            .then((res) => {
                console.log("RESEND RESULT fail 11",res);
                if(res.result === true){
                    console.log("RESEND RESULT ",res);
                    resendOtpAttempts = resendOtpAttempts + 1;
                    setresendOtpAttempts(resendOtpAttempts);
                    setAttempts("resendOtpAttempts",resendOtpAttempts);
                    // console.log("From resend Otp ", result);
                }else if(res.result === false){
                    console.log("RESEND RESULT fail",res);
                    console.log("Resend otp request failed");
                }
            })
            .catch((e) => {
                console.log("Error in parent resend",e);
            });     

            return;
        }else{
            console.log("Resend Attempts Crossed");
            setshowError(true);
            setresendErr(true);
                       
            
        } 
    }
    



    return (<containerstyles.OtpContainerStyles showError={showError}>
            <div>
                <smsWrapperStyles.SMSWrapperStyles>
                    <img src={smsImg} alt={"SMS Image"}/>
                    <div>Press ‘Get OTP via SMS’ and input 6-digit OTP in the field below.</div>
                </smsWrapperStyles.SMSWrapperStyles>                
                <OtpInput 
                    ref={otpRef}
                    maxLength={props.maxLength}
                    otpChangeHandler={otpChangeHandler} 
                />

                <containerstyles.OtpError showError={showError}>
                        {errorContent}
                </containerstyles.OtpError>

                <ResetTimer resendOtpTimer={props.resendOtpTimer}
                        stopTimer = {resendErr}
                        resendOtp={resendOtp}/>
            </div>           
       
            <containerstyles.OtpBtnContainer>
                <Btn size={"large"} priority={"primary"} disabled={disableSubmit}
                        onClick={submitOtp}>
                    Submit
                </Btn>
                <Btn size={"large"} priority={"secondary"} >
                    Cancel
                </Btn>                
            </containerstyles.OtpBtnContainer>        
    </containerstyles.OtpContainerStyles>)
}

export default OtpContainer;

/* axios.get("/json/submit.json")
.then((data) => {
    console.log("JSON Called ",data);
    if(data)
})
.catch((e) => {
    console.log("Exception ",e);
}) */
